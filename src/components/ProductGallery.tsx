"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const activeImage = images[activeIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;

  const showImage = useCallback((nextIndex: number) => {
    const wrappedIndex = (nextIndex + images.length) % images.length;
    setActiveIndex(wrappedIndex);
    setIsZoomed(false);
  }, [images.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowLeft" && hasMultipleImages) showImage(activeIndex - 1);
      if (event.key === "ArrowRight" && hasMultipleImages) showImage(activeIndex + 1);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, hasMultipleImages, isLightboxOpen, showImage]);

  return (
    <div className="productMedia">
      <div className="detailImageWrap">
        {hasMultipleImages && (
          <button
            className="galleryArrow galleryArrowPrev"
            type="button"
            aria-label="Previous product image"
            onClick={() => showImage(activeIndex - 1)}
          >
            ‹
          </button>
        )}
        <button
          className="detailImage"
          type="button"
          aria-label={`Open larger view of ${name}`}
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={activeImage}
            alt={name}
            width={1000}
            height={1000}
            priority
            sizes="(max-width: 980px) 100vw, 48vw"
          />
          <span className="zoomHint">Click To Zoom</span>
        </button>
        {hasMultipleImages && (
          <button
            className="galleryArrow galleryArrowNext"
            type="button"
            aria-label="Next product image"
            onClick={() => showImage(activeIndex + 1)}
          >
            ›
          </button>
        )}
      </div>

      {hasMultipleImages && (
        <div className="detailGallery" aria-label={`${name} product images`}>
          {images.map((image, imageIndex) => (
            <button
              className={`galleryThumb ${imageIndex === activeIndex ? "isActive" : ""}`}
              key={image}
              type="button"
              aria-label={`Show ${name} image ${imageIndex + 1}`}
              aria-pressed={imageIndex === activeIndex}
              onClick={() => showImage(imageIndex)}
            >
              <Image
                src={image}
                alt={`${name} image ${imageIndex + 1}`}
                width={180}
                height={180}
                sizes="(max-width: 760px) 28vw, 110px"
              />
            </button>
          ))}
        </div>
      )}

      {isLightboxOpen && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${name} image gallery`}>
          <button
            className="lightboxBackdrop"
            type="button"
            aria-label="Close image viewer"
            onClick={() => setIsLightboxOpen(false)}
          />
          <div className="lightboxPanel">
            <div className="lightboxToolbar">
              <span>{activeIndex + 1} / {images.length}</span>
              <div>
                <button type="button" onClick={() => setIsZoomed((value) => !value)}>
                  {isZoomed ? "Fit image" : "Zoom in"}
                </button>
                <button type="button" onClick={() => setIsLightboxOpen(false)}>Close</button>
              </div>
            </div>
            <button
              className={`lightboxImage ${isZoomed ? "isZoomed" : ""}`}
              type="button"
              onClick={() => setIsZoomed((value) => !value)}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              <Image
                src={activeImage}
                alt={name}
                width={1400}
                height={1400}
                sizes="100vw"
              />
            </button>
            {hasMultipleImages && (
              <>
                <button
                  className="lightboxNav lightboxPrev"
                  type="button"
                  aria-label="Previous product image"
                  onClick={() => showImage(activeIndex - 1)}
                >
                  ‹
                </button>
                <button
                  className="lightboxNav lightboxNext"
                  type="button"
                  aria-label="Next product image"
                  onClick={() => showImage(activeIndex + 1)}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
