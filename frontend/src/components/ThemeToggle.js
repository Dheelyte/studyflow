"use client";
import React from 'react';
import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon, LaptopIcon } from './Icons';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.container}>
      <button 
        className={`${styles.button} ${theme === 'light' ? styles.active : ''}`}
        onClick={() => setTheme('light')}
        title="Light Mode"
      >
        <SunIcon size={18} />
      </button>
      <button 
        className={`${styles.button} ${theme === 'dark' ? styles.active : ''}`}
        onClick={() => setTheme('dark')}
        title="Dark Mode"
      >
        <MoonIcon size={18} />
      </button>
      <button 
        className={`${styles.button} ${theme === 'system' ? styles.active : ''}`}
        onClick={() => setTheme('system')}
        title="System Preference"
      >
        <LaptopIcon size={18} />
      </button>
    </div>
  );
}
