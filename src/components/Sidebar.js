"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Sidebar.module.css';
import { HomeIcon, LibraryIcon, PlusIcon, ZapIcon, ChevronLeft, ChevronRight, XIcon, LaptopIcon, UsersIcon, ChevronDown, ChevronUp } from './Icons';
import { useTheme } from './ThemeProvider';

export default function Sidebar({ isCollapsed, isOpen, onClose, onToggleCollapse, isMobile }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  
  // Accordion States (Expanded by default)
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  const [isCommunityOpen, setIsCommunityOpen] = useState(true);

  // Mock Data
  const yourFlows = [
      { id: 1, title: 'Learn React', progress: '45% Complete', color: 'linear-gradient(135deg, #6366f1, #a855f7)' },
      { id: 2, title: 'Data Science', progress: 'Just Started', color: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
      { id: 3, title: 'UX Principles', progress: 'Module 2', color: 'linear-gradient(135deg, #10b981, #34d399)' },
      { id: 4, title: 'System Design', progress: '10% Complete', color: 'linear-gradient(135deg, #f59e0b, #f97316)' },
  ];

  const yourCommunities = [
      { id: 'react', name: 'React Mastery', members: '12.4k', color: '#6366f1' },
      { id: 'python', name: 'Python Devs', members: '8.2k', color: '#eab308' },
      { id: 'design', name: 'UI/UX Design', members: '5.1k', color: '#ec4899' },
      { id: 'web3', name: 'Web3 Builders', members: '3.3k', color: '#8b5cf6' },
  ];

  const handleToggleTheme = () => {
      if (theme === 'system') setTheme('light');
      else if (theme === 'light') setTheme('dark');
      else setTheme('system');
  };

  const getThemeLabel = () => {
      if (theme === 'system') return ' System';
      if (theme === 'light') return ' Light Mode';
      return ' Dark Mode';
  };

  const getThemeIcon = () => {
      if (theme === 'system') return <LaptopIcon size={18} />;
      if (theme === 'light') return '☀️'; 
      return '🌙'; 
  };

  const sidebarClasses = `${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isOpen ? styles.open : ''}`;

  return (
    <>
        {/* Mobile Backdrop */}
        {isMobile && isOpen && (
            <div 
                style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 45, backdropFilter: 'blur(4px)'
                }}
                onClick={onClose}
            />
        )}

        <aside className={sidebarClasses}>
          {isMobile && (
              <button className={styles.closeMobileBtn} onClick={onClose}>
                  <XIcon size={24} />
              </button>
          )}

          {!isMobile && (
              <button className={styles.toggleCollapseBtn} onClick={onToggleCollapse}>
                  {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </button>
          )}

          <nav className={styles.navContainer}>
            <div className={styles.logo}>
              <ZapIcon size={28} fill="var(--primary)" /> <span>StudyFlow</span>
            </div>
            
            <Link href="/dashboard" className={styles.navItem}>
              <HomeIcon />
              <span>Home</span>
            </Link>

            {/* Library Accordion */}
            {isCollapsed ? (
                 <Link href="/library" className={styles.navItem} title="Library">
                     <LibraryIcon />
                 </Link>
            ) : (
                <>
                    <div 
                        className={`${styles.navItem} ${isLibraryOpen ? styles.active : ''}`} 
                        onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                        style={{cursor: 'pointer', justifyContent: 'space-between'}}
                    >
                        <div style={{display:'flex', gap:'16px', alignItems:'center'}}>
                            <LibraryIcon />
                            <span>Library</span>
                        </div>
                        {isLibraryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    {isLibraryOpen && (
                        <div style={{
                            paddingLeft:'12px', 
                            marginTop:'0', 
                            marginBottom:'16px', 
                            display:'flex', 
                            flexDirection:'column', 
                            gap:'8px',
                            borderLeft: '1px solid var(--border)',
                            marginLeft: '20px'
                        }}>
                             {yourFlows.slice(0, 2).map(flow => (
                                <Link href={`/playlist/${flow.id}`} key={flow.id} className={styles.playlistItem} style={{padding: '8px 12px'}}>
                                    <div className={styles.playlistImage} style={{ background: flow.color, width:'28px', height:'28px', borderRadius:'6px' }}></div>
                                    <div className={styles.playlistInfo}>
                                        <div className={styles.playlistName} style={{fontSize:'0.85rem'}}>{flow.title}</div>
                                        <div className={styles.playlistMeta} style={{fontSize:'0.75rem'}}>{flow.progress}</div>
                                    </div>
                                </Link>
                            ))}
                            <Link href="/library" className={styles.seeAllBtn} style={{padding:'8px 12px', color:'var(--primary)', fontWeight:'600', fontSize:'0.85rem'}}>
                                See All
                            </Link>
                        </div>
                    )}
                </>
            )}

            {/* Community Accordion */}
             {isCollapsed ? (
                 <Link href="/community" className={styles.navItem} title="Community">
                     <UsersIcon />
                 </Link>
            ) : (
                <>
                    <div 
                        className={`${styles.navItem} ${isCommunityOpen ? styles.active : ''}`} 
                        onClick={() => setIsCommunityOpen(!isCommunityOpen)}
                        style={{cursor: 'pointer', justifyContent: 'space-between'}}
                    >
                        <div style={{display:'flex', gap:'16px', alignItems:'center'}}>
                            <UsersIcon />
                            <span>Community</span>
                        </div>
                        {isCommunityOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    {isCommunityOpen && (
                         <div style={{
                            paddingLeft:'12px', 
                            marginTop:'0', 
                            marginBottom:'16px', 
                            display:'flex', 
                            flexDirection:'column', 
                            gap:'8px',
                            borderLeft: '1px solid var(--border)',
                            marginLeft: '20px'
                        }}>
                            {yourCommunities.slice(0, 2).map((comm) => (
                                <Link href={`/community/${comm.id}`} key={comm.id} className={styles.playlistItem} style={{padding: '8px 12px'}}>
                                    <div className={styles.playlistImage} style={{ 
                                        background: 'transparent', 
                                        border: `1px solid ${comm.color}`,
                                        width:'28px', height:'28px',
                                        borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: comm.color, fontWeight: '700', fontSize: '0.8rem'
                                    }}>
                                        {comm.name.substring(0,1)}
                                    </div>
                                    <div className={styles.playlistInfo}>
                                        <div className={styles.playlistName} style={{fontSize:'0.85rem'}}>{comm.name}</div>
                                        <div className={styles.playlistMeta} style={{fontSize:'0.75rem'}}>{comm.members}</div>
                                    </div>
                                </Link>
                            ))}
                            <Link href="/community" className={styles.seeAllBtn} style={{padding:'8px 12px', color:'var(--primary)', fontWeight:'600', fontSize:'0.85rem'}}>
                                See All
                            </Link>
                        </div>
                    )}
                </>
            )}

          </nav>

          {/* LibraryContainer removed as it was empty */}

          <div className={styles.footer}>
            <div className={styles.authButtons}>
                <Link href="/login" className={styles.loginBtn}>Log In</Link>
                <Link href="/signup" className={styles.signupBtn}>Sign Up</Link>
            </div>
            <button className={styles.themeToggle} onClick={handleToggleTheme} title="Click to cycle themes">
                {getThemeIcon()}
                <span>{getThemeLabel()}</span>
            </button>
          </div>
        </aside>
    </>
  );
}
