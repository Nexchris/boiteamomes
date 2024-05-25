import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebaseConfig'; // Assurez-vous que le chemin est correct
import { Link } from 'react-router-dom';
import 'animate.css';
import BAM from '../images/logo.png';

const StyledHeader = styled.div`
  width: 99vw;
  height: 10vh;
  background-color: white;
  display: flex;
  align-items: center;

  @media (min-width: 600px) and (max-width: 1600px)
 {
    height: 20vh;
  }
`;

const Logo = styled.img`
  height: 100%;
  width: 20vw;
  @media (max-width: 500px) {
    margin-right: 1vh;
  }
`;

const HeaderList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1000; 
`;

const HeaderItem = styled.li`
  position: relative;
  margin-left: 20px;
  font-size: 1.5rem;
  
  &:hover {
    cursor: pointer;
    color: gray;
  }

  @media (max-width: 500px) {
    margin: 10px 0;
    font-size: 1.2rem;
    margin-left: 1vh;
  }
`;

const Headertitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  margin-right:40vw;

  @media (max-width: 500px) {
    font-size: 3vh;
    margin-right:0vw;
  }

  @media (min-width: 600px) and (max-width: 1000px) {
    font-size: 4vh;
    margin-right:0vw;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const HeaderContact = styled.li`
  margin-left: 20px;
  padding-top: 0.3vw;
  background-color: #F36C97;
  width: 10vw;
  text-align: center;
  border-radius: 1vw;
  color: white;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #F9004F;
    font-weight: bold;
  }

  @media (min-width: 600px) and (max-width: 1600px) {
    width: 25vw;
    margin-left:1vh;
    margin-bottom: 2vh;
  }

  @media (max-width: 768px) {
    margin: 0;
    width: 45vw; 
    margin-left:1vh;
    margin-bottom: 2vh;
  }
`;

const SubMenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  padding: 10px 0;
  width: 10vw;
  z-index: 1000;

  ${HeaderItem}:hover & {
    display: block;
    animation: slideInDown 0.2s;
    color: black;
  }

  @media (min-width: 100px) and (max-width: 1600px) {
    ${HeaderItem}:hover & {
      display: contents;
      color: black;
    }
  }
`;

const SubMenuItem = styled.li`
  padding: 10px 20px;
  margin-left: 1vh;
  font-size: 1rem;

  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 1000px) {
    display: flex;
    margin-right: 5vh;
    margin-left: 5vh;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: black;
    margin: 4px 0;
    transition: 0.4s;
  }
`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false); // État pour indiquer si les données sont chargées depuis Firebase

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les données depuis Firebase
        // Par exemple :
        const data = await firestore.collection('votreCollection').get();
        // Une fois les données chargées, définir dataLoaded à true
        setDataLoaded(true);
      } catch (error) {
        console.error("Erreur lors du chargement des données depuis Firebase : ", error);
      }
    };

    fetchData();
  }, []); // Assurez-vous de spécifier une dépendance vide pour que cela ne se déclenche qu'une seule fois

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!dataLoaded) {
    // Si les données ne sont pas encore chargées, afficher un message de chargement
    return <div>Chargement en cours...</div>;
  }

  return (
    <StyledHeader>
      <Hamburger onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </Hamburger>
      <StyledLink to="/">
        <Logo src={BAM} alt="Logo" />
      </StyledLink>
      <Headertitle>Bôite à mômes</Headertitle>
      <HeaderList isOpen={isOpen}>
        <HeaderItem>
          Boite à momes
          <SubMenu>
            <SubMenuItem>Atélier Enfants</SubMenuItem>
            <SubMenuItem>Atélier Adultes</SubMenuItem>
            <SubMenuItem>Atélier Cinébam</SubMenuItem>
          </SubMenu>
        </HeaderItem>
        <HeaderItem>
          <StyledLink to="cinebam">
            Cinébam
          </StyledLink>
          <SubMenu>
            <SubMenuItem>La Rixe</SubMenuItem>
            <SubMenuItem>Fausses Rumeurs</SubMenuItem>
            <SubMenuItem>Happy Birthday</SubMenuItem>
          </SubMenu>
        </HeaderItem>
        <HeaderItem>
          Qui sommes nous ?
          <SubMenu>
            <SubMenuItem>Fondatrice</SubMenuItem>
            <SubMenuItem>Nos Valeurs</SubMenuItem>
          </SubMenu>
        </HeaderItem>
        <HeaderContact>Nous Contacter</HeaderContact>
      </HeaderList>
    </StyledHeader>
  );
}

export default Header;