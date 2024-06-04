import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { Link } from 'react-router-dom';
import 'animate.css';
import BAM from '../images/logo.png';


const StyledHeader = styled.div`
  width: auto;
  height: 10vh;
  background-color: ${props => props.bgColor || 'black'};
  display: flex;
  align-items: center;
  @media (max-width: 1600px) {
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    justify-content: center;
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


function Header({ bgColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [Title, setTitle] = useState('');
  const [Menu1, setMenu1] = useState('');
  const [Menu2, setMenu2] = useState('');
  const [Menu3, setMenu3] = useState('');
  const [Prod1, setProd1] = useState('');
  const [Prod2, setProd2] = useState('');
  const [Prod3, setProd3] = useState('');
  const [Prod4, setProd4] = useState('');
  const [Prod5, setProd5] = useState('');

  const [ContactButton, setContactButton] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, "storage", "header");
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const documentData = docSnap.data();
          console.log("Document data:", documentData);

          setTitle(documentData.title);
          setMenu1(documentData.menu1);


          setMenu2(documentData.menu2);
          setProd1(documentData.prod1);
          setProd2(documentData.prod2);
          setProd3(documentData.prod3);
          setProd4(documentData.prod4);
          setProd5(documentData.prod5);



          setMenu3(documentData.menu3);
          
          setContactButton(documentData.contactbutton);
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
    <StyledHeader bgColor={bgColor}>
      <Hamburger onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </Hamburger>
      <Href href="/">
      <Logo src={BAM} alt="Logo" />
</Href>
<Href href="/">
<Headertitle>{Title}</Headertitle>
</Href>
  
      <HeaderList isOpen={isOpen}>

        

    
        <HeaderItem>
        <Href href="/boiteamomes">
       {Menu1}
</Href>
          <SubMenu>
            <SubMenuItem>Atélier Enfants</SubMenuItem>
            <SubMenuItem>Atélier Adultes</SubMenuItem>
            <SubMenuItem>Atélier Cinébam</SubMenuItem>
          </SubMenu>
        </HeaderItem>
        <HeaderItem>
        <Href href="/cinebam">
{Menu2}
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
      {Menu3}
          </Href>
          <SubMenu>
            <SubMenuItem>Fondatrice</SubMenuItem>
            <SubMenuItem>Nos Valeurs</SubMenuItem>
          </SubMenu>
        </HeaderItem>
        <Href href="/Contact">
        <HeaderContact>Nous Contacter</HeaderContact>
        </Href>
      </HeaderList>
    </StyledHeader>
  );
}

export default Header;
