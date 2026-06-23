import Link from 'next/link';
import Image from 'next/image';
import styles from './Logo.module.css';

interface LogoProps {
  name: string;
  subtitle: string;
  size?: number;
  href?: string;
  scrolled?: boolean;
  isHome?: boolean;
  className?: string;
}

export default function Logo({ name, subtitle, size = 32, href, scrolled, isHome = false, className }: LogoProps) {
  const cls = [styles.logo, className].filter(Boolean).join(' ');
  const attrs = {
    ...(scrolled !== undefined ? { 'data-scrolled': String(scrolled) } : {}),
    'data-home': String(isHome),
  };

  const inner = (
    <>
      <span className={styles.icon}>
        <Image src="/icons/airflow-logo.svg" width={size} height={size} alt="" aria-hidden />
      </span>
      <span className={styles.text}>
        <span className={styles.name}>{name}</span>
        <span className={styles.sub}>{subtitle}</span>
      </span>
    </>
  );

  if (href) {
    return <Link href={href} className={cls} {...attrs}>{inner}</Link>;
  }
  return <div className={cls} {...attrs}>{inner}</div>;
}
