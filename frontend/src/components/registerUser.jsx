import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const RegisterUser = ({ ShowModal }) => {

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function validateName(name) {
        var re = /^[a-zA-Z ]+$/;
        return re.test(name);
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validatePassword(password) {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    }

    const handleClose = () => {
        ShowModal(false)
    }

    const handleSubmit = async () => {

        const newUser = { firstName, lastName, email, password }

        if (firstName !== '' && lastName !== '' && email !== '' && validatePassword(password)) {
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            handleClose()

            // const json = await response.json()
    
            if (response.ok) {
                alert("Successfully registered the user!");
            }
        }
        else{
            alert("Please fill all fields");
        }
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='d-flex justify-content-between'>
                            <div className='p-1 w-50'>
                                <Form.Label>Enter FirstName </Form.Label>
                                <Form.Control type="text" placeholder="John" name="firstName" onChange={(e) => setFirstName(e.target.value)} required />
                                {firstName === "" ? <p className="text-danger font-weight-bold">Please enter Firstname</p> : null}
                                {!validateName(firstName) && firstName !== "" ? <p className="text-danger font-weight-bold">Please enter valid first name</p> : null}
                            </div>

                            <div className='p-1 w-50'>
                                <Form.Label>Enter Lastname </Form.Label>
                                <Form.Control type="text" placeholder="Doe" name="lastName" onChange={(e) => setLastName(e.target.value)} required />
                                {lastName === "" ? <p className="text-danger font-weight-bold">Please enter Lastname</p> : null}
                                {!validateName(lastName) && lastName !== "" ? <p className="text-danger font-weight-bold">Please enter valid last name</p> : null}
                            </div>
                        </div>
                    </Form.Group>

                    <Form.Group className='pt-3'>
                        <Form.Label>Enter Email address </Form.Label>
                        <Form.Control type="email" placeholder="johnDoe12@gmail.com" name="email" onChange={(e) => setEmail(e.target.value)} required />
                        {email === "" ? <p className="text-danger font-weight-bold">Please enter Email</p> : null}
                        {!validateEmail(email) && email !== "" ? <p className="text-danger font-weight-bold">Please enter valid Email id</p> : null}
                    </Form.Group>

                    <Form.Group className='pt-3'>
                        <Form.Label clas>Enter Password </Form.Label>
                        <Form.Control type={passwordShown ? "text" : "password"} placeholder="********" name="password" onChange={(e) => setPassword(e.target.value)} required />
                        <div className='d-flex justify-content-between'>
                            <div>
                                {password === "" ? <p className="text-danger font-weight-bold">Please enter Password</p> : null}
                                {!validatePassword(password) && password !== "" ? <p className="text-danger font-weight-bold"><small>Password should contain Minimum 8 characters<br />1 capital letter 1 Special character 1 digit</small></p> : null}

                            </div>
                            <Button variant="transparent" className="btn text-primary" onClick={togglePassword}>Show Password</Button>
                        </div>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" name="nextButton" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </div>
    )
}

export default RegisterUser;