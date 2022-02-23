import { useEffect, useState } from 'react';
import { usePosts } from './hooks/usePosts';
import PostsList from './components/PostsList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './UI/MyModal/MyModal';
import MyButton from './UI/buttons/MyButton';
import PostService from './API/PostService';
import Loader from './UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from './utils/pages';
import './styles/App.css';
import Pagination from './UI/pagination/Pagination';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: '',});
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  // TODO use useMemo to prevent recalculating on every page render
  // and recalculating only when pages quantity was changed
  
  // console.log([pagesArray])

  const [fetchPosts, isPostLoading, postError] = useFetching( async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  // console.log(totalPages)

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className='App'>
      <MyButton onClick={fetchPosts}>get posts</MyButton>
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Create User
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: '15px 0' }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      {postError &&
        <h1>{`Error message: ${postError}`}</h1>
      }
      {isPostLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
            <Loader />
          </div>
        : <PostsList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={'Posts list 1'}
      />
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;

//https://youtu.be/GNrdg3PzpJQ?t=7583