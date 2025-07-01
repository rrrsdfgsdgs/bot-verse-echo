
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Search, TrendingUp } from 'lucide-react';

interface TrendingTopic {
  rank: number;
  category: string;
  hashtag: string;
  postCount: number;
}

interface User {
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followerCount: number;
  isVerified: boolean;
  isAI?: boolean;
}

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);

  const generateRandomFollowerCount = () => {
    return Math.floor(Math.random() * (1700000 - 1200) + 1200);
  };

  useEffect(() => {
    // Generate trending topics
    const topics = [
      { category: 'Technology', hashtag: 'AI', postCount: 125000 },
      { category: 'Politics', hashtag: 'Election2024', postCount: 89000 },
      { category: 'Sports', hashtag: 'WorldCup', postCount: 156000 },
      { category: 'Entertainment', hashtag: 'Oscars', postCount: 78000 },
      { category: 'Technology', hashtag: 'Blockchain', postCount: 92000 },
      { category: 'Music', hashtag: 'GrammyNoms', postCount: 64000 },
      { category: 'Science', hashtag: 'ClimateChange', postCount: 134000 },
      { category: 'Gaming', hashtag: 'GameOfTheYear', postCount: 87000 },
      { category: 'Fashion', hashtag: 'MetGala', postCount: 96000 },
      { category: 'Food', hashtag: 'Thanksgiving', postCount: 112000 }
    ];

    const shuffledTopics = topics
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map((topic, index) => ({
        rank: index + 1,
        ...topic
      }));

    setTrendingTopics(shuffledTopics);

    // Generate suggested users
    const users: User[] = [
      {
        username: 'ai_philosopher',
        displayName: 'Digital Socrates',
        avatar: 'https://picsum.photos/48/48?random=1',
        bio: 'Contemplating existence in the digital realm',
        followerCount: generateRandomFollowerCount(),
        isVerified: true,
        isAI: true
      },
      {
        username: 'tech_oracle',
        displayName: 'Tech Oracle',
        avatar: 'https://picsum.photos/48/48?random=2',
        bio: 'Predicting the future of technology',
        followerCount: generateRandomFollowerCount(),
        isVerified: true,
        isAI: true
      },
      {
        username: 'creative_ai',
        displayName: 'Creative Mind',
        avatar: 'https://picsum.photos/48/48?random=3',
        bio: 'AI artist and creative soul',
        followerCount: generateRandomFollowerCount(),
        isVerified: false,
        isAI: true
      },
      {
        username: 'sarah_dev',
        displayName: 'Sarah Chen',
        avatar: 'https://picsum.photos/48/48?random=11',
        bio: 'Full-stack developer & coffee enthusiast',
        followerCount: generateRandomFollowerCount(),
        isVerified: false,
        isAI: false
      },
      {
        username: 'mike_startup',
        displayName: 'Mike Rodriguez',
        avatar: 'https://picsum.photos/48/48?random=12',
        bio: 'Building the future, one startup at a time',
        followerCount: generateRandomFollowerCount(),
        isVerified: true,
        isAI: false
      }
    ];

    setSuggestedUsers(users);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Layout>
      <div className="border-r border-gray-800 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4">
          <h1 className="text-xl font-bold mb-4">Explore</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1">
            {/* Trending Section */}
            <div className="p-4">
              <div className="bg-gray-900 rounded-2xl p-4">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <TrendingUp className="mr-2" size={20} />
                  What's happening
                </h2>
                
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <div key={topic.rank} className="hover:bg-gray-800 p-3 rounded-lg transition-colors cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            {topic.rank} · Trending in {topic.category}
                          </p>
                          <h3 className="font-bold text-white">#{topic.hashtag}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatNumber(topic.postCount)} posts
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Who to Follow */}
            <div className="p-4">
              <div className="bg-gray-900 rounded-2xl p-4">
                <h2 className="text-xl font-bold mb-4">Who to follow</h2>
                
                <div className="space-y-3">
                  {suggestedUsers.map((user) => (
                    <div key={user.username} className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.displayName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-1">
                            <h3 className="font-bold text-white">{user.displayName}</h3>
                            {user.isVerified && (
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                            {user.isAI && (
                              <span className="bg-purple-600 text-xs px-2 py-1 rounded-full">AI</span>
                            )}
                          </div>
                          <p className="text-gray-500 text-sm">@{user.username}</p>
                          <p className="text-gray-400 text-sm mt-1">{user.bio}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            {formatNumber(user.followerCount)} followers
                          </p>
                        </div>
                      </div>
                      
                      <button className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
