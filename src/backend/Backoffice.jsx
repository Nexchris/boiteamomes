import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { storage } from '../firebaseConfig'; 
import { ref, getDownloadURL } from "firebase/storage";
import { useVideoURL } from '../context/VideoUrlContext';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Backform = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80vw;
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
  margin-top: 1rem;

  &:hover {
    background-color: #111;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const InputLabel = styled.label`
  margin-right: 1rem;
`;

const InputField = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Buttonchange = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Backoffice = () => {
  const { leftVideoURL, setLeftVideoURL, rightVideoURL, setRightVideoURL, updateLeftVideoURL } = useVideoURL();
  const [menuOpen, setMenuOpen] = useState(false);
  const [leftVideoInput, setLeftVideoInput] = useState("");
  const [rightVideoInput, setRightVideoInput] = useState("");

  useEffect(() => {
    const leftVideoStorageRef = ref(storage, 'video/soustension.mp4');
    getDownloadURL(leftVideoStorageRef).then((url) => {
      setLeftVideoURL(url);
    }).catch((error) => {
      console.error("Error getting left video URL:", error);
    });

    const rightVideoStorageRef = ref(storage, 'video/boiteamomes.mp4');
    getDownloadURL(rightVideoStorageRef).then((url) => {
      setRightVideoURL(url);
    }).catch((error) => {
      console.error("Error getting right video URL:", error);
    });
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLeftVideoUpdate = () => {
    // Mettre à jour leftVideoURL avec leftVideoInput
    updateLeftVideoURL(leftVideoInput);

    // Afficher un message dans la console
    console.log("Left video URL updated successfully.");
  };

  return (
    <LoginContainer>
      <Backform>
        <h2>Bienvenue au Backoffice</h2>
        <Button onClick={toggleMenu}>Menu D'accueil</Button>
        {menuOpen && (
          <div>
            <InputContainer>
              <InputLabel>Video Gauche :</InputLabel>
              <InputField
                type="text"
                value={leftVideoInput}
                onChange={(e) => setLeftVideoInput(e.target.value)}
                placeholder="URL de la vidéo gauche"
              />
              <Buttonchange onClick={handleLeftVideoUpdate}>Actualiser</Buttonchange>
            </InputContainer>
            
            <InputContainer>
              <InputLabel>Video Droite :</InputLabel>
              <InputField
                type="text"
                value={rightVideoURL}
                onChange={(e) => setRightVideoInput(e.target.value)}
                placeholder="URL de la vidéo droite"
              />
            </InputContainer>
          </div>
        )}
      </Backform>
    </LoginContainer>
  );
};

export default Backoffice;
