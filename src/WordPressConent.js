import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HeroBanner from './HeroBanner';

const PostContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const WordPressContent = () => {
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch both posts and pages data from the WordPress REST API endpoint
    const fetchPosts = axios.get('http://localhost/wordpress/wp-json/wp/v2/posts');
    const fetchPages = axios.get('http://localhost/wordpress/wp-json/wp/v2/pages');

    Promise.all([fetchPosts, fetchPages])
      .then(([postsResponse, pagesResponse]) => {
        setPosts(postsResponse.data);
        setPages(pagesResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching the content.');
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
          <PostContainer key={post.id}>
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </PostContainer>
        ))
      ) : (
        <p>No posts found.</p>
      )}

      <h1>WordPress Pages</h1>
      {pages.length > 0 ? (
        pages.map((page) => (
          <div key={page.id}>
            {/* Render HeroBanner component if ACF fields exist */}
            {page.acf && page.acf.hero_title && page.acf.hero_subtitle && page.acf.hero_background_image && (
              <HeroBanner
                title={page.acf.hero_title}
                subtitle={page.acf.hero_subtitle}
                backgroundImage={page.acf.hero_background_image}
              />
            )}
            <h2 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
            <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
          </div>
        ))
      ) : (
        <p>No pages found.</p>
      )}
    </div>
  );
};

export default WordPressContent;
