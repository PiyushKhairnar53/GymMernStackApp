import '../index.css'
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutDetails = ({ workout, refresh }) => {

    // const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const handleDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        if (response.ok) {
            refresh(true);
        }
    }

    return (
        <div>
            {/* <div className="workout-details mx-5">
                <div className='col'>
                    <h4>{workout.title}</h4>
                    <p><strong>Load (kg): </strong>{workout.load}</p>
                    <p><strong>Number of reps: </strong>{workout.reps}</p>
                    <p>{workout.createdAt}</p>
                </div>
                <div className='col'>
                    <button className="btn btn-primary"> Add Workout</button>
                </div>
            </div> */}

            <div class="card mx-5" style={{marginBottom:'13px'}}>
                <h4 class="card-header text-primary">{workout.title}</h4>
                <div class="card-body d-flex justify-content-between p-3">
                    <div>
                        <p class="card-text"><strong>Number of sets : </strong>{workout.load}</p>
                        <p class="card-text"><strong>Number of reps: </strong>{workout.reps}</p>
                    </div>
                    <div>
                        <div>
                            <a href="#" class="btn btn-danger w-100 " onClick={handleDelete}>Delete</a>
                        </div>
                        <div className='pt-2'>
                            <a href="#" class="btn btn-warning w-100 ">Edit</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkoutDetails;