import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from '../asset/footer';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from '../firebaseConfig';
import Header from '../asset/Header';

const Container = styled.div`
  display: flex;
  font-family: 'Poppins', sans-serif;
  background-color: #f5f5f5;
  color: #333;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Rightscreen = styled.div`
  width: ${(props) => props.expanded ? '85vw' : '50vw'};
  height: 100vh;
  position: relative;
  overflow: hidden;
  transition: width 0.5s ease;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, ${(props) => props.isHovered ? '0' : '0.8'});
    z-index: 1;
    transition: background-color 0.5s ease;
    pointer-events: none; /* Désactiver la réception des événements de pointer */
  }

  @media (max-width: 768px) {
    height: 50vh;
    width: ${(props) => props.expanded ? '100vw' : '100vw'};
  }
`;

const Leftscreen = styled.div`
  width: ${(props) => props.expanded ? '85vw' : '50vw'};
  height: 100vh;
  position: relative;
  overflow: hidden;
  transition: width 0.5s ease;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, ${(props) => props.isHovered ? '0' : '0.8'});
    z-index: 1;
    transition: background-color 0.5s ease;
    pointer-events: none; /* Désactiver la réception des événements de pointer */
  }

  @media (max-width: 768px) {
    height: 50vh;
    width: ${(props) => props.expanded ? '100vw' : '100vw'};
  }
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextContainer = styled.div`
  position: absolute;
  width:30vw;
  height:auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white background */
  z-index: 2; /* Ensure it sits on top of the video */
  padding: 20px; /* Add some padding for better visual separation */
  border-radius: 10px; /* Round the corners for a softer look */
  @media (max-width: 768px) {
    width: -webkit-fill-available;
        height: auto;
    }
    @media (min-width: 800px) and (max-width: 1400px) {
      width: fit-content;
      height: max-content;
    }
  }
  
`;

const Href = styled.a`
  text-decoration: none;
  color:black;
`;


const Title = styled.h1`
  margin:0;
  font-size: 7vh;
  color: white; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold; 
  @media (max-width: 768px) {
    font-size: x-large;
  }
  @media (min-width: 800px) and (max-width: 1400px) {
    font-size: 4vh;
  }
`;

const Title2 = styled.h1`
  margin:0;
  font-size: 7vh;
  color: white; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold; 
  @media (max-width: 1000px) {
    font-size: x-large;
  }
  
`;

const Text = styled.p`
  margin:0;
  margin-bottom:2vh;
  font-size: 2.5vh;
  color: white; /* Dark text color */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Lighter text shadow */
  cursor: pointer;

  @media (max-width: 768px) {
    display:none;
  }

  @media (min-width: 800px) and (max-width: 1400px) {
    display:none;
  }
`;

const Button = styled.button`
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  transition-duration: 0.4s;

  &:hover {
    background-color: #111;
  }
`;

function HomeScreen() {
  const videoRef = useRef(null);
  const rightVideoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [isRightExpanded, setIsRightExpanded] = useState(false);
  const [leftVideoURL, setLeftVideoURL] = useState("");
  const [rightVideoURL, setRightVideoURL] = useState("");

  const [data, setData] = useState(null);
  const [leftTitle, setLeftTitle] = useState('');
  const [rightTitle, setRightTitle] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [urlVideoLeft, setUrlVideoLeft] = useState('');
  const [urlVideoRight, setUrlVideoRight] = useState('');
  const [leftContent, setLeftContent] = useState('');
  const [rightContent, setRightContent] = useState('');

  useEffect(() => {
    // Fonction pour récupérer les données de Firestore
    const fetchData = async () => {
      const docRef = doc(firestore, "storage", "homescreen");
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const documentData = docSnap.data();
          console.log("Document data:", documentData);
          setData(documentData);
          setLeftTitle(documentData.lefttitle);
          setRightTitle(documentData.righttitle);
          setButtonText(documentData.buttonText);
          setUrlVideoLeft(documentData.urlvideoleft);
          setUrlVideoRight(documentData.urlvideoright);
          setLeftContent(documentData.leftcontent)
          setRightContent(documentData.rightcontent)
          setButtonText(documentData.buttontext);

          // Set video URLs from Firestore data
          setLeftVideoURL(documentData.urlvideoleft);
          setRightVideoURL(documentData.urlvideoright);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, []);

  const handleMouseOver = () => {
    setIsHovered(true);
    setExpanded(true);
    const video = videoRef.current;
    video.play();
  };

  const handleMouseOut = () => {
    setIsHovered(false);
    setExpanded(false);
    const video = videoRef.current;
    video.pause();
  };

  const handleRightMouseOver = () => {
    setIsRightHovered(true);
    setIsRightExpanded(true);
    const video = rightVideoRef.current;
    video.play();
  };

  const handleRightMouseOut = () => {
    setIsRightHovered(false);
    setIsRightExpanded(false);
    const video = rightVideoRef.current;
    video.pause();
  };

  return (
    <>
      <Header />
      <Container>
        <Leftscreen expanded={expanded} isHovered={isHovered} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <Video ref={videoRef} src={leftVideoURL} autoPlay={false} muted loop />
          <TextContainer>
            <Title>{leftTitle}</Title>
            <Text>{leftContent}</Text>
            <Href href="/cinebam">
              <Button>{buttonText}</Button>
            </Href>
          </TextContainer>
        </Leftscreen>
        <Rightscreen expanded={isRightExpanded} isHovered={isRightHovered} onMouseOver={handleRightMouseOver} onMouseOut={handleRightMouseOut}>
          <Video ref={rightVideoRef} src={rightVideoURL} autoPlay={false} muted loop />
          <TextContainer>
            <Title2>{rightTitle}</Title2>
            <Text>{rightContent}</Text>
            <Href href="/boiteamomes">
            <Button>{buttonText}</Button>
            </Href>
          </TextContainer>
        </Rightscreen>
      </Container>
      <Footer />
    </>
  );
}

export default HomeScreen;
