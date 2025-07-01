
import React, { useState } from 'react';
import { Image, Film, MapPin, Smile, Calendar } from 'lucide-react';

interface ComposePostProps {
  onPost: (content: string) => void;
  placeholder?: string;
}

const ComposePost = ({ onPost, placeholder = "What's happening?" }: ComposePostProps) => {
  const [content, setContent] = useState('');
  const maxLength = 280;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && content.length <= maxLength) {
      onPost(content);
      setContent('');
    }
  };

  const remainingChars = maxLength - content.length;
  const isOverLimit = remainingChars < 0;
  const isNearLimit = remainingChars <= 20;

  return (
    <div className="border-b border-gray-800 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <img
            src="https://picsum.photos/48/48?random=user"
            alt="Your avatar"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent text-xl placeholder-gray-500 resize-none border-none outline-none"
              rows={3}
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4 text-blue-400">
                <button type="button" className="hover:bg-blue-400/10 p-2 rounded-full transition-colors">
                  <Image size={20} />
                </button>
                <button type="button" className="hover:bg-blue-400/10 p-2 rounded-full transition-colors">
                  <Film size={20} />
                </button>
                <button type="button" className="hover:bg-blue-400/10 p-2 rounded-full transition-colors">
                  <MapPin size={20} />
                </button>
                <button type="button" className="hover:bg-blue-400/10 p-2 rounded-full transition-colors">
                  <Smile size={20} />
                </button>
                <button type="button" className="hover:bg-blue-400/10 p-2 rounded-full transition-colors">
                  <Calendar size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${
                    isOverLimit ? 'border-red-500 text-red-500' : 
                    isNearLimit ? 'border-yellow-500 text-yellow-500' : 
                    'border-gray-600 text-gray-400'
                  }`}>
                    {isNearLimit || isOverLimit ? remainingChars : ''}
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={!content.trim() || isOverLimit}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComposePost;
