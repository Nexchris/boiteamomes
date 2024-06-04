import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebaseConfig'; // Assurez-vous que le chemin est correct
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "../asset/header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Inputcontainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

function Prod1() {
  const [menu1, setMenu1] = useState('');
  const [menu2, setMenu2] = useState('');
  const [menu3, setMenu3] = useState('');
  const [prod1, setProd1] = useState('');
  const [prod2, setProd2] = useState('');
  const [user, setUser] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(false); // Nouvel état pour contrôler la visibilité du header

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, "storage", "header");
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const documentData = docSnap.data();
          console.log("Document data:", documentData);

          setMenu1(documentData.menu1);
          setMenu2(documentData.menu2);
          setMenu3(documentData.menu3);
          setProd1(documentData.prod1);
          setProd2(documentData.prod2);
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
    if (user) {
      const docRef = doc(firestore, "storage", "header");
      try {
        await updateDoc(docRef, {
          [field]: value
        });
        window.location.reload();
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      alert('You must be logged in to update data.');
    }
  };

  const toggleHeader = () => {
    setHeaderVisible(!headerVisible);
  };

  return (
    <>
      <button onClick={toggleHeader}>
        {headerVisible ? 'header on' : 'header off'}
      </button>
      {headerVisible && (
        <>
          <Header />
          <Container>
            <Inputcontainer>
              <p>Menu 1</p>
              <input type="text" value={menu1} onChange={(e) => setMenu1(e.target.value)} />
              <button onClick={() => handleUpdate('menu1', menu1)}>Change</button>
            </Inputcontainer>
            <Inputcontainer>
              <p>Menu 2</p>
              <input type="text" value={menu2} onChange={(e) => setMenu2(e.target.value)} />
              <button onClick={() => handleUpdate('menu2', menu2)}>Change</button>
            </Inputcontainer>
            <Inputcontainer>
              <p>Menu 3</p>
              <input type="text" value={menu3} onChange={(e) => setMenu3(e.target.value)} />
              <button onClick={() => handleUpdate('menu3', menu3)}>Change</button>
            </Inputcontainer>
            <Inputcontainer>
              <p>Production 1</p>
              <input type="text" value={prod1} onChange={(e) => setProd1(e.target.value)} />
              <button onClick={() => handleUpdate('prod1', prod1)}>Change</button>
            </Inputcontainer>
            <Inputcontainer>
              <p>Production 2</p>
              <input type="text" value={prod2} onChange={(e) => setProd2(e.target.value)} />
              <button onClick={() => handleUpdate('prod2', prod2)}>Change</button>
            </Inputcontainer>
          </Container>
        </>
      )}
    </>
  );
}

export default Prod1;
