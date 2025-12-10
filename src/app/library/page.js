"use client";
import Link from 'next/link';
import styles from './page.module.css';
import Card from "@/components/Card";

export default function LibraryPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Library</h1>
        <p className={styles.subtitle}>All your active courses and generated playlists.</p>
      </div>

      <div className={styles.grid}>
         <Link href="/playlist/1" style={{display: 'contents'}}>
             <Card title="Learn React" description="45% Complete • Last active 2h ago" color="linear-gradient(135deg, #6366f1, #8b5cf6)" />
         </Link>
         <Link href="/playlist/1" style={{display: 'contents'}}>
             <Card title="Python Data Science" description="Stats and Probability • Module 4" color="linear-gradient(135deg, #ec4899, #f43f5e)" />
         </Link>
         <Link href="/playlist/1" style={{display: 'contents'}}>
             <Card title="UX Design Principles" description="Just Started" color="linear-gradient(135deg, #10b981, #06b6d4)" />
         </Link>
          <Link href="/playlist/1" style={{display: 'contents'}}>
             <Card title="Financial Literacy" description="Investing 101 • Completed" color="linear-gradient(135deg, #228b22, #333)" />
         </Link>
      </div>
    </div>
  );
}
