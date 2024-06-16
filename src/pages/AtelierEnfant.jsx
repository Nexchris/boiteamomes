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
  padding-bottom: 1vh;
  font-weight: 600;
  padding-top: 1vh;
  @media (max-width: 768px) {
    padding-bottom: 0;
  }
`;

const InfoText = styled.div`
  font-size: 3.5vh;
  text-align:center;
  padding-bottom: 1vh;
  font-weight: 600;
  padding-top: 1vh;
  @media (max-width: 768px) {
    padding-bottom: 0;
  }
`;

const InfoContainer2 = styled.div`
display:flex;
margin-bottom:10vh;
`
const InfoText2 = styled.p`
    font-size: 3vh;
    margin-right: 5vw;
    margin-top: 15vh;
`

const InfoImage = styled.img`
width:30%;
`


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
    margin-left: 10vw;
    width: 65vw
  }
`;


function Boiteamomes() {
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
      const docRef = doc(firestore, "storage", "atelier");
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
        <Maintitle>Atelier Enfants</Maintitle>
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
      <InfoTitle>{title1}</InfoTitle>
        <InfoText>
        Les ateliers théâtre enfants sont répartis en différents horaires et lieux en fonction des tranches d'âge :</InfoText>
        <InfoText>
        De 5 à 6 ans : <br />
Mercredi de 11h à 12h <br />
à l'Espace Henry Miller <br />
3 rue du Docteur Calmette, 92110 Clichy-La-Garenne <br /> <br />

De 7 à 9 ans : <br />
le mardi de 17h à 18h15 <br />
à l'Espace Jeunesse Patrick VIÉ <br />
22 rue Curton, 92110 Clichy-La-Garenne <br /> <br />

De 9 à 12 ans : <br />
le samedi de 11h à 12h15 <br />
à l'École Victor Hugo <br />
17 Rue d’Alsace, 92110 Clichy-La-Garenne
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
        <InfoTitle>{title2}</InfoTitle>
        <InfoText>
        L'inscription nécessite une adhésion à l'année de 30 € par fratrie et un forfait de 130 € par trimestre.

 

Avant toute inscription, l'association propose à vos enfants un premier cours d'essai gratuit !

 

Pour inscrire votre enfant, merci de télécharger le formulaire ci-dessous et de le renvoyer rempli à : boitamomes@gmail.com
        </InfoText>
        <a href="/2024-2025-Fiche.pdf" download="2024-2025-Fiche définitive.pdf">
  <SubmitButton>Télécharger</SubmitButton>
</a>

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
        <InfoContainer2>
      <InfoText2><h1>{intervenante1}</h1> 
      {intervenante1info}
      </InfoText2>
    <InfoImage src={image1} alt="" />
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
        <InfoContainer2>
        <InfoText2><h1>{intervenante2}</h1> 
{intervenante2info}
</InfoText2>
    <InfoImage src={image2} alt="" />
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

export default Boiteamomes;