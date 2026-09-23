import './scene-loading.css';

type SceneLoadingProps = {
  label: string;
  progress?: number;
  tone?: 'sand' | 'charcoal';
  className?: string;
  ready?: boolean;
};

export function SceneLoading({ label, progress, tone = 'sand', className = '', ready = false }: SceneLoadingProps) {
  const safeProgress = progress === undefined ? undefined : Math.max(0, Math.min(100, Math.round(progress)));
  return (
    <div className={`scene-loading scene-loading--${tone}${ready ? ' is-ready' : ''}${className ? ` ${className}` : ''}`} role="status" aria-live="polite">
      <div className="scene-loading__card">
        <span className="scene-loading__brand">ELEGANCE <small>DESIGN STUDIO</small></span>
        <span className="scene-loading__rule" aria-hidden="true" />
        <span className="scene-loading__label">{label}</span>
        {!ready && <div className="scene-loading__track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} {...(safeProgress === undefined ? {} : { 'aria-valuenow': safeProgress })}>
          <span className={safeProgress === undefined ? 'is-indeterminate' : ''} style={safeProgress === undefined ? undefined : { width: `${safeProgress}%` }} />
        </div>}
      </div>
    </div>
  );
}
