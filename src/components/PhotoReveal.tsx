'use client';

interface Props {
  src: string;
  /** Max width of the photo frame in CSS pixels — height follows the image's natural aspect ratio. */
  photoSize?: number;
  alt?: string;
  /** Minimal chrome for inline mobile hero — smaller radius, no outer glow ring. */
  compact?: boolean;
  imgStyle?: React.CSSProperties;
  /** Legacy prop — prefer `photoSize`. */
  diameter?: number;
}

/**
 * Framed portrait photo.
 *
 * Renders the image at its natural aspect ratio (width fixed, height auto)
 * so the entire photo is always visible — nothing is cropped by a fixed-size
 * or circular mask. Wrapped in a clean rounded card with a subtle accent
 * border and glow for a professional, framed-print look.
 */
export default function PhotoReveal({
  src,
  photoSize,
  alt = 'Portrait',
  compact = false,
  imgStyle,
  diameter,
}: Props) {
  const PHOTO = photoSize ?? diameter ?? 372;

  return (
    <div
      className="relative"
      style={{ width: PHOTO }}
      aria-label={alt}
      role="img"
    >
      {!compact && (
        <div
          className="absolute inset-[-8px] rounded-[1.75rem] pointer-events-none"
          style={{
            boxShadow:
              '0 0 0 1.5px rgba(47,102,144,0.45), 0 0 28px 4px rgba(47,102,144,0.16)',
          }}
        />
      )}
      <div
        className={`relative overflow-hidden border border-accent/25 bg-bg-secondary ${
          compact ? 'rounded-xl' : 'rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]'
        }`}
      >
        <img
          src={src}
          alt=""
          aria-hidden
          className="block w-full h-auto select-none"
          style={imgStyle}
        />
      </div>
    </div>
  );
}
