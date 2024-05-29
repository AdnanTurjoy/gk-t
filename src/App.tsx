import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchUsers } from './api';
import Post from './components/Post.tsx';
import { ClipLoader } from 'react-spinners';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [postsResponse, usersResponse] = await Promise.all([fetchPosts(), fetchUsers()]);
        const postsData = postsResponse.data.sort((a: Post, b: Post) => b.id - a.id);
        setPosts(postsData);
        setUsers(usersResponse.data);
      } catch (error) {
        setError('Error fetching posts');
        console.error('Error fetching data', error);
      }  finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserName = (userId: number) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  
  if (isLoading) {
    return <div className="mt-4"><ClipLoader color="#36d7b7" /></div>;
  }

  if (error) {
    return <div className="mt-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Forum Timeline</h1>
      <div className="space-y-6">
        {posts.map(post => (
          <Post key={post.id} post={post} userName={getUserName(post.userId)} />
        ))}
      </div>
    </div>
  );
};

export default App;
