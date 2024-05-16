import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BAM from '../images/logo.png';

const StyledHeader = styled.div`
  width: 100vw;
  height: 7vh;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  @media (min-width: 600px)
 {
    height: 20vh;
  }
  

`;

const Logo = styled.img`
  height: 100%;
  width: fit-content;
  @media (max-width: 500px) {
    margin-right: 1vh;
  }

`;

const HeaderList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 500px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 7vh; /* Adjust top based on header height */
    right: 0;
    background-color: white;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 600px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 20vh; /* Adjust top based on header height */
    right: 0;
    background-color: white;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   
  }
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
  }

  
`;


const Headertitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  margin-right:45vw;

  @media (max-width: 500px) {
    font-size: 3.5vh;
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
  width: 40vw;
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

  @media (min-width: 600px) {
    width: 25vw;
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
    margin-right: 3vh;
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
      <Logo src={BAM} alt="Logo" />
      <Headertitle>Boite à momes</Headertitle>
      <HeaderList isOpen={isOpen}>
        <StyledLink to="/">
          <HeaderItem>Accueil</HeaderItem>
        </StyledLink>
        <HeaderItem>
          Atélier
          <SubMenu>
            <SubMenuItem>Théâtre Enfants</SubMenuItem>
            <SubMenuItem>Théâtre Adultes</SubMenuItem>
          </SubMenu>
        </HeaderItem>
        <HeaderItem>
          Créations
          <SubMenu>
            <SubMenuItem>Atelier Enfants</SubMenuItem>
            <SubMenuItem>Atelier Adultes</SubMenuItem>
            <SubMenuItem>Atelier CinéBAM</SubMenuItem>
          </SubMenu>
        </HeaderItem>
        <HeaderItem>
          Productions
          <SubMenu>
            <SubMenuItem>Pièces de théâtres</SubMenuItem>
            <SubMenuItem>Production Cinéma</SubMenuItem>
          </SubMenu>
        </HeaderItem>
        <HeaderContact>Nous Contacter</HeaderContact>
      </HeaderList>
    </StyledHeader>
  );
}

export default Header;
