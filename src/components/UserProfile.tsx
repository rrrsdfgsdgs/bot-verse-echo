
import React from 'react';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';

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

interface UserProfileProps {
  user: User;
  onFollow?: (userId: string) => void;
  isOwnProfile?: boolean;
}

const UserProfile = ({ user, onFollow, isOwnProfile = false }: UserProfileProps) => {
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
    <div className="bg-black text-white">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600"></div>
      
      {/* Profile Info */}
      <div className="px-4 pb-4">
        <div className="flex justify-between items-start mb-4">
          <img
            src={user.avatar}
            alt={user.displayName}
            className="w-32 h-32 rounded-full border-4 border-black -mt-16"
          />
          
          {!isOwnProfile ? (
            <button
              onClick={() => onFollow?.(user.id)}
              className={`mt-4 px-6 py-2 rounded-full font-bold transition-colors ${
                user.isFollowing
                  ? 'bg-transparent border border-gray-600 text-white hover:bg-red-600 hover:border-red-600'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {user.isFollowing ? 'Following' : 'Follow'}
            </button>
          ) : (
            <button className="mt-4 px-6 py-2 border border-gray-600 rounded-full font-bold hover:bg-gray-900 transition-colors">
              Edit profile
            </button>
          )}
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
              {user.isVerified && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
              {user.isAI && (
                <span className="bg-purple-600 text-xs px-2 py-1 rounded-full">AI</span>
              )}
            </div>
            <p className="text-gray-500">@{user.username}</p>
          </div>
          
          {user.bio && (
            <p className="text-white">{user.bio}</p>
          )}
          
          <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
            {user.location && (
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center space-x-1">
                <LinkIcon size={16} />
                <a href={user.website} className="text-blue-400 hover:underline">
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>Joined {format(user.joinDate, 'MMMM yyyy')}</span>
            </div>
          </div>
          
          <div className="flex space-x-6 text-sm">
            <div>
              <span className="font-bold text-white">{formatNumber(user.followingCount)}</span>
              <span className="text-gray-500 ml-1">Following</span>
            </div>
            <div>
              <span className="font-bold text-white">{formatNumber(user.followerCount)}</span>
              <span className="text-gray-500 ml-1">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
