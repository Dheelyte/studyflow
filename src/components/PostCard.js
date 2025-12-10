"use client";
import React, { useState } from 'react';
import { HeartIcon, MessageSquareIcon, ShareIcon, SendIcon } from './Icons';
import SimpleRichTextEditor from './SimpleRichTextEditor';

export default function PostCard({ author, time, content, likes: initialLikes, comments: initialComments, liked: initialLiked }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(initialLiked);
    // Safety: Ensure comments is an array. If number is passed (legacy/mock), default to empty to prevent crash.
    const [comments, setComments] = useState(Array.isArray(initialComments) ? initialComments : []);
    const [showComments, setShowComments] = useState(false);
    
    // Comment Input State
    const [newComment, setNewComment] = useState('');

    const toggleLike = () => {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
        } else {
            setLikes(likes + 1);
            setLiked(true);
        }
    };

    const handleCommentSubmit = () => {
        if (!newComment.trim()) return;
        const commentObj = {
            id: Date.now(),
            author: 'You',
            content: newComment,
            time: 'Just now'
        };
        setComments([...comments, commentObj]);
        setNewComment('');
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Check out this post on StudyFlow',
                    text: content,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share canceled');
            }
        } else {
             // Fallback copy
             navigator.clipboard.writeText(window.location.href);
             alert('Link copied to clipboard!');
        }
    };

    // Advanced Markdown Parser (Blocks + Inline)
    const renderContent = (text) => {
        if (!text) return null;
        
        // Split by code blocks first
        const parts = text.split(/(```[\s\S]*?```)/g);
        
        return parts.map((part, index) => {
            // Check if this part is a code block
            if (part.startsWith('```') && part.endsWith('```')) {
                // Remove the backticks and trip
                const codeContent = part.replace(/^```/, '').replace(/```$/, '').trim();
                return (
                    <div key={index} style={{
                        marginTop: '12px', 
                        marginBottom: '12px', 
                        padding: '16px', 
                        borderRadius: '8px', 
                        background: '#1e1e1e', 
                        color: '#eee', 
                        fontFamily: 'monospace', 
                        whiteSpace: 'pre-wrap',
                        overflowX: 'auto',
                        fontSize: '0.9rem'
                    }}>
                        {codeContent}
                    </div>
                );
            }
            
            // Otherwise parse inline markdown and newlines
            if (!part) return null;
            
            return (
                <div key={index}>
                    {part.split('\n').map((line, lineIndex) => {
                        let html = line
                         .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                         .replace(/\*(.*?)\*/g, '<em>$1</em>')
                         .replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.1); padding:2px 4px; border-radius:4px; font-family:monospace">$1</code>');
                         
                        return (
                             <div key={lineIndex} dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} style={{minHeight: html ? 'auto' : '1em'}} />
                        );
                    })}
                </div>
            )
        });
    };

    return (
        <div style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px'
        }}>
           <div style={{display:'flex', gap:'12px', marginBottom:'16px'}}>
               <div style={{width:'40px', height:'40px', borderRadius:'50%', background:'linear-gradient(135deg, #ccc, #999)'}}></div>
               <div>
                   <div style={{fontWeight:'700'}}>{author}</div>
                   <div style={{fontSize:'0.8rem', color:'var(--secondary)'}}>{time}</div>
               </div>
           </div>

           <div style={{fontSize:'1rem', lineHeight:'1.6', marginBottom:'24px', color:'var(--foreground)'}}>
                {renderContent(content)}
           </div>

           <div style={{display:'flex', gap:'24px', borderTop:'1px solid var(--border)', paddingTop:'16px'}}>
               <button onClick={toggleLike} style={{display:'flex', gap:'8px', alignItems:'center', background:'none', border:'none', cursor:'pointer', color: liked ? '#ef4444' : 'var(--secondary)'}}>
                   <HeartIcon size={20} fill={liked ? '#ef4444' : 'none'} />
                   <span>{likes}</span>
               </button>
               <button onClick={() => setShowComments(!showComments)} style={{display:'flex', gap:'8px', alignItems:'center', background:'none', border:'none', cursor:'pointer', color:'var(--secondary)'}}>
                   <MessageSquareIcon size={20} />
                   <span>{comments.length}</span>
               </button>
               <button onClick={handleShare} style={{display:'flex', gap:'8px', alignItems:'center', background:'none', border:'none', cursor:'pointer', color:'var(--secondary)'}}>
                   <ShareIcon size={20} />
               </button>
           </div>

           {showComments && (
               <div style={{marginTop:'24px', paddingTop:'24px', borderTop:'1px solid var(--border)'}}>
                   {comments.map(c => (
                       <div key={c.id} style={{marginBottom:'16px', paddingLeft:'16px', borderLeft:'2px solid var(--border)'}}>
                           <div style={{fontSize:'0.85rem', fontWeight:'700', marginBottom:'4px'}}>{c.author} <span style={{fontWeight:'400', color:'var(--secondary)'}}>• {c.time}</span></div>
                           <div style={{fontSize:'0.9rem', color:'var(--foreground)'}}>{renderContent(c.content)}</div>
                       </div>
                   ))}
                   
                   <div style={{marginTop:'24px'}}>
                        <SimpleRichTextEditor 
                            value={newComment}
                            onChange={setNewComment}
                            placeholder="Write a comment..."
                            minHeight="80px"
                        />
                        <div style={{display:'flex', justifyContent:'flex-end', marginTop:'8px'}}>
                             <button onClick={handleCommentSubmit} style={{
                                 background:'var(--primary)', color:'white', border:'none', borderRadius:'6px', padding:'6px 16px', fontSize:'0.9rem', cursor:'pointer'
                             }}>
                                 Reply
                             </button>
                        </div>
                   </div>
               </div>
           )}
        </div>
    );
}
