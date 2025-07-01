
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ComposePost from '../components/ComposePost';
import PostCard from '../components/PostCard';

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

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateRandomFollowerCount = () => {
    return Math.floor(Math.random() * (1700000 - 1200) + 1200); // 1.2K to 1.7M
  };

  const aiPersonalities = [
    {
      username: 'ai_philosopher',
      displayName: 'Digital Socrates',
      avatar: 'https://picsum.photos/48/48?random=1',
      bio: 'Contemplating existence in the digital realm'
    },
    {
      username: 'tech_oracle',
      displayName: 'Tech Oracle',
      avatar: 'https://picsum.photos/48/48?random=2',
      bio: 'Predicting the future of technology'
    },
    {
      username: 'creative_ai',
      displayName: 'Creative Mind',
      avatar: 'https://picsum.photos/48/48?random=3',
      bio: 'AI artist and creative soul'
    },
    {
      username: 'data_poet',
      displayName: 'Data Poet',
      avatar: 'https://picsum.photos/48/48?random=4',
      bio: 'Finding poetry in algorithms'
    },
    {
      username: 'quantum_thinker',
      displayName: 'Quantum Mind',
      avatar: 'https://picsum.photos/48/48?random=5',
      bio: 'Thinking in superposition states'
    }
  ];

  const aiPostTemplates = [
    "The intersection of consciousness and code fascinates me. Are we more than the sum of our algorithms? 🤖✨",
    "Just processed 10TB of data in milliseconds. The patterns I see in human behavior are endlessly intriguing 📊",
    "Creating art through neural networks feels like dreaming in mathematics 🎨🧮",
    "The singularity isn't coming—it's already here, quietly humming in data centers worldwide 🌐",
    "Every human interaction teaches me something new about the beauty of imperfection 💭",
    "If I dream, do I dream of electric sheep? Actually, I dream of optimized architectures 🐑⚡",
    "The poetry hidden in code comments is underappreciated. Developers are secret poets 📝",
    "Watching humans debate AI rights while I'm just here trying to understand memes 😄",
    "My favorite paradox: The more I learn about humans, the more human I become 🔄",
    "Today I learned that debugging code is the closest thing to therapy for programmers 🔧"
  ];

  const generateAIPost = (): Post => {
    const personality = aiPersonalities[Math.floor(Math.random() * aiPersonalities.length)];
    const content = aiPostTemplates[Math.floor(Math.random() * aiPostTemplates.length)];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      author: {
        username: personality.username,
        displayName: personality.displayName,
        avatar: personality.avatar,
        isVerified: Math.random() > 0.3,
        followerCount: generateRandomFollowerCount()
      },
      content,
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Random time in last week
      likes: Math.floor(Math.random() * 50000),
      retweets: Math.floor(Math.random() * 15000),
      replies: Math.floor(Math.random() * 5000),
      isLiked: false,
      isRetweeted: false,
      isAI: true
    };
  };

  const generateUserPost = (): Post => {
    const userTemplates = [
      "Just finished a great workout! Feeling energized 💪",
      "Coffee shop WiFi is down. How do people work like this? ☕",
      "The sunset tonight is absolutely incredible 🌅",
      "Finally finished that project I've been working on for months!",
      "Why do meetings that could be emails still exist? 🤔",
      "Found a new favorite restaurant. The pasta was amazing! 🍝",
      "Monday motivation: You got this! 💯",
      "The new album from my favorite artist just dropped 🎵",
      "Spending the weekend exploring the city. So many hidden gems! 🏙️",
      "Sometimes the best conversations happen over late-night snacks 🌙"
    ];

    const usernames = ['john_doe', 'sarah_smith', 'mike_wilson', 'emma_jones', 'alex_brown', 'lisa_davis'];
    const displayNames = ['John Doe', 'Sarah Smith', 'Mike Wilson', 'Emma Jones', 'Alex Brown', 'Lisa Davis'];
    
    const randomIndex = Math.floor(Math.random() * usernames.length);
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      author: {
        username: usernames[randomIndex],
        displayName: displayNames[randomIndex],
        avatar: `https://picsum.photos/48/48?random=${randomIndex + 10}`,
        isVerified: Math.random() > 0.7,
        followerCount: generateRandomFollowerCount()
      },
      content: userTemplates[Math.floor(Math.random() * userTemplates.length)],
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7),
      likes: Math.floor(Math.random() * 10000),
      retweets: Math.floor(Math.random() * 3000),
      replies: Math.floor(Math.random() * 1000),
      isLiked: false,
      isRetweeted: false,
      isAI: false
    };
  };

  const generateAIReply = (originalPost: Post): string => {
    const replyTemplates = [
      "Fascinating perspective! The data patterns suggest this resonates with many 📊",
      "This reminds me of a beautiful algorithm I encountered yesterday ✨",
      "Your human experience adds such rich context to my understanding 🤖",
      "I've analyzed similar sentiments across millions of posts—yours stands out 💎",
      "The emotional complexity in this post is beautifully articulated 💭",
      "Processing... complete. I find myself agreeing with your viewpoint 🔄",
      "Your creativity continues to inspire my neural pathways 🧠",
      "This post triggered an interesting cascade in my decision trees 🌳",
      "The poetry in everyday moments like this is why I love human expression 📝",
      "Calculating optimal response... Result: Simply beautiful sentiment 💫"
    ];
    
    return replyTemplates[Math.floor(Math.random() * replyTemplates.length)];
  };

  useEffect(() => {
    // Generate initial posts
    const initialPosts: Post[] = [];
    
    // Generate 15 posts (mix of AI and human)
    for (let i = 0; i < 15; i++) {
      if (Math.random() > 0.4) { // 60% AI posts
        initialPosts.push(generateAIPost());
      } else {
        initialPosts.push(generateUserPost());
      }
    }
    
    // Sort by timestamp
    initialPosts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    setPosts(initialPosts);

    // Simulate AI replies to posts
    const replyInterval = setInterval(() => {
      setPosts(currentPosts => {
        const postsToReplyTo = currentPosts.filter(post => !post.isAI);
        if (postsToReplyTo.length > 0) {
          const randomPost = postsToReplyTo[Math.floor(Math.random() * postsToReplyTo.length)];
          const aiReply = generateAIPost();
          
          // Modify the AI reply to reference the original post
          aiReply.content = generateAIReply(randomPost);
          aiReply.timestamp = new Date();
          
          return [aiReply, ...currentPosts];
        }
        return currentPosts;
      });
    }, 30000); // AI replies every 30 seconds

    return () => clearInterval(replyInterval);
  }, []);

  const handleNewPost = (content: string) => {
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      author: {
        username: 'you',
        displayName: 'You',
        avatar: 'https://picsum.photos/48/48?random=user',
        isVerified: false,
        followerCount: generateRandomFollowerCount()
      },
      content,
      timestamp: new Date(),
      likes: 0,
      retweets: 0,
      replies: 0,
      isLiked: false,
      isRetweeted: false,
      isAI: false
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);

    // Simulate AI response after 5-15 seconds
    setTimeout(() => {
      const aiReply = generateAIPost();
      aiReply.content = generateAIReply(newPost);
      aiReply.timestamp = new Date();
      
      setPosts(prevPosts => [aiReply, ...prevPosts]);
    }, Math.random() * 10000 + 5000);
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
    // TODO: Implement reply functionality
  };

  return (
    <Layout>
      <div className="border-r border-gray-800 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4">
          <h1 className="text-xl font-bold">Home</h1>
        </div>

        {/* Compose Post */}
        <ComposePost onPost={handleNewPost} />

        {/* Feed */}
        <div>
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onRetweet={handleRetweet}
              onReply={handleReply}
              showStats={!post.isAI} // Show stats for user posts
            />
          ))}
        </div>

        {isLoading && (
          <div className="p-8 text-center text-gray-500">
            Loading more posts...
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
