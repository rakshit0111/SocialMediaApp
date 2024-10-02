import { Post as Ipost } from "./Main";
interface Props 
{
    post : Ipost;
}

const Post = (props : Props) => {

    const {post} = props;
    return (
    <div>
        <div>
            <h1>{post.title}</h1>
        </div>
        <div>
            <p>{post.description}</p>
        </div>
        <div>
            <p>By  {post.username}</p>
            <button> &#128077;</button>
        </div>
    </div>);
};

export default Post;