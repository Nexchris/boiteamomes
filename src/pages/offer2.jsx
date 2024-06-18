import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import Footer from "../asset/footer";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;


const StyledMainscreen = styled.div`
  position: fixed;
`;

const StyledFullWidthImage = styled.img`
  object-fit: cover;
  height:100vh;
  width:100vw;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50%;
  z-index:1;
  &:before {
    content: '✕';
  }
`;

const Title = styled.div`
position: absolute;
z-index:1;
font-weight:bold;
font-size:5vw;
color:white;
top:65%;
left:5%;
animation: ${fadeIn} 2s; // Appliquer l'animation fade-in
`
const Story = styled.div`
position: absolute;
z-index:1;
font-weight:bold;
font-size:1vw;
width:45%;
color:white;
top:85%;
left:5%;
animation: ${fadeIn} 2s;
`

const Author = styled.div`
position: absolute;
z-index:1;
font-weight:bold;
font-size:1.5vw;
color:white;
top:79%;
left:5%;
animation: ${fadeIn} 2s;
`


const Date = styled.div`
position: absolute;
z-index:1;
font-weight:bold;
font-size:1.5vw;
color:white;
top:72%;
left:45%;
animation: ${fadeIn} 2s;
`
const LinkButton = styled.button`
position: absolute;
z-index:1;
font-weight:bold;
font-size:2vw;
border-radius:2vh;
padding-left:1vw;
padding-right:1vw;
background-color: black;
color:white;
top:82%;
left:77%;
animation: ${fadeIn} 2s;
&:hover{
  opacity:0.6;
}
`
const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Adjust the opacity by changing the fourth parameter of rgba()
  z-index: 1;
`;

const State = styled.div`
position: absolute;
z-index:1;
animation: ${fadeIn} 2s;
font-weight:bold;
font-size:1vw;
color:white;
text-align:center;
top:72%;
left:75%`



const Slider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  return (
    <StyledMainscreen>
      <StyledFullWidthImage src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
      <StyledOverlay />
      <Href href="/cinebam">
      <CloseButton/>
          </Href>
      <LeftBack onClick={goToPreviousImage}>{"<"}</LeftBack>
      <RightBack onClick={goToNextImage}>{">"}</RightBack>
    </StyledMainscreen>
  );
};

const LeftBack = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 5vh;
  width: 10vh;
  font-size: 5vh;
  font-weight: 600;
  color: white;
  cursor: pointer;
  z-index:1;
`;


const Href = styled.a`
  text-decoration: none;
  color:white;
`;

const RightBack = styled.div`
position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 95vw;
  width: 10vh;
  font-size: 5vh;
  font-weight: 600;
  color: white;
  cursor: pointer;
  z-index:1;
`

function Offer() {
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, "storage", "prodcontent1");
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const documentData = docSnap.data();
          console.log("Document data:", documentData);

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
<Title>Sous Tension</Title>
<Date>2022</Date>
<Author>Mireille Fiévet</Author>
<Story>Carole et Paul vivent avec leurs 3 enfants dans un magnifique appartement parisien. Au fil des années, Carole découvre un mari devenu possessif, jaloux et paranoiaque. Résister au joug et à l’autoritarisme du père est de plus en plus difficile et dangereux pour l’équilibre de la famille, mais Carole envisage de se séparer de lui.</Story>
<State style ={{width:'25vw'}}>Court-métrage — 20mn — Drame familial - 2022
    <br /> ( déconseillé aux -12 ans )</State>
      <LinkButton>Voir le Making-Of</LinkButton>
      <LinkButton style={{ top: '90vh', left: '79vw' }}>Voir la Vidéo</LinkButton>
      <Slider images={sliderImages} />

    </>
  
  );
}
export default Offer;