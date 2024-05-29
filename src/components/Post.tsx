import React, { useState } from 'react';
import Comments from './Comments.tsx';

interface PostProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
  userName: string;
}

const Post: React.FC<PostProps> = ({ post, userName }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <h3 className="text-md text-gray-600 mb-4">By: {userName}</h3>
      <p className="text-gray-800 mb-4">{post.body}</p>
      <button 
        onClick={() => setShowComments(!showComments)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
      >
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && <Comments postId={post.id} />}
    </div>
  );
};

export default Post;
