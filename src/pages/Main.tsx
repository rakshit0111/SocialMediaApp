import {getDocs,collection} from "firebase/firestore"
import { db } from "../Config/firebase";
import { useState,useEffect } from "react";
import { Interface } from "readline";

interface Post {
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
      MAIN
    </div>)
}

export default Main;