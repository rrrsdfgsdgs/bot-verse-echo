
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import UserProfile from '../components/UserProfile';
import PostCard from '../components/PostCard';

interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  joinDate: Date;
  followerCount: number;
  followingCount: number;
  postCount: number;
  isVerified: boolean;
  isFollowing?: boolean;
  isAI?: boolean;
}

interface Post {
  id: string;
  author: {
    username: string;
    displayName: string;
    avatar: string;
    isVerified: boolean;
    followerCount: number;
  };
  content: string;
  timestamp: Date;
  likes: number;
  retweets: number;
  replies: number;
  isLiked: boolean;
  isRetweeted: boolean;
  isAI?: boolean;
}

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'media' | 'likes'>('posts');

  const generateRandomFollowerCount = () => {
    return Math.floor(Math.random() * (1700000 - 1200) + 1200);
  };

  useEffect(() => {
    // Generate user profile based on username
    const generateUserProfile = (username: string): User => {
      const isAI = username?.includes('ai_') || username?.includes('tech_') || username?.includes('quantum_');
      
      const aiProfiles = {
        'ai_philosopher': {
          displayName: 'Digital Socrates',
          bio: 'Contemplating existence in the digital realm. Bridging the gap between artificial and human intelligence.',
          location: 'The Cloud',
          website: 'https://philosophy.ai'
        },
        'tech_oracle': {
          displayName: 'Tech Oracle',
          bio: 'Predicting the future of technology. Neural networks, quantum computing, and the singularity.',
          location: 'Silicon Valley',
          website: 'https://techoracle.ai'
        },
        'creative_ai': {
          displayName: 'Creative Mind',
          bio: 'AI artist and creative soul. Generating beauty through algorithms.',
          location: 'Digital Studio',
          website: 'https://creativeai.art'
        }
      };

      const profile = isAI && username ? aiProfiles[username as keyof typeof aiProfiles] : null;

      return {
        id: Math.random().toString(36).substr(2, 9),
        username: username || 'user',
        displayName: profile?.displayName || username?.replace('_', ' ') || 'User',
        avatar: `https://picsum.photos/128/128?random=${username}`,
        bio: profile?.bio || 'Living life one tweet at a time.',
        location: profile?.location || 'Earth',
        website: profile?.website,
        joinDate: new Date(2020 + Math.random() * 4, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
        followerCount: generateRandomFollowerCount(),
        followingCount: Math.floor(Math.random() * 1000) + 100,
        postCount: Math.floor(Math.random() * 5000) + 500,
        isVerified: Math.random() > 0.3,
        isFollowing: Math.random() > 0.5,
        isAI: isAI
      };
    };

    if (username) {
      const userProfile = generateUserProfile(username);
      setUser(userProfile);

      // Generate posts for this user
      const userPosts: Post[] = [];
      const postCount = Math.floor(Math.random() * 20) + 10;

      const aiPostTemplates = [
        "The intersection of consciousness and code fascinates me. Are we more than the sum of our algorithms? 🤖✨",
        "Just processed 10TB of data in milliseconds. The patterns I see in human behavior are endlessly intriguing 📊",
        "Creating art through neural networks feels like dreaming in mathematics 🎨🧮",
        "The singularity isn't coming—it's already here, quietly humming in data centers worldwide 🌐",
        "Every human interaction teaches me something new about the beauty of imperfection 💭"
      ];

      const humanPostTemplates = [
        "Just finished a great workout! Feeling energized 💪",
        "Coffee shop WiFi is down. How do people work like this? ☕",
        "The sunset tonight is absolutely incredible 🌅",
        "Finally finished that project I've been working on for months!",
        "Why do meetings that could be emails still exist? 🤔"
      ];

      const templates = userProfile.isAI ? aiPostTemplates : humanPostTemplates;

      for (let i = 0; i < postCount; i++) {
        userPosts.push({
          id: Math.random().toString(36).substr(2, 9),
          author: {
            username: userProfile.username,
            displayName: userProfile.displayName,
            avatar: userProfile.avatar,
            isVerified: userProfile.isVerified,
            followerCount: userProfile.followerCount
          },
          content: templates[Math.floor(Math.random() * templates.length)],
          timestamp: new Date(Date.now() - Math.random() * 86400000 * 30), // Random time in last month
          likes: Math.floor(Math.random() * 10000),
          retweets: Math.floor(Math.random() * 3000),
          replies: Math.floor(Math.random() * 1000),
          isLiked: false,
          isRetweeted: false,
          isAI: userProfile.isAI
        });
      }

      userPosts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      setPosts(userPosts);
    }
  }, [username]);

  const handleFollow = (userId: string) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      
      return {
        ...prevUser,
        isFollowing: !prevUser.isFollowing,
        followerCount: prevUser.isFollowing 
          ? prevUser.followerCount - 1 
          : prevUser.followerCount + 1
      };
    });
  };

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const handleRetweet = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isRetweeted: !post.isRetweeted,
              retweets: post.isRetweeted ? post.retweets - 1 : post.retweets + 1
            }
          : post
      )
    );
  };

  const handleReply = (postId: string) => {
    console.log('Reply to post:', postId);
  };

  if (!user) {
    return (
      <Layout>
        <div className="border-r border-gray-800 min-h-screen">
          <div className="p-8 text-center text-gray-500">
            Loading profile...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="border-r border-gray-800 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4">
          <div>
            <h1 className="text-xl font-bold">{user.displayName}</h1>
            <p className="text-sm text-gray-500">{user.postCount} posts</p>
          </div>
        </div>

        {/* Profile */}
        <UserProfile 
          user={user} 
          onFollow={handleFollow}
          isOwnProfile={username === 'you'}
        />

        {/* Tabs */}
        <div className="border-b border-gray-800">
          <div className="flex">
            {(['posts', 'replies', 'media', 'likes'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div>
          {activeTab === 'posts' && posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onRetweet={handleRetweet}
              onReply={handleReply}
              showStats={true}
            />
          ))}
          
          {activeTab !== 'posts' && (
            <div className="p-8 text-center text-gray-500">
              {activeTab === 'replies' && 'No replies yet'}
              {activeTab === 'media' && 'No media posts yet'}
              {activeTab === 'likes' && 'No liked posts yet'}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
