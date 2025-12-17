"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import PostCard from '@/components/PostCard';
import CommunityStories from '@/components/CommunityStories';
import CreateCommunityModal from '@/components/CreateCommunityModal';
import { useCommunity } from '@/components/CommunityContext';
import { PlusIcon } from '@/components/Icons';

export default function CommunityPage() {
  const { 
      communities, 
      posts, 
      createCommunity 
  } = useCommunity();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [feedTab, setFeedTab] = useState('foryou');
  const router = useRouter();

  const handleCreateCommunity = (data) => {
      const newSlug = createCommunity(data);
      setShowCreateModal(false);
      router.push(`/community/${newSlug}`);
  };

  const filteredPosts = posts.filter(p => {
     if (feedTab === 'following') {
         const myCommunityIds = communities.filter(c => c.isJoined).map(c => c.id);
         return myCommunityIds.includes(p.communityId);
     }
     return true; // For You = All
  });

  return (
    <div className={styles.page}>
      
      {showCreateModal && (
         <CreateCommunityModal 
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateCommunity}
         />
      )}

      <div className={styles.mainColumn}>
        <div className={styles.header}>
            <h1 className={styles.title}>Community Flow</h1>
            <p className={styles.subtitle}>Discover new groups and share your progress.</p>
        </div>

        {/* Stories Rail */}
        <CommunityStories />

        <div className={styles.tabs}>
            <button 
                className={`${styles.tab} ${feedTab === 'foryou' ? styles.active : ''}`}
                onClick={() => setFeedTab('foryou')}
            >
                For You
            </button>
            <button 
                className={`${styles.tab} ${feedTab === 'following' ? styles.active : ''}`}
                onClick={() => setFeedTab('following')}
            >
                Following
            </button>
        </div>

        <div className={styles.feed}>
            {filteredPosts.map(post => (
                <PostCard key={post.id} {...post} />
            ))}
        </div>
      </div>

      <div className={styles.sidebar}>
        <div className={styles.trendingCard}>
            <h3 className={styles.cardTitle}>My Communities</h3>
            <div className={styles.trendingList}>
                {communities.filter(c => c.isJoined).map(c => (
                     <div 
                        key={c.id} 
                        className={styles.trendingItem} 
                        onClick={() => router.push(`/community/${c.id}`)}
                     >
                        <span className={styles.hashtag}>{c.name}</span>
                        <span className={styles.count}>{c.memberCount}</span>
                    </div>
                ))}
            </div>
            
            <button className={styles.createCommunityBtn} onClick={() => setShowCreateModal(true)}>
             <PlusIcon size={16} /> Create Community
            </button>
        </div>

        <div className={styles.trendingCard} style={{marginTop: '24px'}}>
            <h3 className={styles.cardTitle}>Trending Topics</h3>
            <div className={styles.trendingList}>
                 <div className={styles.trendingItem}>
                    <span className={styles.hashtag}>#ReactJs</span>
                    <span className={styles.count}>2.4k posts</span>
                </div>
                 <div className={styles.trendingItem}>
                    <span className={styles.hashtag}>#Python</span>
                    <span className={styles.count}>1.8k posts</span>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}
