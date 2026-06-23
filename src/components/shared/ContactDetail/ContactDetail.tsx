import Icon from "@/components/shared/Icon/Icon";
import styles from "./ContactDetail.module.css";

interface ContactDetailProps {
  icon: string;
  label: string;
  value: string;
}

export default function ContactDetail({ icon, label, value }: ContactDetailProps) {
  return (
    <div className={styles.contactItem}>
      <div className={styles.contactIcon}>
        <div className={styles.iconSvg}>
          <Icon name={icon} />
        </div>
      </div>
      <div>
        <span className={styles.contactLabel}>{label}</span>
        <span className={styles.contactValue}>{value}</span>
      </div>
    </div>
  );
}
