import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/nav/nav';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/views/home/home';
import Daily from './components/views/daily/daily';
import Statistics from './components/views/statistics/statistics';
// import { useMediaQuery } from "react-responsive";
import Calendar from './components/views/calendar/calendar';
import "./styles/button.scss";
import "./styles/style.scss";

function App() {
  // const isPc = useMediaQuery({
  //   query: "(min-width:1024px)"
  // })
  // const isTablet = useMediaQuery({
  //   query: "(min-width:768px) and (max-width:1024px)"
  // })
  // const isMobile = useMediaQuery({
  //   query: "(min-width:767px)"
  // })
  // const getDeviceType = () => {
  //   let dev = "Device is ";

  //   if(isPc) {
  //     dev += "PC";
  //   } else if(isTablet) {
  //     dev += "Tablet";
  //   } else if(isMobile) {
  //     dev += "Mobile";
  //   } else {
  //     dev += "unknown";
  //   }
  //   return <p>{dev}</p>;
  // }
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/test" element={<Calendar />}/>
          <Route path="/calendar" element={<Calendar />}/>
          <Route path="/daily" element={<Daily />}/>
          <Route path="/statistics" element={<Statistics />}/>
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
