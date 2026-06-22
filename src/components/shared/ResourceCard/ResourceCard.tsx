import Icon from "@/components/shared/Icon/Icon";
import type { Resource } from "@/types";
import Link from "next/link";
import styles from "./ResourceCard.module.css";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link
      href={resource.href}
      className={styles.card}
      download={resource.type !== "آنلاین"}
    >
      <div className={styles.cardTop}>
        <div className={styles.iconWrap}>
          <div className={styles.svgWrap}>
            <Icon name={resource.icon} />
          </div>
        </div>
        <span className={styles.typeBadge}>{resource.type}</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{resource.title}</h3>
        <p className={styles.cardDesc}>{resource.description}</p>
      </div>
      {resource.size && <span className={styles.size}>{resource.size}</span>}
      <div className={styles.downloadIcon}>
        <Icon name="download" size={18} />
      </div>
    </Link>
  );
}
