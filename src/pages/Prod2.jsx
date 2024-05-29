import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import Header from "../asset/header";
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
  z-index:1;
  &:before {
    content: '✕';
  }
`;

const Titleprod = styled.div`
position: absolute;
z-index:1;
font-weight:bold;
font-size:100px;
color:white;
top:62%;
left:5%;
animation: ${fadeIn} 2s; // Appliquer l'animation fade-in
`
const Titleanddate = styled.div`
display: flex;
`
const Storyprod = styled.div`
position: absolute;
z-index:1;
font-weight:bold;
font-size:1.2vw;
width:55%;
color:white;
top:83%;
left:5%;
animation: ${fadeIn} 2s;
`

const Authorprod = styled.div`
position: absolute;
z-index:1;
font-weight:bold;
font-size:2.5vw;
color:white;
top:75%;
left:5%;
animation: ${fadeIn} 2s;
`


const Dateprod = styled.div`
position: absolute;
z-index:1;
font-weight:bold;
font-size:3vw;
color:white;
top:65%;
left:80%;
animation: ${fadeIn} 2s;
`
const LinkButton = styled.button`
  position: absolute;
  cursor: pointer;
  z-index: 1;
  font-weight: bold;
  font-size: 2vw;
  border-radius: 2vh;
  padding-left: 2vw;
  padding-right: 2vw;
  background-color: black;
  color: white;
  top: 87%;
  left: 76%;
  animation: ${fadeIn} 2s;
  &:hover {
    opacity: 0.6;
  }
`;

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
top:75%;
left: 76%;
width: 15%;
`




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

function Prod1() {
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
      const docRef = doc(firestore, "storage", "prodcontent2");
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
          setUrlButton(documentData.urlbutton)

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
<Titleprod>{Title}</Titleprod>
<Dateprod>{Date}</Dateprod>
<Authorprod>{Author}</Authorprod>
<Storyprod>{Info}</Storyprod>
<State>{Data}</State>
<a href={Urlbutton}>
      <LinkButton>{Buttontext}</LinkButton>
      </a>
      <Slider images={sliderImages} />

    </>
  
  );
}
export default Prod1;