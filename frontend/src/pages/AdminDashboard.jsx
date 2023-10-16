
import NavbarHome from '../components/navbar';
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext";
import Sidebar from "../components/sidebar";
import { useState } from 'react';

const AdminDashboard = () => {

    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    return (
        <div>
            <NavbarHome onClick={handleViewSidebar} />

            <div className="d-flex">
                <div>
                    <Sidebar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard