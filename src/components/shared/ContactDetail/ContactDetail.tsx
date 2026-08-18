import Icon from "@/components/shared/Icon/Icon";
import styles from "./ContactDetail.module.css";

interface ContactDetailProps {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

export default function ContactDetail({ icon, label, value, href }: ContactDetailProps) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Wrapper className={styles.contactItem} {...wrapperProps}>
      <div className={styles.contactIcon}>
        <div className={styles.iconSvg}>
          <Icon name={icon} />
        </div>
      </div>
      <div>
        <span className={styles.contactLabel}>{label}</span>
        <span className={styles.contactValue}>{value}</span>
      </div>
    </Wrapper>
  );
}
