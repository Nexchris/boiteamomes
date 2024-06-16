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
  const [Title, setTitle] = useState('');
  const [Menu1, setMenu1] = useState('');
  const [Menu2, setMenu2] = useState('');
  const [Menu3, setMenu3] = useState('');
  const [Prod1, setProd1] = useState('');
  const [Prod2, setProd2] = useState('');
  const [Prod3, setProd3] = useState('');
  const [Prod4, setProd4] = useState('');
  const [Prod5, setProd5] = useState('');
  const [ContactButton, setContactButton] = useState('');

  const [contentVisible, setContentVisible] = useState(false); // État pour gérer la visibilité du contenu

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, "storage", "header");
      try {
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const documentData = docSnap.data();
          console.log("Document data:", documentData);
  
          setTitle(documentData.title);
          setMenu1(documentData.menu1);
          setMenu2(documentData.menu2);
          setProd1(documentData.prod1);
          setProd2(documentData.prod2);
          setProd3(documentData.prod3);
          setProd4(documentData.prod4);
          setProd5(documentData.prod5);
          setMenu3(documentData.menu3);
          setContactButton(documentData.contactbutton);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
  
    fetchData(); // Appel de la fonction fetchData directement dans useEffect
  
    // Ajout de dependencies vides pour exécuter useEffect une seule fois au montage
  }, []);
  


  const handleUpdate = async (field, value) => {
    const docRef = doc(firestore, "storage", "header");
    try {
      await updateDoc(docRef, {
        [field]: value
      });
      console.log(`Mis à jour ${field} ${value}`);
    } catch (error) {
      console.error("Il y a eu une erreur en changant la valeur du document:", error);
    }
  };

  const toggleContent = () => {
    setContentVisible(!contentVisible);
  };

  return (
    <>
      <Title onClick={toggleContent}>Zone du Header</Title>
      <hr />
      <StyledContainer visible={contentVisible}>

        <Flex>
          <TextContainer>
            <StyledTitle>Menu1</StyledTitle>
            <StyledInput value={Menu1} onChange={(e) => setMenu1(e.target.value)} />
            <StyledButton onClick={() => handleUpdate('menu1', setMenu1)}>Changer le texte</StyledButton>
          </TextContainer>

          <TextContainer>
            <StyledTitle>Menu2</StyledTitle>
            <StyledInput value={Menu2} onChange={(e) => setMenu2(e.target.value)} />
            <StyledButton onClick={() => handleUpdate('menu2', setMenu2)}>Changer le texte</StyledButton>
          </TextContainer>

          <TextContainer>
            <StyledTitle>Menu3</StyledTitle>
            <StyledInput value={Menu3} onChange={(e) => setMenu3(e.target.value)} />
            <StyledButton onClick={() => handleUpdate('menu3', setMenu3)}>Changer le texte</StyledButton>
          </TextContainer>

         
        </Flex>
      </StyledContainer>
    </>
  );
};

export default Backend;
