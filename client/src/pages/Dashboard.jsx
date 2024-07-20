import Header from "../components/Header"
import { useEffect, useState } from "react"
import { json, useNavigate } from "react-router-dom"

// https://docs.google.com/document/d/e/2PACX-1vR7nLxKhFsKScuM-XvLgtgPPIMSdB8_SrOKQ7Aui2zSEEd_DbxyHt-5bF_7lOSX9sjpc90KiTnKZb5N/pub

const Dashboad = () => {
    const token = JSON.parse(localStorage.getItem('token'))

    const [ posts, setPosts ] = useState([])
    const [ title, setTitle ] = useState("") 
    const [ body, setBody ] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        fetchPosts()
    }, [])

    let fetchPosts = async () => {
        let res = await fetch("http://localhost:8000/blog/posts/")
        let data = await res.json()
        setPosts(data)
    }

    let addPost = async () => {
        let body2 = { title, body }
        let res = await fetch("http://localhost:8000/blog/posts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "token " + JSON.parse(localStorage.getItem('token')) 
            },
            body: JSON.stringify(body2)
        })
        let data = await res.json()
        console.log(data)
        navigate(0)
    }

    let handleDelete = async (id) => {
        let res = await fetch("http://localhost:8000/blog/posts/" + id + "/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "token " + JSON.parse(localStorage.getItem('token')) 
            },
        })
        navigate(0)

        // let data = await res.json()
        // console.log(data)
    }

    let handleUpdate = async (id) => {
        let body2 = { title, body }

        let res = await fetch("http://localhost:8000/blog/posts/" + id + "/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "token " + JSON.parse(localStorage.getItem('token')) 
            },
            body: JSON.stringify(body2)
        })
        navigate(0)
        // let data = await res.json()
        // console.log(data)
    }



    if (!token) {
        return (
            <>
                <Header />
                <h1>Not Authorised</h1>
            </>
        )
    }

    return (
        <>
            <Header />
            <h1>Dashboard</h1>
            <section style={{
                maxWidth: "60%",
                margin: "80px auto"
            }}>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Post
            </button>

            <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Title</span>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>
                <br/>
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Body</span>
                    <input onChange={(e) => setBody(e.target.value)} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={addPost} type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>
            <br/>
            <br/>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            posts.map((post) => {
                                return (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.owner}</td>
                                        <td>
                                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModal"+ post.id}>
                                        Update
                                        </button>

                                        <div class="modal fade" id={"exampleModal"+post.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Title</span>
                                                <input onChange={(e) => setTitle(e.target.value)} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                                            </div>
                                            <br/>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Body</span>
                                                <input onChange={(e) => setBody(e.target.value)} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                                            </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button onClick={() => handleUpdate(post.id)} type="button" class="btn btn-primary">Save changes</button>
                                            </div>
                                            </div>
                                        </div>
                                        </div></td>
                                        <td><button onClick={() => {handleDelete(post.id)}} type="button" class="btn btn-danger">Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
            </section>
        </>
    )
}

export default Dashboad