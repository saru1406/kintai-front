import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Attendance from './Pages/Attendance';
import Index from './Pages/Index';
import Show from './Pages/Show';
// import AboutPage from './AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/index" element={<Index />} />
        <Route path="/:id" element={<Show />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
