import { getDocs, collection } from "firebase/firestore"
import { db } from "../../Config/firebase"
import { useState, useEffect } from "react"
import Post from "./Post"

export interface Post {
  id: string
  userId: string
  title: string
  username: string
  description: string
}

const Main = () => {
  const [postLists, setPostLists] = useState<Post[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const postsRef = collection(db, "posts")

  const getPosts = async () => {
    try {
      const data = await getDocs(postsRef)
      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[])
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Posts</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : postLists && postLists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postLists.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No posts found.</p>
      )}
    </div>
  )
}

export default Main