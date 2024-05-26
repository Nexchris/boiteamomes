import React, { useEffect, useState } from 'react';
import { storage } from '../firebaseConfig'; 
import { ref, getDownloadURL } from "firebase/storage";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../asset/header';
import Footer from '../asset/footer';

const Container = styled.div`

  width: 100vw;
  height: 100vh;
`;

const Mainscreen = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Vous pouvez ajuster l'opacité ici */
    z-index: 1; /* Assurez-vous que cet élément soit au-dessus de l'image de fond */
  }

  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const Maintitle = styled.h1`
  font-size: 20vh;
  padding-top: 40vh;
  text-align: center;
  color: white;
  margin: 0;
  position: relative;
  z-index: 2; /* Assurez-vous que le texte soit au-dessus du pseudo-élément */
  @media (max-width: 768px) {
    font-size: 7vh;
    padding-top: 20vh;
  }
`;

const Secondscreen = styled.div`
  background-color: black;
  width: 100vw;
`;

const Secondtitle = styled.h2`
  font-size: 14vh;
  padding-top: 10vh;
  color:white;
  font-weight: 500;
  text-align: center;
  margin: 0;
  @media (max-width: 768px) {
    margin: 0;
    font-size: 6vh;
    font-weight:700;
  }
`;

const Secondtext = styled.div`
  margin-left: 30vh;
  color:white;
  font-size: 3vh;
  width: 70%;
  text-align: center;
  @media (max-width: 768px) {
    margin-left:15%;
  }
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

const Offerdiv = styled.div`
  text-align: center;
  background-color: #0b0b0b;
  color:white;
  width: 40%;
  font-size: 2vh;
  height: 25vh;
  margin-left: -40vh;
  margin-top: 35vh;
  border-radius: 5vh;

  @media (max-width: 768px) {
    width: 85vw;
    margin-left: -40vh;

   }
`;

const Reverseofferdiv = styled(Offerdiv)`
margin-left: -120vh;
@media (max-width: 768px) {
  margin-left: -40vh;
 }
`;

const Offerboldtext = styled.div`
font-size: 3.5vh;
padding-bottom:1vh;
font-weight: 600;
padding-top: 1vh;
`;

const Offertext = styled.div`
font-size: 1.9vh;
width: 28vw;
text-align:center;
margin-left:10vh;
margin-bottom:2vh;
@media (max-width: 768px) {
  width: 62vw;
  font-size: 1.8vh;
 }
`;

const Offerbutton = styled.button`
  font-size: 2.5vh;
  width:18vw;
  padding: 10px 3vw;
  font-weight:bold;
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
  const [background, setBackground] = useState('');
  const [firstProd, setFirstProd] = useState('');
  const [secondProd, setSecondProd] = useState('');
  const [thirdProd, setThirdProd] = useState('');
  const [fourthProd, setFourthProd] = useState('');
  const [fifthProd, setFifthProd] = useState('');

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const Backgroundimage = ref(storage, 'background/soustension4.jpg');
        const BackgroundUrl = await getDownloadURL(Backgroundimage);
        setBackground(BackgroundUrl); 

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
      <Mainscreen backgroundImage={background}>
        <Maintitle>Cinebam</Maintitle>
      </Mainscreen>

      <Secondscreen>
        <Secondtitle>Productions</Secondtitle>
        <Secondtext>Découvrez le cœur créatif de CinéBAM : une vitrine de nos productions cinématographiques les plus captivantes. Chaque œuvre est le fruit de notre passion pour le cinéma et l'excellence dans la formation de jeunes talents.</Secondtext>

        <Prodcontainer>
          {firstProd && (
            <Prodimage src={firstProd} alt="" />
          )}
          <Offerdiv>
            <Offerboldtext>La Rixe</Offerboldtext>
            <Offertext>
           Septembre. Après un bel été, Jimmy, 16 ans, nouveau dans la ville fait sa rentrée scolaire en compagnie de sa petite copine Leila... 
           </Offertext>
            <Link to="/offer">
              <Offerbutton>Voir plus</Offerbutton>
            </Link>
          </Offerdiv>
        </Prodcontainer>

        <br />

        <Prodcontainer>
          {secondProd && (
            <ReverseProdimage src={secondProd} alt="" />
          )}
          <Reverseofferdiv>
            <Offerboldtext>Fausse Rumeurs</Offerboldtext>
            <Offertext>
           Issam, 16 ans, rêve de devenir un grand danseur. Entouré de son coach et de ses amis, il prépare une audition pour...
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
            <Offerboldtext>Sous Tension</Offerboldtext>
            <Offertext>
            Carole et Paul vivent avec leurs 3 enfants dans un magnifique appartement parisien. Au fil des années, Carole découvre ...<br />
            </Offertext>
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
            <Offerboldtext>Happy Birthday</Offerboldtext>
            <Offertext>
            C’est le jour J. L’Happy Birthday d’Éva, ses 15 ans. Tout le monde s’éclate et le buffet est parfait. Seulement Eva est la grande absente...<br />
            </Offertext>
            <Link to="/offer">
              <Offerbutton>Cliquer</Offerbutton>
            </Link>
          </Reverseofferdiv>
        </Prodcontainer>

        <br />

        <Prodcontainer>
          {fifthProd && (
            <Prodimage src={fifthProd} alt="" />
          )}
          <Offerdiv>
            <Offerboldtext>Un Jour comme un autre... ou presque</Offerboldtext>
            <Offertext>
            Vendredi soir. Un soir de détente, on boit un verre, on règle nos comptes en se disant ... <br />
            </Offertext>
            <Link to="/offer">
              <Offerbutton>Cliquer</Offerbutton>
            </Link>
          </Offerdiv>
        </Prodcontainer>

        <br />

      </Secondscreen>
      <Footer />
    </Container>
  );
}

export default Cinebam;
