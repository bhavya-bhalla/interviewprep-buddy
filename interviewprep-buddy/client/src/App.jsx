import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DSATracker from './pages/DSATracker';
import HRNotes from './pages/HRNotes';
import CompanyTracker from './pages/CompanyTracker';
import PrivateRoute from './PrivateRoute';
import Layout from './components/Layout';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dsatracker"
          element={
            <PrivateRoute>
              <DSATracker />
            </PrivateRoute>
          }
        />
        <Route
          path="/hrnotes"
          element={
            <PrivateRoute>
              <HRNotes />
            </PrivateRoute>
          }
        />
        <Route
          path="/companytracker"
          element={
            <PrivateRoute>
              <CompanyTracker />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
