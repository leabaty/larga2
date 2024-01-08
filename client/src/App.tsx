import React from 'react';
import ScrollToTop from './utils/ScrollToTop';

import './Reset.css';
import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import About from './pages/About';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Answer from './pages/Answer';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import LegalNotice from './pages/Legal/LegalNotice';

function App() {
  return (
    <div className='App'>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/booking' element={<Booking />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/answer/:id' element={<Answer />}></Route>

          <Route path='*' element={<NotFound />}></Route>
          <Route path='/privacy-policy' element={<PrivacyPolicy />}></Route>
          <Route path='/legal-notice' element={<LegalNotice />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
