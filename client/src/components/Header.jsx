import { NavLink } from "react-router-dom"
import { Logout } from "../App"

const Header = () => {

    const token = JSON.parse(localStorage.getItem('token'))
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <>
            <nav style={{
                display: "flex",
                alignItems: "center"
            }}>
                <h1>Logo</h1>
                <ul style={{
                    display: "flex",
                    listStyle: "none",
                    fontSize: "20px",
                    marginTop: "20px"
                }}>
                    <li><NavLink style={{
                        textDecoration: "none"
                    }} to="/">Home</NavLink></li>
                    {
                        (!token) ? (
                            ""
                        ) : (
                            <li><NavLink style={{
                                textDecoration: "none",
                                margin: "0 0 0 40px"
                            }} to="/dashboard">Dashboard</NavLink></li>
                        )
                    }
                    {
                        (token) ? (
                            <li><NavLink style={{
                                textDecoration: "none",
                                margin: "0 0 0 40px"
                            }}>{<Logout />}</NavLink></li>
                        ) : (
                            <li><NavLink style={{
                                textDecoration: "none",
                                margin: "0 0 0 40px"
                            }} to="/login">Login</NavLink></li>
                        )
                    }
                    <li><NavLink style={{
                        textDecoration: "none",
                        margin: "0 0 0 40px"
                    }} to="/register">Register</NavLink></li>
                    <li style={{
                        textDecoration: "none",
                        margin: "0 0 0 40px"
                    }}>Hello { (user) ? user?.toUpperCase() : "Guest" }</li>
                </ul>
            </nav>

        </>
    )
}

export default Header