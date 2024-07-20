import { useEffect, useState } from "react"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem('token'))

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [alreadyregistered, setAlreadyregistered] = useState("")

    const handleRegister = async () => {
        const body = { username, password }
        let res = await fetch("http://localhost:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        let data = await res.json()
        console.log(data)
        if (data.token) {
            localStorage.setItem('token', JSON.stringify(data.token))
            navigate("/")
        } else if (!data.token) {
            setAlreadyregistered(data.data + ": User already registered")
        }
        // navigate("/")
    }

    if (token) {
        useEffect(() => {
            navigate("/")
        }, [])
    }

    return (
        <>
            <Header />
            <div style={{
                maxWidth: "50%",
                margin: "80px auto"
            }}>
                <h1>Register Form</h1>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Username</span>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Password</span>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <button onClick={handleRegister} type="button" className="btn btn-primary">Register</button>
                <br/>
                <br/>
                <p>{alreadyregistered}</p>
            </div>
        </>
    )
}

export default Register