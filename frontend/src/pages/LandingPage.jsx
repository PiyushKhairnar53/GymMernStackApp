import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Navbar } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import RegisterUser from "../components/registerUser";
import { useAuthContext } from '../hooks/useAuthContext'


const LandingPage = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false) ;
    // const [updateList,setUpdateList] = useState(false);
    const { dispatch } = useAuthContext()


    const handleClose = () => {
        setShow(false);
    }

    const closeModal = (showValue) => {
        setShow(showValue);
    }

    const handleShow = () => setShow(true);

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async() => {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
          })
          const json = await response.json()
      
          if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            // console.log("User role")
            // localStorage.setItem('userRole',JSON.stringify(json('userRole')))
            dispatch({type: 'LOGIN', payload: json})

            console.log(json)
            navigate('/home')
          }
    }

    return (
        <div>
            <header style={{ position: 'sticky', top: ' 0px', zIndex: '1' }} className='bg-primary shadow p-1 mb-2'>
                <div className='navbar'>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h5 className='text-white mx-2'>Workout</h5>
                    </Link>

                    <div>
                        <Button variant="transparent" className="btn pr-2 text-white" onClick={handleShow}><strong>Register</strong></Button>
                    </div>

                </div>
            </header>
            <div className="d-flex justify-content-center">
                <div className="col-lg-5 mt-4 mx-5">
                    <div className="card2 shadow card border-0 px-5 pt-2">
                        <h4 className="mt-2 text-center"><strong>Login</strong></h4>
                        <div className="row pt-3">
                            <label className="mb-1 mt-1 text-start"><h6 className="mb-0 text-start">Email</h6></label>
                            <input className="mt-1 form-control" type="text" name="email"
                                placeholder="Enter a valid email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <div className="d-flex justify-content-start">
                                {email === "" ? <p className="text-danger pt-2">Please enter the Email</p> : null}
                            </div>
                        </div>
                        <div className="row pt-3">
                            <label className="mb-1 mt-2"><h6 className="mb-0 text-start">Password</h6></label>
                            <input name="password"
                                className="mt-2 pt-1 form-control"
                                class="form-control"
                                placeholder="Enter password"
                                value={password}
                                type={passwordShown ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)} />
                            <div className='d-flex justify-content-between'>
                                <div>
                                    {password === "" ? <p className="text-danger pt-2">Please enter the Password</p> : null}
                                </div>
                                <Button variant="transparent" className="btn text-primary" onClick={togglePassword}>Show Password</Button>
                            </div>

                        </div>

                        <div className="d-flex justify-content-center row mb-3 mt-4">
                            <Button type="submit" variant="primary" className="btn text-center" onClick={handleLogin}>Login</Button>

                        </div>
                        <div className="row pt-3 pb-4">
                            <small className="font-weight-bold">Don't have an account? <strong><a className="text-primary">Register</a></strong> </small>
                        </div>
                    </div>
                </div>
            </div>

            <Modal style={{position:'fixed'}} show={show} onHide={handleClose}>
                <RegisterUser ShowModal={closeModal} />
            </Modal>
        </div>
    )
}

export default LandingPage;