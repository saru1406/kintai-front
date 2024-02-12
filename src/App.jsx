import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Attendance from './Pages/Attendance';
// import AboutPage from './AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
