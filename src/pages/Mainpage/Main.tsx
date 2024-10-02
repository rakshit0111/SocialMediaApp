import {getDocs,collection} from "firebase/firestore"
import { db } from "../../Config/firebase";
import { useState,useEffect } from "react";
import Post from "./Post";


export interface Post {
  id : string;
  userId : string;
  title : string;
  username : string;
  description : string;
}
const Main = () => {
  const [postLists,setPostLists] = useState<Post[] | null>(null);
  const postsRef = collection(db,"posts");


  const getPosts = async () => {
      const data = await getDocs(postsRef);
      setPostLists(data.docs.map((doc) => ({...doc.data(), id:doc.id})) as Post[]);
  };

  useEffect(() => {
    getPosts();
  },[])

    return (<div>
      {postLists?.map((post) => (
        <Post post={post}/>
      ))}
    </div>)
}

export default Main;