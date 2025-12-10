"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from "./page.module.css";
import Card from "@/components/Card";
import GamificationStats from "@/components/GamificationStats";
import GenerationOverlay from "@/components/GenerationOverlay";
import IntegratedSearchBar from "@/components/IntegratedSearchBar";

export default function Dashboard() {
  const [greeting, setGreeting] = useState(''); 
  const [isGenerating, setIsGenerating] = useState(false);
  const [genParams, setGenParams] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleSearch = (params) => {
    setGenParams(params);
    setIsGenerating(true);
  };

  const onGenerationComplete = () => {
    if (!genParams) return;

     const query = {
        topic: genParams.topic,
        experience: genParams.experience,
        duration: genParams.duration
    };
    const queryString = new URLSearchParams(query).toString();
    router.push(`/playlist/1?${queryString}`);
  };

  return (
    <div className={styles.page}>
      
      {isGenerating && genParams && (
        <GenerationOverlay 
            topic={genParams.topic} 
            experience={genParams.experience} 
            onComplete={onGenerationComplete} 
        />
      )}

      <div className={styles.heroSection}>
        <h1 className={styles.greeting}>{greeting || 'Hello'}, Ready to flow?</h1>
        
        {/* Reusing the integrated search bar component */}
        <IntegratedSearchBar onSearch={handleSearch} />
      </div>

      <GamificationStats />

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Jump Back In</h2>
            <Link href="/library" className={styles.showAll}>View Library</Link>
        </div>
        <div className={styles.grid}>
            <Link href="/playlist/1" style={{display: 'contents'}}>
                <Card title="Learn React" description="45% Complete • 2h remaining" color="linear-gradient(135deg, #6366f1, #8b5cf6)" />
            </Link>
            <Link href="/playlist/1" style={{display: 'contents'}}>
                 <Card title="Python Data Science" description="Stats and Probability • Module 4" color="linear-gradient(135deg, #ec4899, #f43f5e)" />
            </Link>
            <Link href="/playlist/1" style={{display: 'contents'}}>
                <Card title="UX Design Principles" description="Visual Hierarchy • Just Started" color="linear-gradient(135deg, #10b981, #06b6d4)" />
            </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recommended based on your goals</h2>
            <span className={styles.showAll}>Explore More</span>
        </div>
        <div className={styles.grid}>
             <Link href="/playlist/1" style={{display: 'contents'}}>
                <Card title="Advanced Next.js" description="Master Server Components" color="linear-gradient(135deg, #020617, #334155)" />
            </Link>
             <Link href="/playlist/1" style={{display: 'contents'}}>
                <Card title="GenAI Engineering" description="LLMs, RAG, and Agents" color="linear-gradient(135deg, #3b82f6, #2563eb)" />
            </Link>
             <Link href="/playlist/1" style={{display: 'contents'}}>
                <Card title="Docker Mastery" description="Containerization from scratch" color="linear-gradient(135deg, #0ea5e9, #0284c7)" />
            </Link>
        </div>
      </section>

    </div>
  );
}
