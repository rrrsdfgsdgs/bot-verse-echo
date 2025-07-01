
import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostStats {
  engagedFollowers: number;
  postReach: number;
  linkClickRate: number;
  followerGrowth: number;
  videoViewRate: number;
  replyCommentRate: number;
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
  stats?: PostStats;
  isAI?: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onRetweet: (postId: string) => void;
  onReply: (postId: string) => void;
  showStats?: boolean;
}

const PostCard = ({ post, onLike, onRetweet, onReply, showStats = false }: PostCardProps) => {
  const [showingStats, setShowingStats] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const generateRealisticStats = (): PostStats => {
    const followerCount = post.author.followerCount;
    const baseEngagement = Math.random() * 0.01 + 0.005; // 0.5% - 1.5%
    
    return {
      engagedFollowers: baseEngagement,
      postReach: Math.random() * 0.1 + 0.05, // 5% - 15%
      linkClickRate: Math.random() * 0.005 + 0.005, // 0.5% - 1%
      followerGrowth: Math.random() * 0.015 + 0.005, // 0.5% - 2%
      videoViewRate: Math.random() * 0.08 + 0.02, // 2% - 10%
      replyCommentRate: Math.random() * 0.003 // <0.3%
    };
  };

  const stats = post.stats || generateRealisticStats();

  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-950 transition-colors">
      <div className="flex space-x-3">
        <img
          src={post.author.avatar}
          alt={post.author.displayName}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold hover:underline cursor-pointer">
              {post.author.displayName}
            </h3>
            {post.author.isVerified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            {post.isAI && (
              <span className="bg-purple-600 text-xs px-2 py-1 rounded-full">AI</span>
            )}
            <span className="text-gray-500">@{post.author.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">
              {formatDistanceToNow(post.timestamp, { addSuffix: true })}
            </span>
            <button className="ml-auto p-2 hover:bg-gray-800 rounded-full">
              <MoreHorizontal size={16} />
            </button>
          </div>
          
          <div className="mt-2">
            <p className="text-white whitespace-pre-wrap">{post.content}</p>
          </div>

          {showingStats && (
            <div className="mt-4 p-4 bg-gray-900 rounded-lg">
              <h4 className="font-bold mb-3">Post Analytics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Engaged Followers</span>
                  <span>{(stats.engagedFollowers * 100).toFixed(1)}% - {(stats.engagedFollowers * 100 + 1).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Post Reach</span>
                  <span>{(stats.postReach * 100).toFixed(0)}% - {(stats.postReach * 100 + 5).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Link Click Rate</span>
                  <span>{(stats.linkClickRate * 100).toFixed(1)}% - {(stats.linkClickRate * 100 + 0.5).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Follower Growth</span>
                  <span>{(stats.followerGrowth * 100).toFixed(1)}% - {(stats.followerGrowth * 100 + 1).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Video View %</span>
                  <span>{(stats.videoViewRate * 100).toFixed(0)}% - {(stats.videoViewRate * 100 + 5).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Reply/Comment Rate</span>
                  <span>&lt;{(stats.replyCommentRate * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-4 max-w-md">
            <button
              onClick={() => onReply(post.id)}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-400 transition-colors group"
            >
              <div className="p-2 rounded-full group-hover:bg-blue-400/10">
                <MessageCircle size={16} />
              </div>
              <span className="text-sm">{formatNumber(post.replies)}</span>
            </button>

            <button
              onClick={() => onRetweet(post.id)}
              className={`flex items-center space-x-2 transition-colors group ${
                post.isRetweeted ? 'text-green-400' : 'text-gray-500 hover:text-green-400'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-green-400/10">
                <Repeat2 size={16} />
              </div>
              <span className="text-sm">{formatNumber(post.retweets)}</span>
            </button>

            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-2 transition-colors group ${
                post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-400'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-400/10">
                <Heart size={16} fill={post.isLiked ? 'currentColor' : 'none'} />
              </div>
              <span className="text-sm">{formatNumber(post.likes)}</span>
            </button>

            <button className="text-gray-500 hover:text-blue-400 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-400/10">
                <Share size={16} />
              </div>
            </button>

            {showStats && (
              <button
                onClick={() => setShowingStats(!showingStats)}
                className="text-gray-500 hover:text-blue-400 transition-colors text-sm"
              >
                {showingStats ? 'Hide' : 'View'} Stats
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
