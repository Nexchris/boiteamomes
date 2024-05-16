import React from 'react';

import styled from 'styled-components';
import Imagetemplate from '../images/image.png';
import Imagetemplate2 from '../images/image2.png';
import { Link } from 'react-router-dom';
import Header from '../asset/header'
import Footer from '../asset/footer'

const Container = styled.div`
  background-color: #F36C97;
  width: 100vw;
  height: 100vh;
`;


const Mainscreen = styled.div`
background-color: #F36C97;
  width: 100vw;
  height: 100vh;
`;


const Secondscreen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex; 
  background-color: royalblue;
`;

const Thirdscreen = styled.div`
background-color: royalblue;
  width: 100vw;

`;

const Maintitle = styled.h1`
  font-size: 20vh;
  padding-top: 5vh;
  text-align: center;
  margin:0;
`;

const Secondtitle = styled.h2`
font-size: 25vh;
text-align: left;
margin:0;
margin-left: 10vh;
`;

const Thirdtitle = styled.h3`
  font-size: 14vh;
  padding-top: 10vh;
  font-weight: 500;
  text-align: center;
  margin:0;
`;

const Maintext = styled.div`
  font-size: 2.5vh;
  margin-left: 60vh;
  width: 40%;
  text-align: center;
`;

const Secondtext = styled.div`

  margin-left: 15vh;
  font-size: 3vh;
  width: 70%;
 
`;

const Thirdtext = styled.div`
  margin-left: 30vh;
  font-size: 3vh;
  width: 70%;
  text-align:center;
`;


const Secondcontent = styled.div`
  flex: 1; /* Pour que le contenu s'étende pour remplir l'espace disponible */
`;



const Image = styled.img`
  width: 70%; /* Vous pouvez ajuster cette valeur selon vos besoins */
  
  margin-right:20vh;
`;

const ImageContainer = styled.div`
  flex: 1; /* Pour que l'image occupe la même quantité d'espace que le texte */
  display: flex;
  justify-content: flex-end; /* Pour aligner l'image à droite */
  align-items: center; /* Pour aligner l'image verticalement */
`;

const Offercontainer = styled.div`
display: flex;
margin-top: 5vh;
margin-left: 10vh;
`

const Offerimage = styled.img`
width:35%;
`

const Offerdiv = styled.div`
text-align: center;
background-color: gray;
width:40%;
font-size:2vh;
height: 20vh;
margin-left: -30vh;
margin-top: 40vh;
border-radius:5vh;
`

const Reverseofferdiv = styled(Offerdiv)`
margin-left: -135vh;
`;

const Reverseofferimage = styled(Offerimage)`
width:35%;
margin-left: 60vw;
`


const Offerboldtext = styled.div`
font-weight: bold;
font-size:2.5vh;
`


const Offerbutton = styled.button`
font-size: 2.5vh;
`




function Boiteamomes() {
  return (
    <Container>
    <Header />
      <Mainscreen>
        <Maintitle>Boite à <br />momes</Maintitle>
        <Maintext>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda quae esse facere architecto quaerat odio molestiae quidem.</Maintext>
      </Mainscreen>


      <Secondscreen>
      <Secondcontent>
      <Secondtitle>{"< H2 >"}</Secondtitle>
        <Secondtext>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio atque iure similique illum harum dolores totam quos recusandae delectus ad maxime assumenda, eos doloremque, dicta reprehenderit placeat, sequi esse voluptatum? Lorem ipsum dolor sit amet consectetur adipisicing elit. At dignissimos quos praesentium! Magnam enim eligendi quibusdam illo veritatis sequi, consequuntur possimus deserunt aspernatur a saepe debitis dolor voluptatem praesentium laborum!</Secondtext>
        </Secondcontent>
        <ImageContainer>
          <Image src={Imagetemplate} alt="" />
        </ImageContainer>
      </Secondscreen>

      <Thirdscreen>
        <Thirdtitle>Les Offres</Thirdtitle>
        <Thirdtext>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi beatae id enim itaque odio culpa est asperiores non. Mollitia saepe sequi ex provident natus ad voluptates excepturi maxime molestiae non!</Thirdtext>



        <Offercontainer>
        <Offerimage src={Imagetemplate2} alt="" />
        <Offerdiv>
        <Offerboldtext> 1. Offre numéro 1 </Offerboldtext> 
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam distinctio ex repellendus, dicta eveniet suscipit iure voluptas placeat aspernatur architecto sapiente <br />
        <Link to="/offer">
        <Offerbutton>Cliquer</Offerbutton>
        </Link>


        </Offerdiv>
        </Offercontainer>

<br />

<Offercontainer>
        <Reverseofferimage src={Imagetemplate2} alt="" />
        <Reverseofferdiv>
        <Offerboldtext> 1. Offre numéro 2 </Offerboldtext> 
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam distinctio ex repellendus, dicta eveniet suscipit iure voluptas placeat aspernatur architecto sapiente <br />
        <Link to="/offer">
        <Offerbutton>Cliquer</Offerbutton>
        </Link>


        </Reverseofferdiv>
        </Offercontainer>

<br />

<Offercontainer>
        <Offerimage src={Imagetemplate2} alt="" />
        <Offerdiv>
        <Offerboldtext> 1. Offre numéro 3 </Offerboldtext> 
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam distinctio ex repellendus, dicta eveniet suscipit iure voluptas placeat aspernatur architecto sapiente <br />
        <Link to="/offer">
        <Offerbutton>Cliquer</Offerbutton>
        </Link>


        </Offerdiv>
        </Offercontainer>
        


    </Thirdscreen>


<Footer/>


    </Container>
  );
}

export default Boiteamomes;
