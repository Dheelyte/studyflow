"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import { PlayIcon, ClockIcon, ChevronDown, ChevronUp, ZapIcon } from '@/components/Icons';

export default function PlaylistPage({ params }) {
    const searchParams = useSearchParams();
    const topic = searchParams.get('topic') || 'New Topic';
    const experience = searchParams.get('experience') || 'Beginner';
    
    // Mock Data
    const mockModules = [
        {
            id: 1,
            title: "Module 1: Foundations",
            resources: [
                { id: 1, title: "Introduction to " + topic, type: "Video", duration: "12:05" },
                { id: 2, title: "Key Concepts & Terminology", type: "Article", duration: "5:00" },
                { id: 3, title: "Setting up your environment", type: "Hands-on", duration: "25:00" },
            ]
        },
        {
            id: 2,
            title: "Module 2: Core Skills",
            resources: [
                { id: 4, title: "Deep dive into syntax", type: "Video", duration: "18:30" },
                { id: 5, title: "Building your first project", type: "Project", duration: "1:00:00" },
            ]
        },
        {
            id: 3,
            title: "Module 3: Advanced Topics",
            resources: [
                { id: 6, title: "Performance Optimization", type: "Article", duration: "15:00" },
                { id: 7, title: "Final Assessment", type: "Quiz", duration: "20:00" },
            ]
        }
    ];

    const [expandedModules, setExpandedModules] = useState({ 1: true, 2: true, 3: true });

    const toggleModule = (id) => {
        setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handlePlay = () => {
        alert("Starting your learning journey! (This would open the first resource)");
    };

    // Calculate Completion (Mock logic)
    const completionPercentage = 0; // Example value

    return (
        <div className={styles.container}>
            <div className={styles.headerBg}></div>
            <div className={styles.header}>
                <div className={styles.playlistImage}>
                    <ZapIcon size={64} fill="white" />
                </div>
                <div className={styles.playlistInfo}>
                    <span className={styles.type}>{experience} Curriculum</span>
                    <h1 className={styles.title}>{topic}</h1>
                    <p className={styles.description}>A personalized learning path generated just for you. Master the basics, build projects, and advance to expert level with this curated flow.</p>
                    <div className={styles.meta}>
                        <div className={styles.metaItem}>
                            <span>By <strong>StudyFlow AI</strong></span>
                        </div>
                        <div className={styles.metaItem}>
                            <span>•</span>
                            <span>Last updated today</span>
                        </div>
                        <div className={styles.metaItem}>
                             <span>•</span>
                             <span>7 modules</span>
                        </div>
                        <div className={styles.metaItem}>
                             <span>•</span>
                             <span>4h 30m</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.controls}>
                <button className={styles.playButton} onClick={handlePlay}>
                    <PlayIcon size={24} fill="white" />
                    Continue Learning
                </button>
            </div>
            
            <div className={styles.progressContainer}>
                <div className={styles.progressLabel}>
                    <span>Playlist Progress</span>
                    <span>{completionPercentage}% completed</span>
                </div>
                <div className={styles.progressBarBg}>
                    <div className={styles.progressBarFill} style={{ width: `${completionPercentage}%` }}></div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.listHeader}>
                    <div style={{ justifySelf: 'center' }}>#</div>
                    <div>Resource Title</div>
                    <div>Type</div>
                    <div style={{ justifySelf: 'end' }}><ClockIcon size={16} /></div>
                </div>

                {mockModules.map(module => (
                    <div key={module.id} className={styles.module}>
                        <div className={styles.moduleHeader} onClick={() => toggleModule(module.id)}>
                            <span>{module.title}</span>
                            {expandedModules[module.id] ? <ChevronUp /> : <ChevronDown />}
                        </div>
                        {expandedModules[module.id] && (
                            <div className={styles.resourceList}>
                                {module.resources.map((resource, index) => (
                                    <div key={resource.id} className={styles.resource}>
                                        <div className={styles.resourceIndex}>{index + 1}</div>
                                        <div className={styles.resourceInfo}>
                                            <span className={styles.resourceTitle}>{resource.title}</span>
                                        </div>
                                        <div className={styles.resourceType}>{resource.type}</div>
                                        <div className={styles.duration}>{resource.duration}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}
