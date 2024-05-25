import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BAMBG from '../images/bambg.jpg';
import Leftvideo from "../video/soustension.mp4";
import RightVideo from "../video/boiteamomes.mp4";
import Header from '../asset/header';

const Container = styled.div`
  display: flex;
  font-family: 'Poppins', sans-serif;
  background-color: #f5f5f5;
  color: #333;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Rightscreen = styled.div`
  width: ${(props) => props.expanded ? '85vw' : '50vw'};
  height: 100vh;
  position: relative;
  overflow: hidden;
  transition: width 0.5s ease;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, ${(props) => props.isHovered ? '0' : '0.8'});
    z-index: 1;
    transition: background-color 0.5s ease;
    pointer-events: none; /* Désactiver la réception des événements de pointer */
  }

  @media (max-width: 768px) {
    height: 50vh;
    width: ${(props) => props.expanded ? '100vw' : '100vw'};
  }
`;

const Leftscreen = styled.div`
  width: ${(props) => props.expanded ? '85vw' : '50vw'};
  height: 100vh;
  position: relative;
  overflow: hidden;
  transition: width 0.5s ease;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, ${(props) => props.isHovered ? '0' : '0.8'});
    z-index: 1;
    transition: background-color 0.5s ease;
    pointer-events: none; /* Désactiver la réception des événements de pointer */
  }

  @media (max-width: 768px) {
    height: 50vh;
    width: ${(props) => props.expanded ? '100vw' : '100vw'};
  }
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextContainer = styled.div`
  position: absolute;
  width:30vw;
  height:40vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white background */
  z-index: 2; /* Ensure it sits on top of the video */
  padding: 20px; /* Add some padding for better visual separation */
  border-radius: 10px; /* Round the corners for a softer look */
`;

const Title = styled.h1`
  margin:0;
  font-size: 8vh;
  color: white; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold; 
`;

const Title2 = styled.h1`
  margin:0;
  font-size: 7vh;
  color: white; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold; 
`;

const Text = styled.p`
  margin:0;
  margin-bottom:2vh;
  font-size: 2.5vh;
  color: #333; /* Dark text color */
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5); /* Lighter text shadow */
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 2.5vh;
  }
`;

const Button = styled.button`
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  transition-duration: 0.4s;

  &:hover {
    background-color: #111;
  }
`;

function HomeScreen() {
  const videoRef = useRef(null);
  const rightVideoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [isRightExpanded, setIsRightExpanded] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
    setExpanded(true);
    const video = videoRef.current;
    video.play();
  };

  const handleMouseOut = () => {
    setIsHovered(false);
    setExpanded(false);
    const video = videoRef.current;
    video.pause();
  };

  const handleRightMouseOver = () => {
    setIsRightHovered(true);
    setIsRightExpanded(true);
    const video = rightVideoRef.current;
    video.play();
  };

  const handleRightMouseOut = () => {
    setIsRightHovered(false);
    setIsRightExpanded(false);
    const video = rightVideoRef.current;
    video.pause();
  };

  return (
    <>
      <Header />
      <Container>
        <Leftscreen expanded={expanded} isHovered={isHovered} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <Video ref={videoRef} src={Leftvideo} autoPlay={false} muted loop />
          <TextContainer>
            <Title>Cinebam</Title>
            <Text>Suivez vos cours en ligne sur la plateforme Cinebam, vous pourrez apprendre à la manière des pros tout en travaillant sur vos projets. Nos formations sont accessibles et adaptées à tous les niveaux de compétences.</Text>
            <Link to="/cinebam" onClick={(e) => e.stopPropagation()}>
              <Button>Voir Plus</Button>
            </Link>
          </TextContainer>
        </Leftscreen>
        <Rightscreen expanded={isRightExpanded} isHovered={isRightHovered} onMouseOver={handleRightMouseOver} onMouseOut={handleRightMouseOut}>
          <Video ref={rightVideoRef} src={RightVideo} autoPlay={false} muted loop />
          <TextContainer>
            <Title2>Boite à momes</Title2>
            <Text>Entrez dans le monde magique du théâtre avec La Boîte à Mômes ! Que vous soyez débutant, amateur ou professionnel, nos ateliers de théâtre vous offrent l'opportunité unique de développer vos talents d'acteurs.</Text>
            <Link to="/boiteamomes">
              <Button>Voir Plus</Button>
            </Link>
          </TextContainer>
        </Rightscreen>
      </Container>
    </>
  );
}

export default HomeScreen;
