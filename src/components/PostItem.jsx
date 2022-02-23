import MyButton from '../UI/buttons/MyButton';

const PostItem = (props) => {
  return (
    <div className='post'>
      <div className='post__content'>
        <strong>
          {props.post.id}. {props.post.title}
        </strong>
        <div className='post__content-body'>{props.post.body}</div>
      </div>
      <div className='post__btns'>
        <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
