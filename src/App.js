import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/common/footer/footer';
import Home from './components/views/home/home';
import Daily from './components/views/daily/daily';
import Statistics from './components/views/statistics/statistics';
import Calendar from './components/views/calendar/calendar';
import Main from "./components/views/main/main";
import SignUp from "./components/views/sign/signup";
import SignIn from "./components/views/sign/signin";
import "./styles/button.scss";
import './components/views/calendar/calendar.scss';
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
          <Route path="/" element={<Main />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/calendar" element={<Calendar />}/>
          <Route path="/daily" element={<Daily />}/>
          <Route path="/statistics" element={<Statistics />}/>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
