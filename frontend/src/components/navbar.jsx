import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import AddWorkout from './addWorkout';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaAlignLeft, FaBars } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav } from "react-bootstrap";

const NavbarHome = ({ UpdateList, onClick }) => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const { dispatch } = useAuthContext()

    const handleClose = () => {
        setShow(false);
    }

    const closeModal = (showValue) => {
        setShow(showValue);
        UpdateList(true);
    }

    const handleLogout = () => {
        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' })
        navigate('/')
    }

    const handleShow = () => setShow(true);

    return (
        // <Navbar
        //     bg="light"
        //     style={{ position: 'sticky', top: ' 0px', zIndex: '1', height: '3rem', }}
        //     className="navbar shadow-sm p-3 bg-white rounded shadow"
        //     expand>

        //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //     <Navbar.Collapse id="responsive-navbar-nav">
        //         <div className='navbar navbarHeight'>

        //             <div className='d-flex justify-content-around px-2'>
        //                 <Button variant="outline-info" onClick={onClick}>
        //                     <FaAlignLeft />
        //                 </Button>
        //                 <h5 className='text-black mx-2 my-2'>Workout</h5>
        //             </div>

        //             <div>
        //                 <div>
        //                     <button className="btn btn-primary" onClick={handleShow}> Add Workout</button>
        //                 </div>
        //             </div>

        //         </div>
        //     </Navbar.Collapse>
        // </Navbar>
        <header style={{ position: 'sticky', top: ' 0px', zIndex: '1', height: '3rem', }} className='bg-primary shadow p-1'>
            <div className='navbar navbarHeight'>

                <div className='d-flex justify-content-around px-2'>
                    <div className='d-flex align-items-center'>
                        <FaBars className='text-white' onClick={onClick} />
                        {/* <button onClick={onClick}><FaHamburger/></button> */}
                    </div>

                    <h5 className='text-white mx-2 my-2'>Workout</h5>
                </div>

                <div className='d-flex justify-content-around'>
                    <div>
                        <button className="btn btn-primary" onClick={handleShow}> Add Workout</button>
                    </div>
                </div>

            </div>
            <Modal style={{ position: 'fixed' }} show={show} onHide={handleClose}>
                <AddWorkout ShowModal={closeModal} />
            </Modal>
        </header>
    )
}

export default NavbarHome;