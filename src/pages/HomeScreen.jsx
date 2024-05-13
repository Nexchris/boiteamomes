import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


// Container - L'ensemble de la page
const Container = styled.div` 
  display: flex;
  font-size:Poppins;

`;

// Leftscreen - La page de gauche
const Leftscreen = styled.div`
  width: 50%;
  height: 100vh;
  background-color: aquamarine;
`;

// Rightscreen - La page de droite
const Rightscreen = styled.div`
  width: 50%;
  height: 100vh;
  background-color: royalblue;
`;

// Title - Les titres
const Title = styled.h1`
font-size: 12vh;
margin-top: 35%;
`

// Title - Titre de droite
const LeftTitle = styled(Title)`
margin-left:25vh;  
margin-bottom:1vh;
`;

// Title - Titre de gauche
const RightTitle = styled(Title)`
margin-left:12vh;
font-size:11vh;  
margin-bottom:1vh;
`;




const Text = styled.p`
font-size: 2vh;
margin-left: 10%;
text-align:center;

`
const Button = styled.button`
  font-size: 5vh;
  color: black;
  background-color: white;
  margin-left: 40vh;
  border: none; /* Retire le bord existant */
  border-radius: 10px; /* Ajoute un border radius de 10px */
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1); /* Ajoute une ombre transparente pour simuler le border transparent */
`;



function HomeScreen() {
  return (
    <Container>
      <Leftscreen>
        <LeftTitle>CINEBAM</LeftTitle>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, aperiam nesciunt sequi harum error assumenda hic nihil at, </Text>
        <Link to="/cinebam">
  <Button>Voir Plus</Button>
</Link>

      </Leftscreen>

    
      <Rightscreen>
      <RightTitle>Boite à momes</RightTitle>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, aperiam nesciunt sequi harum error assumenda hic nihil at, </Text>
        <Link to="/boiteamomes">
        <Button>Voir Plus</Button>
        </Link>

      </Rightscreen >
    </Container>
  );
}

export default HomeScreen;
