'use client';

import dynamic from 'next/dynamic';
import { Component, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import './interior-scene.css';
import { SceneLoading } from './SceneLoading';

function ScenePlaceholder({ message = 'The room is almost ready' }: { message?: string }) {
  return <SceneLoading label={message} className="interior-scene__placeholder" />;
}

const ClientCanvas = dynamic(
  () => import('./SceneCanvas').then((module) => module.SceneCanvas),
  { ssr: false, loading: () => <ScenePlaceholder message="Loading the interior" /> },
);

type BoundaryProps = { children: ReactNode };
type BoundaryState = { hasError: boolean };

class SceneErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('The Elegance Design Studio interior scene could not be displayed.', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="interior-scene__error" role="alert">
          <p>The interactive room could not be loaded.</p>
          <button type="button" onClick={() => this.setState({ hasError: false })}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function InteriorScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isNearViewport) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: '160px 0px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, [isNearViewport]);

  return (
    <section ref={sectionRef} id="interior-scene" className="interior-scene" aria-labelledby="interior-scene-title">
      <div className="interior-scene__heading">
        <div>
          <span className="eyebrow">Explore the space</span>
          <h2 id="interior-scene-title" className="display">A room, in the round.</h2>
        </div>
        <p>Move through a considered living space. Drag to look around; use your scroll wheel or pinch to adjust the view.</p>
      </div>
      <div className="interior-scene__viewport" aria-label="Interactive 3D living room viewer">
        {isNearViewport ? <SceneErrorBoundary><ClientCanvas scrollTarget="#interior-scene" /></SceneErrorBoundary> : <ScenePlaceholder message="The interior is waiting to be explored" />}
        <span className="interior-scene__controls-hint" aria-hidden="true">Drag to orbit <i /> Scroll or pinch to zoom</span>
        <span className="interior-scene__model-credit">Room model · CC0 1.0</span>
      </div>
    </section>
  );
}


