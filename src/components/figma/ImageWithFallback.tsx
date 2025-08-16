import * as React from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps extends Omit<React.ComponentProps<typeof Image>, 'src'> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

export function ImageWithFallback({ src, fallbackSrc = '/vercel.svg', alt, className, ...props }: ImageWithFallbackProps) {
  const [error, setError] = React.useState(false);
  const finalSrc = error ? fallbackSrc : src;
  return (
    <Image
      src={finalSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      width={800}
      height={600}
      {...props}
    />
  );
}
