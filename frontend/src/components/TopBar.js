"use client";
import styles from './TopBar.module.css';
import { ChevronLeft, ChevronRight } from './Icons';
import { useRouter } from 'next/navigation';

export default function TopBar() {
  const router = useRouter();

  return (
    <header className={styles.topbar}>
      <div className={styles.navigationButtons}>
        <button onClick={() => router.back()} className={styles.navButton} title="Go back">
          <ChevronLeft />
        </button>
        <button onClick={() => router.forward()} className={styles.navButton} title="Go forward">
          <ChevronRight />
        </button>
      </div>
      <div className={styles.authButtons}>
        <button className={styles.signup} onClick={() => alert("Sign up coming soon!")}>Sign up</button>
        <button className={styles.login} onClick={() => alert("Login coming soon!")}>Log in</button>
      </div>
    </header>
  );
}
