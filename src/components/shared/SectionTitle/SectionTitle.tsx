import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'center' | 'start' | 'end';
  light?: boolean;
}

export default function SectionTitle({ title, highlight, subtitle, align = 'center', light = false }: SectionTitleProps) {
  return (
    <div className={[styles.wrapper, styles[align], light ? styles.light : ''].filter(Boolean).join(' ')}>
      <h2 className={styles.title}>
        {title}
        {highlight && <span className={styles.highlight}> {highlight}</span>}
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.divider} />
    </div>
  );
}
