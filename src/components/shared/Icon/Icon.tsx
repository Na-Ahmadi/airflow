interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean;
  'aria-label'?: string;
}

export default function Icon({
  name,
  size = 24,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      className={className}
      style={style}
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
