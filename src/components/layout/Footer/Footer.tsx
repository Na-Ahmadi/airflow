import Link from 'next/link';
import type { FooterData } from '@/types';
import styles from './Footer.module.css';

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
            <div className={styles.logoWrap}>
              <AirflowIcon />
              <div>
                <span className={styles.logoName}>{data.company.name}</span>
                <span className={styles.logoSub}>HVAC Solutions</span>
              </div>
            </div>
            <p className={styles.companyDesc}>{data.company.tagline}</p>
            <div className={styles.socials}>
              {data.company.socials.map((s) => (
                <a key={s.id} href={s.href} className={styles.socialLink} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <SocialIcon name={s.icon} />
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
                <LocationIcon />
                <span>{data.contact.address}</span>
              </li>
              <li className={styles.contactItem}>
                <PhoneIcon />
                <a href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>
              </li>
              <li className={styles.contactItem}>
                <MailIcon />
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

function AirflowIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="8" fill="url(#flg1)"/>
      <path d="M8 16C8 16 10 10 16 10C22 10 24 16 24 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 19C8 19 10 22 16 22C22 22 24 19 24 19" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="2" fill="white"/>
      <defs>
        <linearGradient id="flg1" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#1e6fcf"/><stop offset="1" stopColor="#00d4ff"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactElement> = {
    instagram: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
    linkedin:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    telegram:  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>,
    youtube:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
  };
  return icons[name] ?? null;
}

function LocationIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>; }
function PhoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016.09 17.9l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>; }
function MailIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
