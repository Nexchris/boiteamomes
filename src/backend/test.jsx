import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebaseConfig'; // Assurez-vous que le chemin est correct
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Définir le composant stylisé
const BlueText = styled.p`
  color: blue;
`;


const StyledInputContainer = styled.div`
  max-height: 150px; /* ou la hauteur maximale souhaitée pour le défilement */
  overflow-y: auto; /* Pour activer le défilement vertical si le contenu dépasse la hauteur maximale */
`;

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #66afe9;
    outline: none;
    box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
  }
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
background-color:#f9f9f9;
width:30vw;
text-align:center;
border-radius: 1vh;

`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Test = () => {
  const [data, setData] = useState(null);
  const [inputs, setInputs] = useState({
    "left title": '',
    righttitle: '',
    buttontext: '',
    urlvideoleft: '',
    urlvideoright: '',
    leftcontent: '',
    rightcontent: ''
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Fonction pour vérifier l'état de l'authentification
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchData(); // Récupérer les données seulement si l'utilisateur est authentifié
      } else {
        setUser(null);
        console.log("User is signed out");
      }
    });
  }, []);

  // Fonction pour récupérer les données de Firestore
  const fetchData = async () => {
    const docRef = doc(firestore, "storage", "homescreen");
    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const documentData = docSnap.data();
        console.log("Document data:", documentData);
        setData(documentData);
        setInputs(documentData); // Initialiser les inputs avec les données existantes
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleUpdate = async (field) => {
    const docRef = doc(firestore, "storage", "homescreen");
    try {
      await updateDoc(docRef, {
        [field]: inputs[field],
      });
      console.log(`Document ${field} updated!`);
      alert("Le changement a été bien pris en compte");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div>
      <BlueText>
        Ceci est un texte en bleu.
      </BlueText>
      {data ? (
        <div>
          {Object.keys(inputs).map((key) => (
            <InputGroup key={key}>
              <Label>{key}</Label> {/* Ajout du label */}
              <StyledInput
                type="text"
                name={key}
                placeholder={data[key]}
                value={inputs[key]}
                onChange={handleInputChange}
              />
              <StyledButton onClick={() => handleUpdate(key)}>Change</StyledButton>
            </InputGroup>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Test;
