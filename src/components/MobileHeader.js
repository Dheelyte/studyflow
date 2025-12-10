"use client";
import styles from './MobileHeader.module.css';
import { MenuIcon, ZapIcon } from './Icons';

export default function MobileHeader({ onMenuClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <ZapIcon size={24} fill="var(--primary)" /> StudyFlow
      </div>
      <button className={styles.menuButton} onClick={onMenuClick}>
        <MenuIcon size={28} />
      </button>
    </header>
  );
}
