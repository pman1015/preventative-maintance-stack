import { useEffect, useState } from "react"
import { navigate } from 'react-router-dom'
import "./dashboard.css"

function DashboardPage(){
    const [user,setUser] = useState({})
    // one time use effect on load
    useEffect(() => {
        console.log(localStorage.getItem("Authentication"))
        setUser(JSON.parse(localStorage.getItem('Authentication')));
    },[]) 

    return(
        <div className="background">
            <h1>Test</h1>
            <h2>{user.username}</h2>
        </div>
    )
}
export default DashboardPage;