import React from 'react';
import ScrollToTop from './utils/ScrollToTop';

import './Reset.css';
import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import About from './pages/About';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';

function App() {
  return (
    <div className='App'>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/reservation' element={<Reservation />}></Route>
          <Route path='/contact' element={<Contact />}></Route>

          {/* <Route path='*' element={<NotFound />}></Route>
          <Route path='/politique-de-confidentialite' element={<PrivacyPolicy />}></Route>
          <Route path='/mentions-legales' element={<LegalNotice />}></Route> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
