"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GoogleIcon, GitHubIcon } from "@/components/Icons";
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Sign in to continue your flow</p>
        </div>

        <div className={styles.socialButtons}>
            <button className={styles.socialButton}>
                <GoogleIcon size={20} />
                Continue with Google
            </button>
            <button className={styles.socialButton}>
                <GitHubIcon size={20} />
                Continue with GitHub
            </button>
        </div>

        <div className={styles.divider}>
            <div className={styles.line}></div>
            <span>or with email</span>
            <div className={styles.line}></div>
        </div>

        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); router.push('/dashboard'); }}>
            <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="you@example.com" 
                    className={styles.input} 
                    required 
                />
            </div>
            
            <div className={styles.inputGroup}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <label className={styles.label} htmlFor="password">Password</label>
                    <Link href="#" className={styles.link} style={{fontSize:'0.85rem'}}>Forgot?</Link>
                </div>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="••••••••" 
                    className={styles.input} 
                    required 
                />
            </div>

            <button type="submit" className={styles.primaryButton}>Sign In</button>
        </form>

        <div className={styles.footer}>
            Don&apos;t have an account? <Link href="/signup" className={styles.link}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
