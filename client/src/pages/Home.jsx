import { useEffect, useState } from "react"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [ posts, setPosts ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchPosts()
    }, [])

    let fetchPosts = async () => {
        let res = await fetch("http://localhost:8000/blog/posts/")
        let data = await res.json()
        setPosts(data)
    }

    return (
        <>
            <Header />
            <h1>Home Page</h1>
            <section style={{
                maxWidth: "50%",
                margin: "80px auto"
            }}>
                {
                    posts.map((post) => {
                        return (
                            <div key={post.id} className="mb-1 p-1" style={{
                                backgroundColor: "lightgrey"
                            }}>
                                <p className="text-end">Author: {post.owner}</p>
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                            </div>
                        )
                    })
                }

            </section>
        </>
    )
}

export default Home