import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; 
import Auth from './pages/Auth'; 
import Dashboard from './pages/Dashboard';
import CreateEntry from './pages/CreateEntry';
import UpdateEntry from './pages/UpdateEntry';
import ViewEntries from './pages/ViewEntries';
import Profile from './pages/UserProfile'; 
import Admin from './pages/Admin';
import Layout from './components/Layout';
import ViewEntry from './pages/ViewEntry';

function App() {
  const { user, loading } = useAuth();

  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        
        <Route
          path="/auth/login"
          element={user ? <Navigate to="/dashboard" /> : <Auth />}
        />

         
        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to="/auth/login" />}
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="entries/new" element={<CreateEntry />} />
          <Route path="entries/:id" element={<ViewEntry />} />
          <Route path="entries" element={<ViewEntries />} />
          <Route path="entries/:id/edit" element={<UpdateEntry />} />
          <Route path="profile" element={<Profile />} />
        
          <Route
            path="admin"
            element={user?.isAdmin ? <Admin /> : <Navigate to="/dashboard" />}
          />
        </Route>
        

       
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;