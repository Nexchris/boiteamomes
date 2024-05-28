import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../firebaseConfig';
import Header from '../asset/header';
import Footer from '../asset/footer';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import './offer.css'


const StyledAwesomeSlider = styled(AwesomeSlider)`
  .awssld {
    /* Vos styles personnalisés pour l'AwesomeSlider */
    --organic-arrow-color: #ffffff; /* Changez la couleur des flèches */
  }
`;


const Container = styled.div`
  background-color: royalblue;
  width: 100vw;
`;

const Back = styled.div`
  margin-left: 5vh;
  width: 10vh;
  font-size: 5vh;
  font-weight: 600;

  &:hover {
    color: white;
    cursor: pointer;
  }
`;


const Firstzone = styled.div`
display:flex;
margin-top:55vh;
margin-left: 0vw;
  padding-top: 25vh;
  position: relative;
  z-index: 1; /* Assurez-vous que le Maintitle est au-dessus de l'AwesomeSlider */
`

const Maintitle = styled.h1`
  font-size: 20vh;
  margin: 0;
  
`;

const Date = styled.div`
font-size: 10vh;
margin-left:5vh;
margin-right:35vw;
margin-top:10vh
`

const Button = styled.button`
font-size: 10vh;
margin-top:10vh
`

const Maintext = styled.div`
  font-size: 2.5vh;
  margin-left: 60vh;
  width: 40%;
  text-align: center;
  position: relative;
  z-index: 1; /* Assurez-vous que le Maintext est au-dessus de l'AwesomeSlider */
`;


const Mainscreen = styled.div`
  background-color: royalblue;
  width: 100vw;
  height: 100vh;
  position: relative; /* Position relative pour contenir les éléments absolus */
  z-index: 0; /* Assurez-vous que l'AwesomeSlider est en arrière-plan */
`;

const FullWidthImage = styled.img`
  width: 100vw;
  height: 100%;
  object-fit: cover; // Assurez-vous que l'image couvre complètement le conteneur sans déformation
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: white;
  background-color: rgba(0, 0, 0, 0.8); /* Fond noir semi-transparent */
  z-index: 5; /* Assurez-vous que l'OverlayContainer est au-dessus de l'AwesomeSlider */
`;

const Image = styled.img`
  display: block;
  margin: 10px auto;
  max-width: 80%;
  max-height: 80%;
  object-fit: cover;
`;


const SecondZone = styled.div`
display:flex;

  position: relative;
  z-index: 1; /* Assurez-vous que le Maintitle est au-dessus de l'AwesomeSlider */
`

function Offer() {
  const [prodVideo, setProdVideo] = useState('');
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, "storage", "prodcontent1");
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const documentData = docSnap.data();
          console.log("Document data:", documentData);
          setProdVideo(documentData.videourl);

          // Collect slider images URLs
          const images = [
            documentData.slide1,
            documentData.slide2,
            documentData.slide3,
            documentData.slide4,
            documentData.slide5,
          ];
          setSliderImages(images);

          // Log each image URL for debugging
          console.log("Slider 1 URL:", documentData.slide1);
          console.log("Slider 2 URL:", documentData.slide2);
          console.log("Slider 3 URL:", documentData.slide3);
          console.log("Slider 4 URL:", documentData.slide4);
          console.log("Slider 5 URL:", documentData.slide5);
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
      <OverlayContainer>
        <Firstzone>
    <Maintitle>Titre</Maintitle>
    <Date>Date</Date>
    <Button>Author</Button>
    </Firstzone>
    <SecondZone>
    <Maintext>Réalisateur</Maintext>
    <Maintext>Court-métrage — 11mn — Drame — 2024</Maintext>
    </SecondZone>
    
    <Maintext>Résumé</Maintext>
  </OverlayContainer>
  <AwesomeSlider className="awssld" >
  {sliderImages.map((url, index) => (
    <div className="page" key={index}>
      <FullWidthImage src={url} alt={`Slider ${index + 1}`} />
    </div>
  ))}
</AwesomeSlider>

</Mainscreen>

      </Container>
    </>
  );
}

export default Offer;
