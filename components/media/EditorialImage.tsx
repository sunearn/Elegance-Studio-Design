import Image from 'next/image';

type EditorialImageProps = {
  src: string;
  alt: string;
  sizes: string;
  quality?: 60 | 70 | 75;
  className?: string;
  objectPosition?: string;
  preload?: boolean;
};

export function EditorialImage({ src, alt, sizes, quality = 70, className, objectPosition = 'center', preload = false }: EditorialImageProps) {
  return <Image
    fill
    src={src}
    alt={alt}
    sizes={sizes}
    quality={quality}
    className={className ?? 'editorial-image'}
    style={{ objectFit: 'cover', objectPosition }}
    {...(preload ? { preload: true } : { loading: 'lazy' })}
  />;
}
