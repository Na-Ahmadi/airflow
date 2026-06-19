'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import type { ButtonVariant, ButtonSize } from '@/types';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, loading, disabled, fullWidth, children, className = '', onClick, type = 'button' }, ref) => {
    const cls = [
      styles.btn,
      styles[variant],
      styles[size],
      fullWidth ? styles.fullWidth : '',
      loading ? styles.loading : '',
      className,
    ].filter(Boolean).join(' ');

    if (href) {
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} type={type} className={cls} disabled={disabled || loading} onClick={onClick}>
        {loading ? <span className={styles.spinner} /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
