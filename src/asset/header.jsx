import React from 'react';
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
`;

const Logo = styled.img`
  height: 100%;
`;

const HeaderList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const HeaderItem = styled.li`
  position: relative; /* Ensure the submenu is positioned relative to its parent */
  margin-left: 20px;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
    color: gray;
  }
`;

const Headertitle = styled.h1`
  margin: 0;
  margin-left: 0.5vw;
  margin-right: 45vw;
  font-size: 1.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; /* Inherits the color of the parent element */
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
  transition: background-color 0.3s ease; /* Ajout de la transition */
  &:hover {
    cursor: pointer;
    background-color: #F9004F;
    font-weight:bold;
  }
`;

const SubMenu = styled.ul`
  display: none;
  position: absolute; /* Position the submenu absolutely relative to the parent */
  top: 100%; /* Position it directly below the parent */
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
    color:black;
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

function Header() {
  return (
    <StyledHeader>
      <Logo src={BAM} alt="Logo" />
      <HeaderList>
        <Headertitle>Boite à momes</Headertitle>
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
        <HeaderItem>Productions
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
