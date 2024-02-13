import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Monthly from './components/views/monthly/monthly';
import Statistics from './components/views/statistics/statistics';
import Calendar from './components/views/calendar/calendar';
import SignUp from './components/views/signup/signup';
import Index from './components/views/index'
import "./styles/button.scss";
import './components/views/newItem/newItem.scss';
import './components/common/nav/nav.scss'
import './components/common/header/header.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="/Calendar" element={<Calendar />}/>
          <Route path="/Monthly" element={<Monthly />}/>
          <Route path="/Statistics" element={<Statistics />}/>
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
