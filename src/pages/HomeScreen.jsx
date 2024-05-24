import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BAMBG from '../images/bambg.jpg';
import Cinebam from '../images/cinebambackground2.jpg';

const Container = styled.div`
  display: flex;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Rightscreen = styled.div`
  width: 50vw;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BAMBG});
  background-size: cover;
  /* Autres styles */

  @media (max-width: 768px) {
    height: 50vh;
    width: 100vw;
  }
`;


const Leftscreen = styled.div`
  width: 50vw;
  height: 100vh;
  background-image: url(${Cinebam});
  background-size: cover;
 
  

  @media (max-width: 768px) {
    height: 50vh;
    width: 100vw;
  }
`;

const Title = styled.h1`
  font-size: 12vh;
  margin-top: 35%;

  
`;

const LeftTitle = styled(Title)`
  margin-left: 25vh;
  margin-bottom: 1vh;

  @media (max-width: 768px) {
    margin: 0;
    font-size: 8vh;
    text-align: center;
    padding-top: 10vh;
    padding-bottom: 15vh;
  }
`;



const RightTitle = styled(Title)`
  margin-left: 12vh;
  font-size: 11vh;
  margin-bottom: 1vh;

  @media (max-width: 768px) {
    margin: 0;
    font-size: 5vh;
    text-align: center;
    padding-top: 10vh;
    padding-bottom: 20vh;
  }
`;

const Text = styled.p`
  font-size: 2vh;
  margin-left: 10%;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0;
    padding-bottom: 3vh;
    display:none;
  }
`;

const Button = styled.button`
  font-size: 5vh;
  color: black;
  background-color: white;
  margin-left: 40vh;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-left: 14vh;
  
  }
`;

function HomeScreen() {
  return (
    <Container>
      <Leftscreen>
        <LeftTitle>CINEBAM</LeftTitle>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, aperiam nesciunt sequi
          harum error assumenda hic nihil at,{' '}
        </Text>
        <Link to="/cinebam">
          <Button>Voir Plus</Button>
        </Link>
      </Leftscreen>

      <Rightscreen>
        <RightTitle>Boite à momes</RightTitle>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, aperiam nesciunt sequi
          harum error assumenda hic nihil at,{' '}
        </Text>
        <Link to="/boiteamomes">
          <Button>Voir Plus</Button>
        </Link>
      </Rightscreen>
    </Container>
  );
}

export default HomeScreen;
