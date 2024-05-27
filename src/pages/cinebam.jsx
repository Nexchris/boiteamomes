import React, { useEffect, useState } from 'react';
import { storage } from '../firebaseConfig'; 
import { ref, getDownloadURL } from "firebase/storage";
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../asset/header';
import Footer from '../asset/footer';
import { InView } from 'react-intersection-observer';

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
    background-color: #45a049;
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

        const fifthRef = ref(storage, 'productionimage/unjourcommeunautreoupresque.png');
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
      <AnimatedTitle text="Productions" />
      <InView threshold={0.5}>
          {({ ref, inView }) => (
            <Secondtext ref={ref} style={{ opacity: inView ? 1 : 0,   transition: 'opacity 1.5s ease-in-out' }}>
              {/* Add the style prop here */}
              Découvrez le cœur créatif de CinéBAM : une vitrine de nos productions
              cinématographiques les plus captivantes. Chaque œuvre est le fruit de
              notre passion pour le cinéma et l'excellence dans la formation de jeunes
              talents.
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
        <Offerboldtext>La Rixe</Offerboldtext>
        <Offertext>
          Septembre. Après un bel été, Jimmy, 16 ans, nouveau dans la ville
          fait sa rentrée scolaire en compagnie de sa petite copine Leila...
        </Offertext>
        <Link to="/offer">
          <Offerbutton>Voir plus</Offerbutton>
        </Link>
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
        <Offerboldtext>Fausse Rumeurs</Offerboldtext>
        <Offertext>
          Issam, 16 ans, rêve de devenir un grand danseur. Entouré de son
          coach et de ses amis, il prépare une audition pour...
        </Offertext>
        <Link to="/offer">
          <Offerbutton>Voir Plus</Offerbutton>
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
        <Offerboldtext>Sous Tension</Offerboldtext>
        <Offertext>
          Carole et Paul vivent avec leurs 3 enfants dans un magnifique
          appartement parisien. Au fil des années, Carole découvre ...
          <br />
        </Offertext>
        <Link to="/offer">
          <Offerbutton>Cliquer</Offerbutton>
        </Link>
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
      {fourthProd && (
        <ReverseProdimage
          src={fourthProd}
          alt=""
        />
      )}
      <Reverseofferdiv>
        <Offerboldtext>Happy Birthday</Offerboldtext>
        <Offertext>
          C’est le jour J. L’Happy Birthday d’Éva, ses 15 ans. Tout le monde
          s’éclate et le buffet est parfait. Seulement Eva est la grande
          absente...<br />
        </Offertext>
        <Link to="/offer">
          <Offerbutton>Voir plus</Offerbutton>
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
      {fifthProd && (
        <Prodimage
          src={fifthProd}
          alt=""
        />
      )}
      <Offerdiv>
        <Offerboldtext>Un Jour comme un autre... ou presque</Offerboldtext>
        <Offertext>
          Vendredi soir. Un soir de détente, on boit un verre, on règle
          nos comptes en se disant ... <br />
        </Offertext>
        <Link to="/offer">
          <Offerbutton>Voir Plus</Offerbutton>
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

export default Cinebam;