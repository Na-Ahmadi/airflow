import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ children, variant = 'primary', size = 'sm', className = '' }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[variant], styles[size], className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}
