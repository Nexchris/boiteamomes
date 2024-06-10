import React, { useEffect, useState } from 'react';
import { storage } from '../firebaseConfig'; 
import { ref, getDownloadURL } from "firebase/storage";
import styled, { keyframes } from 'styled-components';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import Header from '../asset/header';
import Footer from '../asset/footer';
import { InView } from 'react-intersection-observer';
import Prod1 from './Prod1'


const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Ajout d'un fond semi-transparent */
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 9999;

  &.disabled-pointer-events {
    pointer-events: none;
  }
`;


const CloseButton = styled.span`
  color: white;
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 250px;
  cursor: pointer;
  z-index:99;
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
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
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
  z-index: 2;

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
  color: white;
  font-weight: 500;
  text-align: center;
  margin: 0;

  @media (max-width: 768px) {
    padding: 0;
    font-size: 6vh;
    font-weight: 700;
  }
`;

const Secondtext = styled.div`
  margin-left: 30vh;
  color: white;
  font-size: 3vh;
  width: 70%;
  text-align: center;
  opacity: 0; /* Add this line */
  transition: opacity 0.5s ease-in-out; /* Add this line */


  @media (max-width: 768px) {
    margin-left: 15%;
    font-size: medium;
    margin-bottom: 3vh;
  }
`;

const Prodcontainer = styled.div`
  animation: backInLeft 0.5s;
  display: flex;
  margin-top: 5vh;
  margin-left: 10vh;

  @media (max-width: 768px) {
    margin: 0;
    
  }
`;

const Prodimage = styled.img`
  border-radius: 15%;
  width: 40vw;
  height: 60vh;

  @media (max-width: 768px) {
    border-radius: 15%;
    width: 90vw;
    margin-left: 3vh;
    height: fit-content;
  }
`;

const ReverseProdimage = styled(Prodimage)`
  width: 40vw;
  margin-left: 50vw;

  @media (max-width: 768px) {
    border-radius: 15%;
    width: 90vw;
    margin-left: 3vh;
    height: fit-content;
  }
`;

const Offerdiv = styled.div`
  text-align: center;
  background-color: #0b0b0b;
  color: white;
  width: 40%;
  font-size: 2vh;
  height: 25vh;
  margin-left: -40vh;
  margin-top: 35vh;
  border-radius: 5vh;
  margin-bottom:5vh;

  @media (max-width: 768px) {
    width: 85vw;
    margin-left: -88vw;
    margin-top: 15vh;
    height: fit-content;
  }
`;

const Reverseofferdiv = styled(Offerdiv)`
  margin-left: -120vh;

  @media (max-width: 768px) {
    width: 85vw;
    margin-left: -88vw;
    margin-top: 15vh;
    height: fit-content;
  }
`;

const Offerboldtext = styled.div`
  font-size: 3.5vh;
  padding-bottom: 1vh;
  font-weight: 600;
  padding-top: 1vh;
  @media (max-width: 768px) {
    padding-bottom: 0;
  }
`;

const Offertext = styled.div`
  font-size: 1.9vh;
  width: 28vw;
  text-align: center;
  margin-left: 10vh;
  margin-bottom: 2vh;

  @media (max-width: 768px) {
    width: 60vw;
    font-size: small;
    margin-left: 6vh;
  }
`;

const Offerbutton = styled.button`
  font-size: 2.5vh;
  width: 18vw;
  padding: 10px 3vw;
  font-weight: bold;
  background-color: white;
  color: black;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    margin-top: -10vh;
    width: 30vw;
    margin-bottom: 2vh;


  }

  &:hover {
    opacity: 0.5;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Letter = styled.span`
  display: inline-block;
  opacity: 0;
  animation: ${fadeIn} 0.5s forwards;
`;

const AnimatedTitle = ({ text }) => {
  return (
    <InView threshold={0.5}>
      {({ ref, inView }) => (
        <Secondtitle ref={ref}>
          {text.split('').map((letter, index) => (
            <Letter
              key={index}
              style={{
                animationDelay: `${inView ? index * 0.05 : 0}s`,
              }}
            >
              {letter}
            </Letter>
          ))}
        </Secondtitle>
      )}
    </InView>
  );
};

const AnimatedText = ({ text }) => {
  return (
    <InView threshold={0.5}>
      {({ ref, inView }) => (
        <Secondtext ref={ref}>
          {text.split(' ').map((word, wordIndex) => (
            <div key={wordIndex}>
              {word.split('').map((letter, index) => (
                <Letter
                  key={index}
                  style={{
                    animationDelay: `${inView ? index * 0.05 : 0}s`,
                  }}
                >
                  {letter}
                </Letter>
              ))}
              {' '}
            </div>
          ))}
        </Secondtext>
      )}
    </InView>
  );
};



function Boiteamomes() {
  const [data, setData] = useState(null);
  const [background, setBackground] = useState('');
  const [firstProd, setFirstProd] = useState('');
  const [secondProd, setSecondProd] = useState('');
  const [thirdProd, setThirdProd] = useState('');
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [title3, setTitle3] = useState('');
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [content3, setContent3] = useState('');
  const [button, setButton] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, "storage", "bamscreen");
      try {
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const documentData = docSnap.data();
          console.log("Document data:", documentData);
  
          setBackground(documentData.background);
          setFirstProd(documentData.prodimage1);
          setSecondProd(documentData.prodimage2);
          setThirdProd(documentData.thirdProd);
          setTitle1(documentData.title1);
          setTitle2(documentData.title2);
          setTitle3(documentData.title3);
          setContent1(documentData.content1);
          setContent2(documentData.content2);
          setContent3(documentData.content3);
          setButton(documentData.button);
  
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
<Container>
      <Header />
      <Mainscreen backgroundImage={background}>
        <Maintitle>Boite à Momes</Maintitle>
      </Mainscreen>

      <Secondscreen>
      <AnimatedTitle text="Les&nbsp;Offres" />
      <InView threshold={0.5}>
          {({ ref, inView }) => (
            <Secondtext ref={ref} style={{ opacity: inView ? 1 : 0,   transition: 'opacity 1.5s ease-in-out' }}>
Rejoignez nos ateliers pour enfants où chaque session est une aventure, explorant le théâtre à travers des jeux, des histoires et la performance. Idéal pour les jeunes esprits créatifs prêts à exprimer leur potentiel
            </Secondtext>
          )}
        </InView>


        <InView threshold={0.5}>
  {({ ref, inView, entry }) => (
    <Prodcontainer
      ref={ref}
      style={{
        transform: inView ? 'scale(1) translateX(0)' : 'scale(0.8) translateX(-50%)',
        opacity: inView ? 1 : 0,
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
      }}
    >
      {firstProd && (
        <Prodimage
          src={firstProd}
          alt=""
        />
      )}
      <Offerdiv>
        <Offerboldtext>Atélier Enfants</Offerboldtext>
        <Offertext>
        Rejoignez nos ateliers pour enfants où chaque session est une aventure, explorant le théâtre à travers des jeux, des histoires et la performance. Idéal pour les jeunes esprits créatifs prêts à exprimer leur potentiel
        </Offertext>
        <Offerbutton>{button}</Offerbutton>
      </Offerdiv>
    </Prodcontainer>
  )}
</InView>


<InView threshold={0.5}>
  {({ ref, inView, entry }) => (
    <Prodcontainer
      ref={ref}
      style={{
        transform: inView ? 'scale(1) translateX(0)' : 'scale(0.8) translateX(50%)',
        opacity: inView ? 1 : 0,
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
      }}
    >
      {secondProd && (
        <ReverseProdimage
          src={secondProd}
          alt=""
        />
      )}
      <Reverseofferdiv>
        <Offerboldtext>Atélier Adultes</Offerboldtext>
        <Offertext>
        Participez à nos ateliers pour adultes, où vous explorerez l'expression théâtrale à travers improvisation et performances en groupe. Idéal pour les acteurs à tous niveaux désirant affiner leur art. 
        </Offertext>
        <Link to="/offer">
        <Offerbutton>{button}</Offerbutton>
        </Link>
      </Reverseofferdiv>
    </Prodcontainer>
  )}
</InView>


<InView threshold={0.5}>
  {({ ref, inView, entry }) => (
    <Prodcontainer
      ref={ref}
      style={{
        transform: inView ? 'scale(1) translateX(0)' : 'scale(0.8) translateX(-50%)',
        opacity: inView ? 1 : 0,
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
      }}
    >
      {thirdProd && (
        <Prodimage
          src={thirdProd}
          alt=""
        />
      )}
      <Offerdiv>
        <Offerboldtext>Atélier Cinébam</Offerboldtext>
        <Offertext>
        Rejoignez CinéBAM pour apprendre la réalisation cinématographique en pratique. Parfait pour les jeunes passionnés par le storytelling visuel, désireux de créer et partager leurs propres films.
          <br />
        </Offertext>
        <Link to="/offer">
          <Offerbutton>{button}</Offerbutton>
        </Link>
      </Offerdiv>
    </Prodcontainer>
  )}
</InView>






      </Secondscreen>
      <Footer />
    </Container>
  );
}

export default Boiteamomes;