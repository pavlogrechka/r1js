import { useMemo, useState } from 'react';
import PostsList from './components/PostsList';
import './styles/App.css';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'aaa', body: '111eeee' },
    { id: 2, title: '333bbb 2', body: '3333ffff' },
    { id: 3, title: 'ccc 3', body: '222gggg' },
    { id: 4, title: 'dddd 3', body: '8888gggg' },
    { id: 5, title: 'eeee 3', body: '01010gggg' },
    { id: 6, title: '9999ffff 3', body: '8888gggg' },
  ]);

  const [filter, setFilter] = useState({
    sort: '',
    query: '',
  });

  const sortedPosts = useMemo(() => {
    console.log('sort function');
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query)
    );
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className='App'>
      <PostForm create={createPost} />

      <hr style={{ margin: '15px 0' }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      <PostsList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={'Posts list 1'}
      />
    </div>
  );
}

export default App;

// https://youtu.be/GNrdg3PzpJQ?t=5037
