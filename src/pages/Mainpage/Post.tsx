import { addDoc, collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import { Post as Ipost } from "./Main";
import { auth, db } from "../../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props 
{
    post : Ipost;
}

interface Like
{
    likeId : string;
    userId:string;
}

const Post = (props : Props) => {

    const {post} = props;
    const [user] = useAuthState(auth);
    const [likes,setLikes] = useState<Like[] | null>(null);
    const likesRef = collection(db,"likes");
    const likesDoc = query(likesRef,where("postId","==",post.id));
   
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes((data.docs.map((doc) => ({userId : doc.data().id,likeId:doc.id}))));
    }
    const addLike = async () => {
        try{
        const newDoc = await addDoc(likesRef,{
            userId : user?.uid,
            postId : post.id,
        })
        if(user)
        {
            setLikes((prev) => prev? [...prev ,{userId : user?.uid , likeId : newDoc.id}] : [{userId:user?.uid,likeId : newDoc.id}]);
        }   
    }
    catch(error)
    {
        console.log(error);
    }
    };

    const removeLike = async()=>{
        try{
            const likeToDeleteQuery = query(likesRef,where("postId","==",post.id),where("userId","==",user?.uid));
            const likeToDeleteData = await getDocs(likeToDeleteQuery);

            const likeToDelete = doc(db,"likes",likeToDeleteData.docs[0].id);
            await deleteDoc(likeToDelete);
            if(user)
                {
                    setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeToDeleteData.docs[0].id));
                }  
        }
        catch(error)
        {
            console.log(error);
        }
    }
   
    useEffect(() => {
        getLikes();
    },[])
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
            <button onClick={hasUserLiked? removeLike:addLike}>{hasUserLiked ? <>&#128078;</>:<>&#128077;</>} </button>
            {likes && <p>Likes :{likes?.length} </p>}
        </div>
    </div>);
};

export default Post;