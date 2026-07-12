"use client";

import { useState } from "react";
import Image from "next/image";

export function FallbackImage({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 25vw, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 h-full w-full bg-linear-to-br from-blue/15 via-soft to-red/10 ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
