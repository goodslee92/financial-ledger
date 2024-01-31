import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/common/footer/footer';
import Daily from './components/views/daily/daily';
import Statistics from './components/views/statistics/statistics';
import Calendar from './components/views/calendar/calendar';
import SignUp from './components/views/signup/signup';
import Index from './components/views/index'
import "./styles/button.scss";
import './components/views/home/home.scss'
import './components/views/newItem/newItem.scss';
import './components/common/nav/nav.scss'
import './components/common/header/header.scss';
import './components/common/footer/footer.scss';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="/Calendar" element={<Calendar />}/>
          <Route path="/Daily" element={<Daily />}/>
          <Route path="/Statistics" element={<Statistics />}/>
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
