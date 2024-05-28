import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { firestore } from '../firebaseConfig'; // Assurez-vous que le chemin est correct
import { Link } from 'react-router-dom';
import 'animate.css';
import BAM from '../images/logo.png';
const StyledHeader = styled.div`
  width: 99vw;
  height: 10vh;
  background-color: black;
  display: flex;
  align-items: center;
 

  @media (max-width: 1600px)
 {
  
    width:100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    justify-content: center; /* Correction ici */
  }
  

`;



const Logo = styled.img`
  height: 10vh;
  width: fit-content;
  margin-left: 3vh;
  

  @media (max-width: 500px) {
    margin-left: 2vh;
    margin-right: auto;
    display: block; /* Assurez-vous que l'image est affichée comme un bloc pour appliquer les marges automatiques */
  }
`;



const HeaderList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1000; 
  background-color: black;
  

  @media (max-width: 600px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    animation: fadeInDown 0.5s;
    height: max-content;
    flex-direction: column;
    position: absolute;
    top: 10vh; /* Adjust top based on header height */
    right: 0;
    background-color: black;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 600px) and (max-width: 1600px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 10vh; /* Adjust top based on header height */
    right: 0;
    background-color: black;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   
  }
`;

const HeaderItem = styled.li`
  position: relative;
  margin-left: 20px;
  font-size: 1.5rem;
  color:white;
  
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
  color:white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 1300px) {
    display:none;
    font-size: 3vh;
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
  background-color: white;
  width: 10vw;
  text-align: center;
  border-radius: 1vw;
  color: black;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    cursor: pointer;
opacity:0.5;
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

  }

  
`;

const SubMenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color:black;
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
    cursor: pointer;
    opacity:0.5;
  }

  color:white;
`;

const Hamburger = styled.div`
  display: none;
  position: absolute;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 1600px) {
    display: flex;
    margin-left: 3vh;
    left: 2%;
    position: absolute;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 4px 0;
    transition: 0.4s;
  }
`;

const Href = styled.a`
  text-decoration: none;
  color:white;
`;


function Header() {
  const [isOpen, setIsOpen] = useState(false);


  const [headerTitle, setHeaderTitle] = useState(''); // Titre par défaut

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };




  return (
    <StyledHeader>
      <Hamburger onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </Hamburger>
      <Href href="/">
      <Logo src={BAM} alt="Logo" />
</Href>
<Href href="/">
<Headertitle>Bôite à mômes</Headertitle>
</Href>
  
      <HeaderList isOpen={isOpen}>

        

    
        <HeaderItem>
        <Href href="/boiteamomes">
        Boite à momes
</Href>
          <SubMenu>
            <SubMenuItem>Atélier Enfants</SubMenuItem>
            <SubMenuItem>Atélier Adultes</SubMenuItem>
            <SubMenuItem>Atélier Cinébam</SubMenuItem>
          </SubMenu>
        </HeaderItem>
        <HeaderItem>
        <Href href="/cinebam">
  Cinébam
</Href>

          <SubMenu>
            <SubMenuItem>La Rixe</SubMenuItem>
            <SubMenuItem>Fausses Rumeurs</SubMenuItem>
            <SubMenuItem>Happy Birthday</SubMenuItem>
          </SubMenu>
        </HeaderItem>
        <HeaderItem>
        <Href href="/quisommesnous">
          Qui sommes nous ?
          </Href>
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
