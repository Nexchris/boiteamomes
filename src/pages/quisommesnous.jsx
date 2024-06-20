import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebaseConfig';
import { storage } from '../firebaseConfig'; 
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Imagetemplate2 from '../images/image2.png';
import { Link } from 'react-router-dom';
import Footer from '../asset/footer'
import { InView } from 'react-intersection-observer';
import Background from '../images/contactbackground.jpg';
import { Audio } from 'react-loader-spinner'

const Container = styled.div`
  background-color: #black;
  width: 100vw;
`;


const Mainscreen = styled.div`
  position: relative;
  background-image: url(${Background});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  @media (max-width: 768px) {
    height: 50vh;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Overlay noir avec opacité de 50% */
    z-index: 1; /* Assurez-vous que l'overlay est au-dessus du background */
  }

  /* Ajoutez cette règle pour que le contenu soit au-dessus de l'overlay */
  & > * {
    position: relative;
    z-index: 2;
  }
`;


const Secondscreen = styled.div`
  width: 100vw;
  height: auto;
  display: flex; 
  background-color: black;
  box-sizing: border-box;
  margin-bottom:5vh;
  @media (max-width: 1200px) {
    display: block;
    height: auto; 
  }
`;
const Thirdscreen = styled.div`
background-color: black;
  width: 100vw;
  margin-top: -10vh;
  padding-bottom:5vh;
  @media (max-width: 768px) {
   margin: 0;
     position: relative;
   
  }
  

`;

const Maintitle = styled.h1`
  font-size: 20vh;
  padding-top: 25vh;
  text-align: center;
  color: white;
  margin:0;
  @media (max-width: 768px) {
    font-size: xxx-large;
  padding-top: 20vh;
  } @media (min-width: 768px) and (max-width:1400px) {
    font-size: xx-large;
  padding-top: 20vh;
  }
`;

const Secondtitle = styled.h2`
font-size: 8vh;
text-align: left;
color: white;
margin:0;
margin-left: 15vh;
margin-top:5vh;
@media (max-width: 768px) {
  font-size: xx-large;
  margin-left: 6vh;
  display: none;
}
`;

const Mireille = styled.h2`
font-size: 8vh;
text-align: left;
color: white;
margin:0;
margin-left: 4vw;
@media (min-width: 300px) and (max-width:399px)  {
margin : 0;
text-align:center;
padding-top: 2vh;
font-size: 4vh;
}
@media (min-width: 400px) and (max-width:1200px)  {
padding-top: 2vh;

  font-size: xxx-large;
  margin:0;
text-align:center;
}
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
  color: white;
  @media (max-width: 768px) {
    margin-left: 10vw;
    font-size: larger;
    width: 80%;
    text-align: center;
  
  }
`;

const Thirdtext = styled.div`
background-color:black;
  margin-left: 5vh;
  font-size: 3vh;
  color: white;
  width: 80vw;
  @media (max-width: 768px) {
    margin-left: 6vh;
    font-size: larger;
    width: 80%;
    text-align: center;
  
  }

 
`;



const Secondcontent = styled.div`
  flex: 1; /* Pour que le contenu s'étende pour remplir l'espace disponible */
    overflow: auto;
`;



const Image = styled.img`
  width: 100%; /* Vous pouvez ajuster cette valeur selon vos besoins */
  
  margin-right:0vh;
  @media (max-width: 1200px) {
    margin-bottom: 3vh;
    width: 60%;
  }


`;

const ImageContainer = styled.div`
margin-left: 10vh;
margin-top: 5vh;
@media (max-width: 1200px) {
  margin:0;
  text-align:center;
}
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




function Quisommesnous() {

const [Image1, setImage1 ] = useState(""); 
const [data, setData] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les données de Firestore
    const fetchData = async () => {
      const docRef = doc(firestore, "storage", "quisommesnous");
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const documentData = docSnap.data();
          console.log("Document data:", documentData);
          setData(documentData);
          setImage1(documentData.image1);
          
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
    <>
    <Container>
      <Mainscreen>
        <Maintitle>Qui sommes  <br /> nous ?</Maintitle>
      </Mainscreen>


      <Secondscreen>
      
 
    <ImageContainer
      
    >
      <Mireille>Mireille Fiévet</Mireille >
      <Image src={Image1} alt="" />
    </ImageContainer>

        <Secondcontent>
      <Secondtitle>{"La Boite a Momes"}</Secondtitle>
      <InView threshold={0.5}>
          {({ ref, inView }) => (
            <Secondtext ref={ref} style={{ opacity: inView ? 1 : 0,   transition: 'opacity 1.5s ease-in-out' }}>
              {/* Add the style prop here */}
              La Boîte à Mômes est une association et compagnie de théâtre créée par Mireille FIEVET en 1998 à l’attention des enfants à partir de 4 ans, des adolescents et des adultes, qu’ils soient débutants, confirmés, amateurs ou professionnels. 
            </Secondtext>
          )}
        </InView>


        <br />
        <InView threshold={0.5}>
          {({ ref, inView }) => (
            <Secondtext ref={ref} style={{ opacity: inView ? 1 : 0,   transition: 'opacity 1.5s ease-in-out' }}>
              {/* Add the style prop here */}
              Depuis 2016, l'association a créé CinéBAM, à la fois atelier de cinéma à destination des adolescents et structure de production de courts-métrages professionnels.
            </Secondtext>
          )}
        </InView>

        <br />

        <InView threshold={0.5}>
          {({ ref, inView }) => (
            <Secondtext ref={ref} style={{ opacity: inView ? 1 : 0,   transition: 'opacity 1.5s ease-in-out' }}>
              {/* Add the style prop here */}
              L’association a pour objet l’enseignement du théâtre, de l'actorat et du tournage en ateliers inspirés par les méthodes de Constantin STANISLAVSKI et revisitées par Lee STRASBERG à l’Actors Studio.
            </Secondtext>
          )}
        </InView>
       
        <br />

        <InView threshold={0.5}>
          {({ ref, inView }) => (
            <Secondtext ref={ref} style={{ opacity: inView ? 1 : 0,   transition: 'opacity 1.5s ease-in-out' }}>
              {/* Add the style prop here */}
              Chaque année, la Boîte à Mômes et CinéBam s’engagent à créer et produire des spectacles et films courts originaux. L'objectif donné est d'initier ses élèves aux conditions réelles et professionnelles (costumes, décors, salles, plateaux, matériels) d'une représentation ou d'un tournage en fin d’année.
              
            </Secondtext>
          )}
        </InView>
<br />
        <InView threshold={0.5}>
          {({ ref, inView }) => (
            <Secondtext ref={ref} style={{ opacity: inView ? 1 : 0,   transition: 'opacity 1.5s ease-in-out' }}>
              {/* Add the style prop here */}
              Depuis sa création, la Boîte à Mômes a formé quelques centaines de comédiens amateurs, certains devenus professionnels au sein de ses ateliers, comme des écoles communales, collèges et lycées.
            </Secondtext>
          )}
        </InView>
       
        
        </Secondcontent>
      </Secondscreen>
<Footer/>


    </Container>
    </>
  );
}

export default Quisommesnous;
