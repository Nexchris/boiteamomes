import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebaseConfig'; // Assurez-vous que le chemin est correct
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const StyledContainer = styled.div`
  background-color: white;
  width: 100vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow: hidden; /* Assurez-vous que le contenu débordant est caché */
  transition: height 0.5s ease; /* Transition douce de la hauteur */
  height: ${props => props.visible ? 'auto' : '0'}; /* Détermine si le contenu est visible */
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0; // Réinitialiser les marges
  padding: 0; // Réinitialiser les padding
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5vw;
  margin-right: 1.5vw;
`;

const Flex = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: 2vw;
  color:white;
  font-weight: 600;
  text-align: center;
  cursor: pointer; /* Curseur indiquant qu'il est cliquable */
`;

const StyledTitle = styled.div`
  font-size: 2vw;
  font-weight: 600;
  text-align: center;
`;

const StyledVideo = styled.video`
  width: 100%;
`;

const StyledInput = styled.textarea`
  width: auto;
  height: 8vh;
`;

const StyledButton = styled.button`
  padding: 0.75rem;
  margin-top: 1vh;
  border-radius: 2vw;
  border: none;
  background-color: black;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease 0s;
  width: auto;
`;

const Backend = () => {
  const [leftVideo, setLeftVideo] = useState('');
  const [rightVideo, setRightVideo] = useState('');
  const [leftTitle, setLeftTitle] = useState('');
  const [rightTitle, setRightTitle] = useState('');
  const [leftContent, setLeftContent] = useState('');
  const [rightContent, setRightContent] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [contentVisible, setContentVisible] = useState(false); // État pour gérer la visibilité du contenu

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, "storage", "homescreen");
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const documentData = docSnap.data();
          console.log("Document data:", documentData);

          setLeftVideo(documentData.urlvideoleft);
          setRightVideo(documentData.urlvideoright);
          setLeftTitle(documentData["left title"]);
          setRightTitle(documentData.righttitle);
          setLeftContent(documentData.leftcontent);
          setRightContent(documentData.rightcontent);
          setButtonText(documentData.buttontext);

        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (field, value) => {
    const docRef = doc(firestore, "storage", "homescreen");
    try {
      await updateDoc(docRef, {
        [field]: value
      });
      console.log(`Updated ${field} with value: ${value}`);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const toggleContent = () => {
    setContentVisible(!contentVisible);
  };

  return (
    <>
      <Title onClick={toggleContent}>Zone de la page d'accueil</Title>
      <hr />
      <StyledContainer visible={contentVisible}>
        <Flex>
          <VideoContainer>
            <StyledTitle>Vidéo de Gauche</StyledTitle>
            <StyledVideo src={leftVideo} controls />
            <StyledInput value={leftVideo} onChange={(e) => setLeftVideo(e.target.value)} />
            <StyledButton onClick={() => handleUpdate('urlvideoleft', leftVideo)}>Changer la Vidéo</StyledButton>
          </VideoContainer>

          <VideoContainer>
            <StyledTitle>Vidéo de Droite</StyledTitle>
            <StyledVideo src={rightVideo} controls />
            <StyledInput value={rightVideo} onChange={(e) => setRightVideo(e.target.value)} />
            <StyledButton onClick={() => handleUpdate('urlvideoright', rightVideo)}>Changer la Vidéo</StyledButton>
          </VideoContainer>
        </Flex>

        <Flex>
          <TextContainer>
            <StyledTitle>Titre de Gauche</StyledTitle>
            <StyledInput value={leftTitle} onChange={(e) => setLeftTitle(e.target.value)} />
            <StyledButton onClick={() => handleUpdate('left title', leftTitle)}>Changer le texte</StyledButton>
          </TextContainer>

          <TextContainer>
            <StyledTitle>Titre de Droite</StyledTitle>
            <StyledInput value={rightTitle} onChange={(e) => setRightTitle(e.target.value)} />
            <StyledButton onClick={() => handleUpdate('righttitle', rightTitle)}>Changer le texte</StyledButton>
          </TextContainer>

          <TextContainer>
            <StyledTitle>Contenu de Gauche</StyledTitle>
            <StyledInput value={leftContent} onChange={(e) => setLeftContent(e.target.value)} />
            <StyledButton onClick={() => handleUpdate('leftcontent', leftContent)}>Changer le texte</StyledButton>
          </TextContainer>

          <TextContainer>
            <StyledTitle>Contenu de Droite</StyledTitle>
            <StyledInput value={rightContent} onChange={(e) => setRightContent(e.target.value)} />
            <StyledButton onClick={() => handleUpdate('rightcontent', rightContent)}>Changer le texte</StyledButton>
          </TextContainer>

          <TextContainer>
            <StyledTitle>Texte du Bouton</StyledTitle>
            <StyledInput value={buttonText} onChange={(e) => setButtonText(e.target.value)} />
            <StyledButton onClick={() => handleUpdate('buttontext', buttonText)}>Changer le texte</StyledButton>
          </TextContainer>
        </Flex>
      </StyledContainer>
    </>
  );
};

export default Backend;
