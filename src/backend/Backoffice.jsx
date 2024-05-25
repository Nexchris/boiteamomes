import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// Styled components
const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const User = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background-color: #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #aaa;
  }
`;

const Text = styled.span`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
`;

function Backoffice() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change this to false to test logout functionality

  const handleLogout = () => {
    // Your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <Container>
      {isLoggedIn ? (
        <User onClick={handleLogout}>
          <span>User</span>
          <Text>Deconnexion</Text>
        </User>
      ) : (
        <Link to="/login">Connectez-vous</Link> // You can replace this with your login route
      )}
    </Container>
  );
}

export default Backoffice;
