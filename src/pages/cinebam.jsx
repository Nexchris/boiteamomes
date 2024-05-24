import React, { useEffect, useState } from 'react';
import { storage } from '../firebaseConfig'; 
import { ref, getDownloadURL } from "firebase/storage";
import styled from 'styled-components';
import { doc } from "firebase/firestore";
import Imagetemplate from '../images/image.png';
import Imagetemplate2 from '../images/image2.png';
import { Link } from 'react-router-dom';
import Header from '../asset/header';
import Footer from '../asset/footer';

const Container = styled.div`
  background-color: #F36C97;
  width: 100vw;
  height: 100vh;
`;

const Mainscreen = styled.div`
  background-color: #F36C97;
  width: 100vw;
  height: 100vh;
  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const Secondscreen = styled.div`
  background-color: royalblue;
  width: 100vw;
`;

const Maintitle = styled.h1`
  font-size: 20vh;
  padding-top: 25vh;
  text-align: center;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 7vh;
    padding-top: 20vh;
  }
`;

const Secondtitle = styled.h2`
  font-size: 14vh;
  padding-top: 10vh;
  font-weight: 500;
  text-align: center;
  margin: 0;
  @media (max-width: 768px) {
    margin: 0;
    font-size: 6vh;
    font-weight:700;
  }
`;

const Maintext = styled.div`
  font-size: 2.5vh;
  margin-left: 60vh;
  width: 40%;
  text-align: center;
`;

const Secondtext = styled.div`
  margin-left: 30vh;
  font-size: 3vh;
  width: 70%;
  text-align: center;
  @media (max-width: 768px) {
    margin-left:15%;
  }
`;

const Secondcontent = styled.div`
  flex: 1; /* Pour que le contenu s'étende pour remplir l'espace disponible */
`;

const Image = styled.img`
  width: 70%; /* Vous pouvez ajuster cette valeur selon vos besoins */
  margin-right: 20vh;
`;

const ImageContainer = styled.div`
  flex: 1; /* Pour que l'image occupe la même quantité d'espace que le texte */
  display: flex;
  justify-content: flex-end; /* Pour aligner l'image à droite */
  align-items: center; /* Pour aligner l'image verticalement */
`;

const Prodcontainer = styled.div`
  display: flex;
  margin-top: 5vh;
  margin-left: 10vh;
  @media (max-width: 768px) {
   margin:0;
   margin-bottom: 10vh;
  }
  
`;




const Prodimage = styled.img`
  border-radius: 15%;
  width:40vw;
  height:60vh;
  @media (max-width: 768px) {
    border-radius: 15%; 
    width: 90vw;
    margin-left: 3vh;
    height: 35vh;
   }
  
`;

const ReverseProdimage = styled(Prodimage)`
width:40vw;
  margin-left: 50vw;
  @media (max-width: 768px) {
    border-radius: 15%; 
    width: 90vw;
    margin-left: 3vh;
    height: 35vh;
   }
  
`;

const Prodcontainer1 = styled(Prodcontainer)``;

const Offerdiv = styled.div`
  text-align: center;
  background-color: #0b0b0b;
  color:white;
  width: 40%;
  font-size: 2vh;
  height: 25vh;
  margin-left: -20vh;
  margin-top: 35vh;
  border-radius: 5vh;

  @media (max-width: 768px) {
    width: 85vw;
    margin-left: -40vh;

   }
  
`;

const Reverseofferdiv = styled(Offerdiv)`
@media (max-width: 768px) {
  margin-left: -40vh;


 }

`;

const Offerboldtext = styled.div`
font-size: 3.5vh;
padding-bottom:1vh;
font-weight: 600;
`;

const Offertext = styled.div`
font-size: 2.5vh;
width: 30vw;
text-align:start;
margin-left:3vh;
@media (max-width: 768px) {
  width: 62vw;
  font-size: 1.8vh;


 }
`;

const Offerbutton = styled.button`
  font-size: 2.5vh;
  padding: 10px 3vw;
  font-weight:bold;
  margin-left:24vw;
  background-color: white;
  color: black;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    margin-top: -1vh;
  
   }

  
  &:hover {
    background-color: #45a049;
  }
`;


function Cinebam() {
  const [firstProd, setFirstProd] = useState('');
  const [secondProd, setSecondProd] = useState('');
  const [thirdProd, setThirdProd] = useState('');
  const [fourthProd, setFourthProd] = useState('');
  const [fifthProd, setFifthProd] = useState('');

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const firstRef = ref(storage, 'productionimage/larixe.png');
        const firstUrl = await getDownloadURL(firstRef);
        setFirstProd(firstUrl);

        const secondRef = ref(storage, 'productionimage/fausserumeur.jpg');
        const secondUrl = await getDownloadURL(secondRef);
        setSecondProd(secondUrl);

        const thirdRef = ref(storage, 'productionimage/soustension.jpg');
        const thirdUrl = await getDownloadURL(thirdRef);
        setThirdProd(thirdUrl);

        const fourthRef = ref(storage, 'productionimage/happybirthday.png');
        const fourthUrl = await getDownloadURL(fourthRef);
        setFourthProd(fourthUrl);

        const fifthRef = ref(storage, 'productionimage/unjourcommeunautreresize.jpg');
        const fifthUrl = await getDownloadURL(fifthRef);
        setFifthProd(fifthUrl);

      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    fetchIcons();
  }, []);

  return (
    <Container>
      <Header />
      <Mainscreen>
        <Maintitle>Cinebam</Maintitle>
      </Mainscreen>

      <Secondscreen>
        <Secondtitle>Productions</Secondtitle>
        <Secondtext>Découvrez le cœur créatif de CinéBAM : une vitrine de nos productions cinématographiques les plus captivantes. Chaque œuvre est le fruit de notre passion pour le cinéma et l'excellence dans la formation de jeunes talents.</Secondtext>

        <Prodcontainer1>
          {firstProd && (
            <Prodimage src={firstProd} alt="" />
          )}
          <Offerdiv>
            <Offerboldtext>La Rixe</Offerboldtext>
            <Offertext>
           Septembre. Aprrès un bel été, Jimmy, 16 ans, nouveau dans la ville fait sa rentrée scolaire en compagnie de sa petite copine Leila... 
           </Offertext>
            <Link to="/offer">
              <Offerbutton>Voir plus</Offerbutton>
            </Link>
          </Offerdiv>
        </Prodcontainer1>

        <br />

        <Prodcontainer>
          {secondProd && (
            <ReverseProdimage src={secondProd} alt="" />
          )}
          <Reverseofferdiv>
            <Offerboldtext>Fausse Rumeurs</Offerboldtext>
            <Offertext>
           Issam, 16 ans, reve de devenir un grand danseur. Entouré de son coach et de ses amies, il prépare une audition pour...
           </Offertext>
            <Link to="/offer">
              <Offerbutton>Voir Plus</Offerbutton>
            </Link>
          </Reverseofferdiv>
        </Prodcontainer>

        <br />

        <Prodcontainer>
          {thirdProd && (
            <Prodimage src={thirdProd} alt="" />
          )}
          <Offerdiv>
            <Offerboldtext>1. Offre numéro 3</Offerboldtext>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam distinctio ex repellendus, dicta eveniet suscipit iure voluptas placeat aspernatur architecto sapiente <br />
            <Link to="/offer">
              <Offerbutton>Cliquer</Offerbutton>
            </Link>
          </Offerdiv>
        </Prodcontainer>

        <br />

        <Prodcontainer>
          {fourthProd && (
            <ReverseProdimage src={fourthProd} alt="" />
          )}
          <Reverseofferdiv>
            <Offerboldtext>1. Offre numéro 4</Offerboldtext>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam distinctio ex repellendus, dicta eveniet suscipit iure voluptas placeat aspernatur architecto sapiente <br />
            <Link to="/offer">
              <Offerbutton>Cliquer</Offerbutton>
            </Link>
          </Reverseofferdiv>
        </Prodcontainer>

        <br />

        <Prodcontainer>
          {fifthProd && (
            <ReverseProdimage src={fifthProd} alt="" />
          )}
          <Reverseofferdiv>
            <Offerboldtext>1. Offre numéro 5</Offerboldtext>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam distinctio ex repellendus, dicta eveniet suscipit iure voluptas placeat aspernatur architecto sapiente <br />
            <Link to="/offer">
              <Offerbutton>Cliquer</Offerbutton>
            </Link>
          </Reverseofferdiv>
        </Prodcontainer>

        <br />

      </Secondscreen>
      <Footer />
    </Container>
  );
}

export default Cinebam;