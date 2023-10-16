import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';
import { useAuthContext } from './hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

function App() {

  const { user } = useAuthContext()


  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            {/* <Route
              path="/admin"
              element={user[''] == "Admin" ? <AdminDashboard /> : <Navigate to="/" />}
            /> */}
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={!user ? <LandingPage /> : <Navigate to="/home" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
