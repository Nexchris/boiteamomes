// ProtectedRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = getAuth();

  // Vérifie l'état de connexion de l'utilisateur
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
      return <Navigate to="/login" />;
    }
  });

  // Si l'utilisateur est connecté, affiche le composant demandé
  return <Route {...rest} element={<Component />} />;
};

export default ProtectedRoute;