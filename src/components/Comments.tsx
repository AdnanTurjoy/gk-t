import React, { useEffect, useState } from 'react';
import { fetchComments } from '../api';
import { ClipLoader } from 'react-spinners';

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentsProps {
  postId: number;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
    const fetchPostComments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchComments(postId);
        setComments(response.data);
      } catch (error) {
        setError('Error fetching comments');
        console.error('Error fetching comments', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostComments();
  }, [postId]);

  if (isLoading) {
    return <div className="mt-4"><ClipLoader color="#36d7b7" /></div>;
  }

  if (error) {
    return <div className="mt-4 text-red-500">{error}</div>;
  }

  return (
    <div className="mt-4 space-y-4">
		
      {comments.map(comment => (
        <div key={comment.id} className="border-t pt-4">
          <h4 className="text-lg font-semibold">{comment.name} <span className="text-sm text-gray-600">(by {comment.email})</span></h4>
          <p className="text-gray-700">{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
