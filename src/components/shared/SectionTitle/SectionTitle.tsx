import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'center' | 'start' | 'end';
  light?: boolean;
}

export default function SectionTitle({ tag, title, highlight, subtitle, align = 'center', light = false }: SectionTitleProps) {
  return (
    <div className={[styles.wrapper, styles[align], light ? styles.light : ''].filter(Boolean).join(' ')}>
      {tag && <span className={styles.tag}>{tag}</span>}
      <h2 className={styles.title}>
        {title}
        {highlight && <span className={styles.highlight}> {highlight}</span>}
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.divider} />
    </div>
  );
}
