import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomeScreen';
import Login from './backend/LoginScreen';
import Back from './backend/Backoffice';
import Cinebam from './pages/cinebam';
import Boiteamomes from './pages/boiteamomes';
import Quisommesnous from './pages/quisommesnous'
import Offer from './pages/offer'
import { createGlobalStyle } from 'styled-components';


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
        <Routes> {/* Encadrez vos routes avec le composant Routes */}
          <Route exact path="/" element={<Home />} /> {/* Route par défaut vers Home */}
          <Route path="/cinebam" element={<Cinebam />} /> {/* Route vers Cinebam */}
          <Route path="/boiteamomes" element={<Boiteamomes />} /> {/* Route vers Cinebam */}
          <Route path="/offer" element={<Offer />} /> {/* Route vers Cinebam */}
          <Route exact path="/login" element={<Login />} /> {/* Route par défaut vers Home */}
          <Route exact path="/backoffice" element={<Back />} /> {/* Route par défaut vers Home */}
          <Route exact path="/quisommesnous" element={<Quisommesnous />} /> {/* Route par défaut vers Home */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
