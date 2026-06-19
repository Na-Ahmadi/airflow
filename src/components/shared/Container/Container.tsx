import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  as?: 'div' | 'section' | 'main' | 'article' | 'aside';
}

export default function Container({ children, size = 'xl', className = '', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={[styles.container, styles[size], className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}
