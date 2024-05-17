import React, { useState } from 'react';
import styled from 'styled-components';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FirebaseConfig from "../firebaseConfig";
import { Link, useNavigate } from 'react-router-dom'; // Import de useNavigate

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')}; // Désactive le curseur lorsque isLoading est true
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isLoading }) => (isLoading ? '#007bff' : '#0056b3')}; // Change la couleur du bouton au survol uniquement si isLoading est false
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: auto;
`;

const Login = ({ history }) => { // Passer l'objet history comme prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Ajout de l'état isLoading
  const navigate = useNavigate(); // Utilisation de useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Démarre le chargement

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('Signed in as:', user.email);
        navigate('/'); // Navigation vers "/"
      })
      .catch((error) => {
        console.error('Erreur:', error.message);
        setError('Erreur');
      })
      .finally(() => {
        setIsLoading(false); // Arrête le chargement
      });
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Label htmlFor="email">Email</Label>
        <Input 
          type="email" 
          id="email" 
          name="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />

        <Label htmlFor="password">Password</Label>
        <Input 
          type="password" 
          id="password" 
          name="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />

        <Button type="submit" isLoading={isLoading}>
          {isLoading ? <Spinner /> : 'Login'} {/* Affiche le spinner si isLoading est true, sinon affiche 'Login' */}
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
