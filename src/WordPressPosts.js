// src/WordPressPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WordPressPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the WordPress REST API endpoint
    axios
      .get('http://localhost/wordpress/wp-json/wp/v2/posts')
      .then((response) => {
        console.log(response.data)
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setError('An error occurred while fetching the posts.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>WordPress Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className={post.class_list.join(' ')}>
            <h2>{post.title.rendered}</h2>
            <p>
              <strong>Published on:</strong> {new Date(post.date).toLocaleDateString()}
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default WordPressPosts;
