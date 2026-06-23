'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import type { ButtonVariant, ButtonSize, ButtonTextColor } from '@/types';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  textColor?: ButtonTextColor;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit' | 'reset';
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

const TEXT_COLOR_CLASS: Record<string, string> = {
  white: styles.textWhite,
  light: styles.textLight,
  accent: styles.textAccent,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', textColor = 'default', href, loading, disabled, fullWidth, children, className = '', onClick, type = 'button', iconStart, iconEnd }, ref) => {
    const cls = [
      styles.btn,
      styles[variant],
      styles[size],
      TEXT_COLOR_CLASS[textColor] ?? '',
      fullWidth ? styles.fullWidth : '',
      loading ? styles.loading : '',
      className,
    ].filter(Boolean).join(' ');

    const content = (
      <>
        {loading ? <span className={styles.spinner} /> : null}
        {!loading && iconStart ? <span className={styles.icon}>{iconStart}</span> : null}
        {children}
        {!loading && iconEnd ? <span className={styles.icon}>{iconEnd}</span> : null}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={cls} aria-disabled={disabled} onClick={onClick}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} type={type} className={cls} disabled={disabled || loading} onClick={onClick}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
