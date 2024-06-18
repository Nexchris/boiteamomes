import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { storage } from '../firebaseConfig'; 
import { ref, getDownloadURL } from "firebase/storage";
import styled, { keyframes } from 'styled-components';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import Header from '../asset/Header';
import Footer from '../asset/footer';
import { InView } from 'react-intersection-observer';
import Background from '../images/atelier/atelieradultes.png'
Modal.setAppElement('#root'); // Ceci est important pour l'accessibilité, vous devriez le définir sur l'élément racine de votre application


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  

`;

const Mainscreen = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${Background});
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
        overflow: hidden;
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
    font-size: 4vh;
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





const InfoContainer = styled.div`
text-align: center;
    color: white;
    width: 80vw;
    font-size: 2vh;
    height: auto;

    margin-left: 7vw;
    border-radius: 5vh;
    margin-bottom: 5vh;

  @media (max-width: 768px) {
    width: 85vw;
    margin-left: 4vh;
    margin-top: 15vh;
    height: fit-content;
  }
`;

const InfoTitle = styled.div`
  font-size: 12vh;
  font-weight: 600;
  padding-top: 1vh;
  @media (max-width: 768px) {
    padding-bottom: 0;
      font-size: xx-large;

  }
`;

const InfoText = styled.div`
  font-size: 3.5vh;
  text-align:center;
  padding-bottom: 1vh;
  padding-top: 1vh;
  @media (max-width: 768px) {
    padding-bottom: 0;
    font-size:large;
  }
`;

const InfoContainer2 = styled.div`
display:flex;
margin-bottom:10vh;
  @media (max-width: 1200px) {
   display:block;
  }
`
const InfoText2 = styled.p`
  font-size: 3vh;
  margin-left: 5vw;
  margin-top: 15vh;

  @media (max-width: 768px) {
    order: 2; /* Change l'ordre pour mobile */
    margin:0;
  }
`;

const InfoImage = styled.img`
  width: 95%;

  @media (max-width: 768px) {
    order: 1; /* Change l'ordre pour mobile */
  }
`;


const RevInfoContainer = styled(InfoContainer)`
  margin-left: -120vh;

  @media (max-width: 768px) {
    width: 85vw;
    margin-left: -88vw;
    margin-top: 15vh;
    height: fit-content;
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

const Bold = styled.a`
font-weight:600;
text-decoration:none;
color:white;
&:hover{
opacity:0.7;
}
`

const VideoFrame = styled.div`
  cursor: pointer;
  width: 50vw; /* ajustez selon vos besoins */
  height: 50vh; /* ajustez selon vos besoins */
  margin-left:15vw;
    margin-top:3vh;
  position: relative;
  overflow: hidden;
  background-color: black;
  border: 2px solid #ccc;

  iframe {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
  margin: 0;
    margin-left:3vw;
      margin-top:3vh;
  height:25vh;
width:75vw;
  }
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

const SubmitButton = styled.button`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 1vh;
  margin-top:3vh;
  width: 20vw;
  background-color: gray;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Poppins';

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 500px) {
    width: 65vw
  }
`;


function AtelierCinebam() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const [data, setData] = useState(null);
  const [background, setBackground] = useState('');
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [title3, setTitle3] = useState('');
  const [title4, setTitle4] = useState('');
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [content, setContent] = useState('');
  const [content3, setContent3] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [intervenante1, setIntervenante1] = useState('');
  const [intervenante2, setIntervenante2] = useState('');
  const [intervenante1info, setIntervenante1Info] = useState('');
  const [intervenante2info, setIntervenante2Info] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, "storage", "ateliercinebam");
      try {
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const documentData = docSnap.data();
          console.log("Document data:", documentData);
  
          setImage1(documentData.image1);
          setImage2(documentData.image2);
          setBackground(documentData.background);
          setTitle1(documentData.title1);
          setTitle2(documentData.title2);
          setTitle3(documentData.title3);
          setTitle4(documentData.title4);
          setContent(documentData.content);
          setContent1(documentData.content1);
          setContent2(documentData.content2);
          setContent3(documentData.content3);
          setIntervenante1(documentData.intervenante1);
          setIntervenante2(documentData.intervenante2);
          setIntervenante1Info(documentData.intervenante1info);
          setIntervenante2Info(documentData.intervenante2info);
  
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
        <Maintitle>Atelier Adultes</Maintitle>
      </Mainscreen>

      <Secondscreen>

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
      
      <InfoContainer>
      <InfoTitle>L'Atelier Théâtre Adultes</InfoTitle>
      <div style={{ fontSize: '4vh' }}>De 18 et plus ! </div>
        <InfoText  style={{ width: '70vw', marginLeft:'5vw' }}>
        A partir du répertoire classique ou contemporain, création d’une pièce de théâtre produite en fin d’année dans des conditions professionnelles. Le premier trimestre de l’année est consacré à l’enseignement, les deux suivants aux répétitions.
        </InfoText>
      </InfoContainer>
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
      
      <InfoContainer>
      <InfoTitle>Lieux et Horaires</InfoTitle>
        <InfoText>
        Les ateliers cinéma ont lieu : <br />
        Chaque mardi de 20h à 22h <br />
        <Bold href="https://maps.app.goo.gl/DL2Gzd1SHkcee8mJ8"> à l'Espace Jeunesse Patrick VIÉ <br /></Bold>
        22 rue Curton, 92110 Clichy-La-Garenne
        <br /> <br />
        <div style={{ fontWeight: 600 }}>
        <InfoText>
  LES INSCRIPTIONS POUR CET ATELIER SONT OUVERTES JUSQU'À • FIN OCTOBRE 2024 •        </InfoText>
</div>


        </InfoText>
        
      </InfoContainer>
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
      
      <InfoContainer>
      <InfoTitle>Tarifs</InfoTitle>
        <InfoText>
        L'inscription à l'atelier cinéma requiert une adhésion annuelle par fratrie de 30 € et un forfait de 195 € par trimestre. L'association propose <Bold> un premier cours d'essai gratuit </Bold> avant toute inscription ! <br /> <br />
Pour inscrire votre enfant, merci de télécharger le formulaire ci-dessous et de le renvoyer rempli à l'adresse : <Bold> boitamomes@gmail.com </Bold><br /> <br />

Pour plus d'informations, <Bold href="./contact">N'hésitez pas à nous contacter.</Bold> <br /> <br />

<Bold>
2024-2025-Formulaire d'Inscription Définitive aux Ateliers de La BAM</Bold> <br /> <br />
   
<a href="/2024-2025-Fiche.pdf" download="2024-2025-Fiche définitive.pdf">
  <SubmitButton>Télécharger</SubmitButton>
</a>

        </InfoText>

        
      </InfoContainer>
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
      
      <InfoContainer>
        <InfoTitle>{title2}</InfoTitle>
        <InfoText>
          {content2}
        </InfoText>
       

      </InfoContainer>
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
        transition: 'transform 0.5s ease-in-out, opacity 0.1s ease-in-out',
      }}
    >
      <InfoContainer>
        <InfoContainer2>
          <InfoImage src={image1} alt="" />
          <InfoText2>
            <h1>Audrey Lazini</h1> 
            Comédienne, formée au CNSAD (Conservatoire National Supérieur d'Art Dramatique). <br /> <br />
Elle anime des ateliers collectifs et coaching individuel depuis de nombreuses années auprès de différents publics, enfants, ados, adultes, amateurs et professionnels.
          </InfoText2>
        </InfoContainer2>
        <InfoText>
        </InfoText>
      </InfoContainer>
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
      
      <InfoContainer>
        <InfoText>
        Une hésitation ? Nos élèves en parlent le mieux ! <br /> <br />
Jetez aussi un œil à leurs <Bold href="./cinebam">créations  </Bold>
des années passées !
        </InfoText>
        <div>
      <VideoFrame onClick={openModal}>
        <iframe
          src="https://www.youtube.com/embed/4SSb22-uoA8"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      </VideoFrame>
      <Modal

        contentLabel="YouTube Video"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
          },
        }}
      >
        <button onClick={closeModal}>Fermer</button>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src="https://www.youtube.com/embed/4SSb22-uoA8"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          ></iframe>
        </div>
      </Modal>
    </div>
        
      </InfoContainer>
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
      <InfoContainer>
        <InfoTitle>{title4}</InfoTitle>
      
      </InfoContainer>
    </Prodcontainer>
  )}
</InView>








      </Secondscreen>
      <Footer />
    </Container>
  );
}

export default AtelierCinebam;