"use client";
import { useState, useEffect } from 'react';
import styles from './GenerationOverlay.module.css';

const steps = [
    "Analyzing learning topic...",
    "Calibrating to experience level...",
    "Scanning documentation and resources...",
    "Structuring modules and milestones...",
    "Gamifying your curriculum...",
    "Finalizing your playlist..."
];

export default function GenerationOverlay({ topic, experience, onComplete }) {
    const [stepIndex, setStepIndex] = useState(0);

    useEffect(() => {
        if (stepIndex < steps.length) {
            const timeout = setTimeout(() => {
                setStepIndex(prev => prev + 1);
            }, 800); 
            return () => clearTimeout(timeout);
        } else {
            // Finished, trigger callback
            const timeout = setTimeout(() => {
                onComplete();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [stepIndex, onComplete]);

    return (
        <div className={styles.overlay}>
             <div className={styles.content}>
                <div className={styles.spinner}></div>
                <h1 className={styles.statusText}>
                    {stepIndex < steps.length ? steps[stepIndex] : "Ready!"}
                </h1>
                <p className={styles.subText}>
                    Generating <strong>{experience}</strong> curriculum for: <strong style={{color: 'var(--primary)'}}>{topic}</strong>
                </p>
            </div>
        </div>
    );
}
