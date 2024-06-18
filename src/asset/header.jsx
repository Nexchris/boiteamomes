import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { Link } from 'react-router-dom';
import 'animate.css';
import BAM from '../images/logo.png';

// Le container qui sert de Header
const StyledHeader = styled.div` 
  width: auto;
  height: 10vh;
  background-color: black;
  display: flex;
  align-items: center;
  @media (max-width: 1600px) {
    background-color: #0c0c0c;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    justify-content: center;
  }
`;

// Le logo
const Logo = styled.img`
  height: 10vh;
  width: fit-content;
  margin-left: 3vh;
  @media (max-width: 500px) {
    margin-left: 2vh;
    margin-right: auto;
    display: block;
  }
`;

// La listes d'éléments se trouvant dans le header, dans un format mobile, il disparait laissant place à un hamburger cachant les elements à l'interieur
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
    top: 10vh;
    right: 0;
    background-color: black;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  @media (min-width: 600px) and (max-width: 1600px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 10vh;
    right: 0;
    background-color: black;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;


// Les elements qui se trouve dans le HeaderList
const HeaderItem = styled.li`
  position: relative;
  margin-left: 20px;
  font-size: 1.5rem;
  color: white;
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

// Un composant avec titre du site pouvant servir revenir sur la page d'accueil
const Headertitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  margin-right: 38vw;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  @media (max-width: 1600px) {
    display: none;
    font-size: 3vh;
    margin-right: 0vw;
  }
  @media (min-width: 1600px) {
    margin-right: 30vw;
  }
  @media (min-width: 1700px) {
    margin-right: 35vw;
  }
`;

// Un composant pour changer de routes/pages
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

// Un composant servant de bouton pour se diriger vers la page Contact
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
    opacity: 0.5;
  }
  @media (min-width: 600px) and (max-width: 1600px) {
    width: 25vw;
    margin-left: 1vh;
    margin-bottom: 2vh;
  }
  @media (max-width: 768px) {
    margin: 0;
    width: 45vw;
    margin-left: 1vh;
    margin-bottom: 2vh;
  }
`;

const SubMenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: black;
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
    opacity: 0.5;
  }
  color: white;
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
  color: white;
`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [Prod1, setProd1] = useState('');
  const [Prod2, setProd2] = useState('');
  const [Prod3, setProd3] = useState('');
  const [Prod4, setProd4] = useState('');
  const [Prod5, setProd5] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, "storage", "header");
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const documentData = docSnap.data();
          setProd1(documentData.prod1);
          setProd2(documentData.prod2);
          setProd3(documentData.prod3);
          setProd4(documentData.prod4);
          setProd5(documentData.prod5);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchData();
  }, []);

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
        <Headertitle>La Boite à Mômes</Headertitle>
      </Href>
      <HeaderList isOpen={isOpen}>
        <HeaderItem>
          <Href href="/boiteamomes">
            La Boite à Mômes
          </Href>
          <SubMenu>
            <Href href="./AtelierEnfant">
              <SubMenuItem>Atélier Enfants</SubMenuItem>
            </Href>
            <Href href="./AtelierAdultes">
              <SubMenuItem>Atélier Adultes</SubMenuItem>
            </Href>
            <Href href="./AtelierCinebam">
              <SubMenuItem>Atélier Cinébam</SubMenuItem>
            </Href>
          </SubMenu>
        </HeaderItem>
        <HeaderItem>
          <Href href="/cinebam">
            CinéBAM
          </Href>
          <SubMenu>
            <Href href="./Prod1">
              <SubMenuItem>{Prod1}</SubMenuItem>
            </Href>
            <Href href="./Prod2">
              <SubMenuItem>{Prod2}</SubMenuItem>
            </Href>
            <Href href="./Prod3">
              <SubMenuItem>{Prod3}</SubMenuItem>
            </Href>
            <Href href="./Prod4">
              <SubMenuItem>{Prod4}</SubMenuItem>
            </Href>
            <Href href="./Prod5">
              <SubMenuItem>{Prod5}</SubMenuItem>
            </Href>
          </SubMenu>
        </HeaderItem>
        <HeaderItem>
          <Href href="/quisommesnous">
            Qui sommes nous ?
          </Href>
        </HeaderItem>
        <Href href="/Contact">
          <HeaderContact>Nous Contacter</HeaderContact>
        </Href>
      </HeaderList>
    </StyledHeader>
  );
}

export default Header;
