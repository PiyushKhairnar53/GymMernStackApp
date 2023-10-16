import { useEffect, useState } from "react";
import WorkoutDetails from "../components/workoutDetail"
import AddWorkout from "../components/addWorkout";
import { Modal } from 'react-bootstrap';
import NavbarHome from '../components/navbar';
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext";
import Sidebar from "../components/sidebar";
import { Card, Button, Form } from "react-bootstrap";

const Home = () => {

    // const {workouts, dispatch} = useWorkoutsContext()
    const { user } = useAuthContext()

    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const [workouts, setWorkouts] = useState([])
    const [show, setShow] = useState(false);
    // const [updateList,setUpdateList] = useState(false);
    const [weekday, setWeekday] = useState(0);

    var weekdays_list = new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

    const handleClose = () => {
        setShow(false);
    }

    const closeModal = (showValue) => {
        setShow(showValue);
    }

    const updateWorkoutsList = (updateValue) => {
        if (updateValue === true) {
            fetchWorkouts();
        }
    }

    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchWorkouts()
    }, [weekday])

    const fetchWorkouts = async () => {
        // const finalWeekday = Number(weekday) + Number(1)
        // console.log(weekday);
        const response = await fetch(`/api/workouts/weekday/${Number(weekday)}`, {
            headers: { 'Authorization': `Bearer ${user.token}` },
        })
        const json = await response.json()

        if (response.ok) {
            setWorkouts(json)
        }
        // else{
        //     setWorkouts(null)
        // }
    }

    const changeWeekday = (e) => {
        setWeekday(e)
        // fetchWorkouts()
    }

    // const getWorkouts = () => {
    //     const response = fetch('/api/workouts')
    //     const json = response.json()

    //     if (response.ok) {
    //         setWorkouts(json)
    //     }
    // }


    return (
        <div className="home">
            <NavbarHome UpdateList={updateWorkoutsList} onClick={handleViewSidebar} />

            <div className="d-flex">
                <div>
                    <Sidebar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
                </div>
                <div className="container">
                    <div className="col w-100">
                        <div className="row-lg-2 d-flex justify-content-center w-100">
                            <div className='w-50 p-1 mt-2'>
                                <Form.Select className="text-center" aria-label="Matter priority" name="weekday" onChange={(e) => changeWeekday(e.target.value)}>
                                    {weekdays_list.map((day, index) => {
                                        return (<option value={index}>
                                            {day}</option>);
                                    })}
                                </Form.Select>
                            </div>
                        </div>
                        <div className="row-md-auto" style={{ overflow: 'auto', height: '475px', marginTop: '8px', width: '100%' }}>
                            {workouts && workouts.map(workout => (
                                <WorkoutDetails workout={workout} key={workout._id} refresh={updateWorkoutsList} />
                            ))}

                            {workouts.length == 0 && <div className="text-center mt-5 text-primary"><p>No workouts added</p></div>}
                        </div>
                    </div>
                </div>
                {/* <div className="col w-100">
                    <div className="row d-flex justify-content-center w-100">
                        <div className='w-50 p-1 mt-2'>
                            <Form.Select className="text-center" aria-label="Matter priority" name="weekday" onChange={(e) => changeWeekday(e.target.value)}>
                                {weekdays_list.map((day, index) => {
                                    return (<option value={index}>
                                        {day}</option>);
                                })}
                            </Form.Select>
                        </div>
                    </div>
                    <div className="row" style={{ overflow: 'auto', height: '475px', marginTop: '8px', width: '100%' }}>
                        {workouts && workouts.map(workout => (
                            <WorkoutDetails workout={workout} key={workout._id} refresh={updateWorkoutsList} />
                        ))}

                        {workouts.length == 0 && <div className="text-center mt-5 text-primary"><p>No workouts added</p></div>}
                    </div>
                </div> */}
            </div>

            <Modal style={{ position: 'fixed' }} show={show} onHide={handleClose}>
                <AddWorkout ShowModal={closeModal} />
            </Modal>
        </div>
    )
}

export default Home;