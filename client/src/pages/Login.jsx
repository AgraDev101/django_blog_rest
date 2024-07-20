import { useState } from "react"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleLogin = async () => {
        const body = { username, password }
        let res = await fetch("http://localhost:8000/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        let data = await res.json()
        console.log(data)
        if (!data.token) {
            navigate("/")
        } else {
            localStorage.setItem('token', JSON.stringify(data.token))
            localStorage.setItem('user', JSON.stringify(data.user.username))
            navigate("/")
        }
    }


    return (
        <>
            <Header />
            <div style={{
                maxWidth: "50%",
                margin: "80px auto"
            }}>
                <h1>Login Form</h1>
                    <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Username</span>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                    <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Password</span>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <button onClick={handleLogin} type="button" className="btn btn-primary">Login</button>
            </div>
        </>
    )
}

export default Login