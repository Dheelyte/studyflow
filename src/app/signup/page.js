"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GoogleIcon, GitHubIcon } from "@/components/Icons";
// Reusing login styles for consistency
import styles from '../login/page.module.css';

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
            <h1 className={styles.title}>Create Account</h1>
            <p className={styles.subtitle}>Start your learning journey today</p>
        </div>

        <div className={styles.socialButtons}>
            <button className={styles.socialButton}>
                <GoogleIcon size={20} />
                Sign up with Google
            </button>
            <button className={styles.socialButton}>
                <GitHubIcon size={20} />
                Sign up with GitHub
            </button>
        </div>

        <div className={styles.divider}>
            <div className={styles.line}></div>
            <span>or with email</span>
            <div className={styles.line}></div>
        </div>

        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); router.push('/dashboard'); }}>
            <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="name">Full Name</label>
                <input 
                    type="text" 
                    id="name" 
                    placeholder="John Doe" 
                    className={styles.input} 
                    required 
                />
            </div>

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
                <label className={styles.label} htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Create a password" 
                    className={styles.input} 
                    required 
                />
            </div>

            <button type="submit" className={styles.primaryButton}>Create Account</button>
        </form>

        <div className={styles.footer}>
            Already have an account? <Link href="/login" className={styles.link}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
