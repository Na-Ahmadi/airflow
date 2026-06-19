import Link from 'next/link';
import type { FooterData } from '@/types';
import styles from './Footer.module.css';
import Icon from '@/components/shared/Icon/Icon';
import Logo from '@/components/layout/Logo/Logo';

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.inner}>
          {/* Company Column */}
          <div className={styles.companyCol}>
            <Logo
              name={data.company.name}
              subtitle="HVAC Solutions"
              size={40}
              className={styles.logoWrap}
            />
            <p className={styles.companyDesc}>{data.company.tagline}</p>
            <div className={styles.socials}>
              {data.company.socials.map((s) => (
                <a key={s.id} href={s.href} className={styles.socialLink} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {data.columns.map((col) => (
            <div key={col.id} className={styles.linkCol}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.linkList}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.footerLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className={styles.contactCol}>
            <h3 className={styles.colTitle}>{data.contact.title}</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Icon name="location" size={16} />
                <span>{data.contact.address}</span>
              </li>
              <li className={styles.contactItem}>
                <Icon name="phone" size={16} />
                <a href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>
              </li>
              <li className={styles.contactItem}>
                <Icon name="mail" size={16} />
                <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>{data.copyright}</p>
          <Link href="/" className={styles.termsLink}>شرایط استفاده</Link>
        </div>
      </div>
    </footer>
  );
}
