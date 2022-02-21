import { useEffect, useState } from 'react';
import { usePosts } from './hooks/usePosts';
import PostsList from './components/PostsList';
import './styles/App.css';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './UI/MyModal/MyModal';
import MyButton from './UI/buttons/MyButton';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({
    sort: '',
    query: '',
  });

  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  };

  async function fetchPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setPosts(response.data)
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className='App'>
      <button onClick={fetchPosts}>get posts</button>
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Create User
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

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
