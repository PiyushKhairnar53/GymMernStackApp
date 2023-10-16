import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';

const AddWorkout = ({ ShowModal }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        ShowModal(false)
    }

    const { user } = useAuthContext()

    // const changeProp = () => {
    //     console.log('old prop - ' + ShowModal)
    //     ShowModal = 'Hello world'
    //     console.log('old prop - ' + ShowModal)
    // }

    var weekdays_list = new Array("Select-Weekday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [weekday, setWeekday] = useState(0);
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {

        const workout = { title, load, reps, weekday }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            setWeekday(0)
            console.log('new workout added:', json)
            ShowModal(false)
        }
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Add New Workout</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>

                    <Form.Group className='p-2'
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Select aria-label="Matter priority" defaultValue={weekday} name="weekday" onChange={(e) => setWeekday(e.target.value)}>
                            {weekdays_list.map((day, index) => {
                                return (<option value={index} disabled={index === 0}>
                                    {day}</option>);
                            })}
                        </Form.Select>
                        {weekday === 0 ? <p className="text-danger font-weight-bold mx-2" style={{paddingBottom:'0 !important'}}>Please Select Weekday</p> : null}
                    </Form.Group>

                    <Form.Group className="p-2" controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter Title </Form.Label>
                        <Form.Control type="text" placeholder="Dumble press" name="username" onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="p-2">
                        <Form.Label>Enter Number of sets </Form.Label>
                        <Form.Control type="number" placeholder='4' name="sets" onChange={(e) => setLoad(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="p-2">
                        <Form.Label clas>Enter Repitions </Form.Label>
                        <Form.Control type="number" placeholder="50" name="reps" onChange={(e) => setReps(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            {error && <div className="error text-danger text-center mx-4 mb-2">{error}</div>}

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button type='submit' variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </div>
    )

}

export default AddWorkout