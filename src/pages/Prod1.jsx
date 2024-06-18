import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import Header from '../asset/Header';
import Footer from "../asset/footer";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  overflow-x: hidden;
  animation: fadeIn 4s forwards;

  @media (min-width: 768px) {
    flex-direction: row; /* En ligne pour les écrans plus larges */
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Headercontainer = styled.div`
margin-bottom: 10vh;
@media (min-width: 768px) {
 display:none;
}
`;

const SliderWrapper = styled.div`
  flex: 1;
  order: 2; /* Ordre par défaut */
  @media (max-width: 768px) {
    order: 2; /* Deuxième élément en mobile */
  }
`;



const StyledMainscreen = styled.div`
  position: fixed;
  @media (max-width: 768px) {
    position: relative;
  }
`;

const StyledFullWidthImage = styled.img`
  object-fit: cover;
  height: 100vh;
  width: 100vw;
  @media (max-width: 768px) {
    height: fit-content;
  }
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
  z-index: 1;
  &:before {
    content: '✕';
  }
  @media (max-width: 768px) {
   display:none;
  }
`;

const LeftZone = styled.div`
position: absolute;
z-index: 1;
top: 65%;
left: 5%;
@media (max-width: 768px) {
  order: 1; /* Premier élément en mobile */
  position: relative;
  left:0%;
  text-align: center;
  margin-bottom: 2vh;
}
`;

const RightZone = styled.div`
position: absolute;
z-index: 1;
top: 64%;
left: 75%;
text-align:center;
width:15vw;
@media (max-width: 768px) {
  order: 3;
  position: relative;
  text-align: center;
  margin-bottom: 2vh;
  left: 0%;
  width: auto;
}
`;

const Titleprod = styled.div`

font-weight:bold;
font-size:6vh;
color:white;
top:62%;
left:5%;
animation: ${fadeIn} 2s; // Appliquer l'animation fade-in
@media (max-width: 768px) {
  font-size: xxx-large;
}
`
const Authorprod = styled.div`
  font-weight: bold;
  font-size: 4vh;
  color: white;
  top: 76%;
  left: 5%;
  animation: ${fadeIn} 2s;
  @media (max-width: 768px) {
    font-size: xx-large;
  }
`;

const Storyprod = styled.div`
  font-size: 2.5vh;
  width: 55%;
  color: white;
  top: 83%;
  left: 5%;
  animation: ${fadeIn} 2s;
  @media (max-width: 768px) {
    width:auto;
    font-size:larger;
    padding-right: 3vh;
    padding-left: 3vh;
  }
`;

const Dateprod = styled.div`
  font-weight: bold;
  font-size: 6vh;
  color: white;
  margin-bottom:1vh;
  animation: ${fadeIn} 2s;
  @media (max-width: 768px) {
    display:none;
  }
  
`;

const State = styled.div`
  animation: ${fadeIn} 2s;
  font-weight: bold;
  font-size: 2.5vh;
  color: white;
  margin-bottom:1vh;
`;

const LinkButton = styled.button`
cursor: pointer;
font-weight: bold;
font-size: 2vw;
border-radius: 2vh;
margin-top:1vh;
padding-left: 1vw;
padding-right: 1vw;
background-color: black;
color: white;
top: 87%;
left: 76%;
animation: ${fadeIn} 2s;
&:hover {
  opacity: 0.6;
}
@media (max-width: 768px) {
  background-color: #0c0c0c;
  font-size: xx-large;
  padding-left: 2vh;
  padding-right: 2vh;
}
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;


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
        <CloseButton />
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
  z-index: 1;
  @media (max-width: 768px) {
    margin-left: 2vh;
  }
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
  z-index: 1;
  @media (max-width: 768px) {
    margin-left: 88vw;
  }
`;


const Href = styled.a`
  text-decoration: none;
  color: white;
`;


const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


function Prod4() {
  const [sliderImages, setSliderImages] = useState([]);
  const [Title, setTitle] = useState('');
  const [Date, setDate] = useState('');
  const [Author, setAuthor] = useState('');
  const [Info, setInfo] = useState('');
  const [Data, setData] = useState('');
  const [Buttontext, setButtontext] = useState('');
  const [Urlbutton, setUrlButton] = useState('');

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

          setTitle(documentData.title);
          setDate(documentData.date);
          setAuthor(documentData.author);
          setInfo(documentData.info);
          setData(documentData.metadata);
          setButtontext(documentData.buttontext);
          setUrlButton(documentData.urlbutton);

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
    <Headercontainer>
    <Header />
    </Headercontainer>
 <Container>
    <LeftZone>
      <Titleprod>{Title}</Titleprod>
      <Authorprod>{Author}</Authorprod>
      <Storyprod>{Info}</Storyprod>
    </LeftZone>

    <SliderWrapper>
      <Slider images={sliderImages} />
    </SliderWrapper>

    <RightZone>
      <Dateprod>{Date}</Dateprod>
      <State>{Data}</State>
      {Buttontext && Urlbutton && (
        <a href={Urlbutton}>
          <LinkButton>{Buttontext}</LinkButton>
        </a>
      )}
    </RightZone>
  </Container>
    </>
  );
}

export default Prod4;
