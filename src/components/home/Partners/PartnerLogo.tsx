import styles from "./Partners.module.css";

interface PartnerLogoProps {
  name: string;
}

export default function PartnerLogo({ name }: PartnerLogoProps) {
  return (
    <div className={styles.logoBox}>
      <span className={styles.logoText}>{name}</span>
    </div>
  );
}
