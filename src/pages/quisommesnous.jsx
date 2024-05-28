import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebaseConfig';
import { storage } from '../firebaseConfig'; 
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Imagetemplate from '../images/image.png';
import Imagetemplate2 from '../images/image2.png';
import { Link } from 'react-router-dom';
import Header from '../asset/header'
import Footer from '../asset/footer'
import { InView } from 'react-intersection-observer';

const Container = styled.div`
  background-color: #black;
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
  width: 100vw;
  height: 100vh;
  display: flex; 
  background-color: black;
  @media (max-width: 768px) {
    display:block;
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
   
  }
  

`;

const Maintitle = styled.h1`
  font-size: 20vh;
  padding-top: 5vh;
  text-align: center;
  margin:0;
  @media (max-width: 768px) {
    font-size: xxx-large;
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
    margin-left: 6vh;
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
`;



const Image = styled.img`
  width: 100%; /* Vous pouvez ajuster cette valeur selon vos besoins */
  
  margin-right:0vh;
  @media (max-width: 768px) {
    margin-left: 7vw;
    margin-top: 5vh;
    margin-bottom: 3vh;
    width: 85%;
  }


`;

const ImageContainer = styled.div`
margin-left: 10vh;
margin-top: 5vh;
@media (max-width: 768px) {
  margin:0;
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
    <Header />
      <Mainscreen>
        <Maintitle>Qui sommes  <br /> nous ?</Maintitle>
      </Mainscreen>


      <Secondscreen>
      
 
    <ImageContainer
      
    >
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
        
        </Secondcontent>
      </Secondscreen>
      <Thirdscreen>
      <InView threshold={0.5}>
          {({ ref, inView }) => (
            <Thirdtext ref={ref} style={{ opacity: inView ? 1 : 0,   transition: 'opacity 1.5s ease-in-out' }}>
              {/* Add the style prop here */}
              Chaque année, la Boîte à Mômes et CinéBam s’engagent à créer et produire des spectacles et films courts originaux. L'objectif donné est d'initier ses élèves aux conditions réelles et professionnelles (costumes, décors, salles, plateaux, matériels) d'une représentation ou d'un tournage en fin d’année.
            </Thirdtext>
          )}
        </InView>
       <br />
       <InView threshold={0.5}>
          {({ ref, inView }) => (
            <Thirdtext ref={ref} style={{ opacity: inView ? 1 : 0,   transition: 'opacity 1.5s ease-in-out' }}>
              {/* Add the style prop here */}
              Depuis sa création, la Boîte à Mômes a formé quelques centaines de comédiens amateurs, certains devenus professionnels au sein de ses ateliers, comme des écoles communales, collèges et lycées.
            </Thirdtext>
          )}
        </InView>
      </Thirdscreen>
        
     
<Footer/>


    </Container>
    </>
  );
}

export default Quisommesnous;
