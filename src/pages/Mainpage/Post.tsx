import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { Post as IPost } from "./Main"
import { auth, db } from "../../Config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"

interface Props {
  post: IPost
}

interface Like {
  likeId: string
  userId: string
}

const Post = (props: Props) => {
  const { post } = props
  const [user] = useAuthState(auth)
  const [likes, setLikes] = useState<Like[] | null>(null)
  const likesRef = collection(db, "likes")
  const likesDoc = query(likesRef, where("postId", "==", post.id))

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

  const getLikes = async () => {
    try {
      const data = await getDocs(likesDoc)
      setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })))
    } catch (error) {
      console.error("Error fetching likes:", error)
    }
  }

  const addLike = async () => {
    try {
      if (user) {
        const newDoc = await addDoc(likesRef, {
          userId: user.uid,
          postId: post.id,
        })
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }]
        )
      }
    } catch (error) {
      console.error("Error adding like:", error)
    }
  }

  const removeLike = async () => {
    try {
      if (user) {
        const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user.uid))
        const likeToDeleteData = await getDocs(likeToDeleteQuery)

        const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id)
        await deleteDoc(likeToDelete)
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeToDeleteData.docs[0].id))
      }
    } catch (error) {
      console.error("Error removing like:", error)
    }
  }

  useEffect(() => {
    getLikes()
  }, [])

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">By {post.username}</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={hasUserLiked ? removeLike : addLike}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                hasUserLiked
                  ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              aria-label={hasUserLiked ? "Unlike" : "Like"}
            >
              {hasUserLiked ? <ThumbsDown size={16} /> : <ThumbsUp size={16} />}
              <span>{hasUserLiked ? "Unlike" : "Like"}</span>
            </button>
            {likes && (
              <span className="text-sm text-gray-500 font-medium">{likes.length} {likes.length === 1 ? "like" : "likes"}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post