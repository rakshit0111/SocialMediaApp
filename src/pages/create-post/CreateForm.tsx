import { title } from "process";
import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc,collection} from "firebase/firestore"
import {auth, db} from "../../Config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";

interface CreatePostData
{
    title : string;
    description : string;
}
const CreateForm = () => {
    const schema = yup.object().shape({
        title : yup.string().required("Title is required!!"),
        description : yup.string().required("Description is required!!"),
    });

    const [user] = useAuthState(auth);

    const {register,handleSubmit ,formState:{errors}} = useForm<CreatePostData>({
        resolver : yupResolver(schema)
    })

    const postsRef = collection(db,"posts");

    const onCreatePost = async (data:CreatePostData) =>{
        await addDoc(postsRef,{
            title : data.title,
            description : data.description,
            username : user?.displayName,
            userId : user?.uid,
        })
    }
    return (
    <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Enter the title for your post" {...register("title")}/>
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea placeholder="Enter the description for your post" {...register("description")}/>
        <p style={{color :"red"}}>{errors.description?.message}</p>
        <input type="submit"/>
    </form>    
    );
};

export default CreateForm;