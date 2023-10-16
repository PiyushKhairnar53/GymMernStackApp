import React from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaArrowAltCircleLeft, FaArrowLeft } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {

    const navigate = useNavigate();
    const { dispatch } = useAuthContext()

    const sidebarClass = isOpen ? "sidebar open bg-secondary" : "sidebar bg-secondary"

    const handleLogout = () => {
        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' })
        navigate('/')
    }

    return (
        <div className={sidebarClass}>

            <div className="container">
                <div>
                    <Link to="/" className="btn text-white w-100">
                        <strong>Dashboard</strong>
                    </Link>
                </div>
                <div>
                    <Link className="btn text-white w-100" onClick={handleLogout}><strong>Logout</strong></Link>
                    {/* <Button variant="transparent" className="btn bg-white" onClick={handleLogout}><strong>Logout</strong></Button> */}
                </div>
                <div>
                    <Link className="btn text-white w-100" onClick={toggleSidebar}>
                        {/* <button onClick={toggleSidebar}> */}
                        <FaArrowAltCircleLeft style={{ height: "20px", width: "20px" }} /> Close
                        {/* </button> */}
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Sidebar;