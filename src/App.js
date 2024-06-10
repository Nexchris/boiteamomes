import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomeScreen';
import Login from './backend/LoginScreen';
import Backs from './backend/back'
import Contact from './pages/ContactScreen'
import Test from './backend/test';
import Storage from './backend/storage';
import Back from './backend/Backoffice';
import './App.css';
import Cinebam from './pages/cinebam';
import Boiteamomes from './pages/boiteamomes';
import Quisommesnous from './pages/quisommesnous';
import Prod1 from './pages/Prod1';
import Prod2 from './pages/Prod2';
import Prod3 from './pages/Prod3';
import Prod4 from './pages/Prod4';
import Prod5 from './pages/Prod5';
import Offer2 from './pages/offer2';
import { createGlobalStyle } from 'styled-components';
import { VideoURLProvider } from './context/VideoUrlContext';

// Crée un style global pour appliquer la police à toute l'application
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0; /* Réinitialiser les marges par défaut du navigateur */
    padding: 0; /* Réinitialiser les paddings par défaut du navigateur */
  }
`;

function App() {
  return (
    <>
      <GlobalStyle /> {/* Incluez le style global ici */}
      <Router> {/* Encadrez votre application avec le composant Router */}
        <VideoURLProvider> {/* Enveloppez votre application avec VideoURLProvider */}
          <Routes> {/* Encadrez vos routes avec le composant Routes */}
            <Route exact path="/" element={<Home />} /> {/* Route par défaut vers Home */}
            <Route exact path="/backs" element={<Backs />} /> {/* Route par défaut vers Home */}
            <Route path="/storage" element={<Storage />} /> {/* Route vers Offer */}
            <Route path="/cinebam" element={<Cinebam />} /> {/* Route vers Cinebam */}
            <Route path="/boiteamomes" element={<Boiteamomes />} /> {/* Route vers Boiteamomes */}
            <Route path="/prod1" element={<Prod1 />} /> {/* Route vers Offer */}
            <Route path="/prod2" element={<Prod2 />} /> {/* Route vers Offer */}
            <Route path="/prod3" element={<Prod3 />} /> {/* Route vers Offer */}
            <Route path="/prod4" element={<Prod4 />} /> {/* Route vers Offer */}
            <Route path="/prod5" element={<Prod5 />} /> {/* Route vers Offer */}
            <Route path="/offer2" element={<Offer2/>} /> {/* Route vers Offer */}
            <Route path="/login" element={<Login />} /> {/* Route vers Login */}
            <Route path="/backoffice" element={<Back />} /> {/* Route vers Backoffice */}
            <Route path="/quisommesnous" element={<Quisommesnous />} /> {/* Route vers Quisommesnous */}
            <Route path="/test" element={<Test />} /> {/* Route vers Quisommesnous */}
            <Route path="/contact" element={<Contact />} /> {/* Route vers Quisommesnous */}
          </Routes>
        </VideoURLProvider>
      </Router>
    </>
  );
}

export default App;
