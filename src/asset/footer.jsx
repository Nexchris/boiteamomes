import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ref, getDownloadURL } from 'firebase/storage'; // Assurez-vous d'importer ces fonctionnalités depuis la bonne bibliothèque Firebase
import { storage } from '../firebaseConfig'; // Assurez-vous que le chemin est correct

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 2vh;
  text-align: center;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Copyright = styled.p`
  font-size: 14px;
`;

const Footer = () => {
  const [firstIcon, setFirstIcon] = useState('');
  const [secondIcon, setSecondIcon] = useState('');
  const [thirdIcon, setThirdIcon] = useState('');
  const [fourthIcon, setFourthIcon] = useState('');

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const firstRef = ref(storage, 'socialicons/fblogo.png');
        const firstUrl = await getDownloadURL(firstRef);
        setFirstIcon(firstUrl);

        const secondRef = ref(storage, 'socialicons/twlogo.png');
        const secondUrl = await getDownloadURL(secondRef);
        setSecondIcon(secondUrl);

        const thirdRef = ref(storage, 'socialicons/ytlogo.png');
        const thirdUrl = await getDownloadURL(thirdRef);
        setThirdIcon(thirdUrl);

        const fourthRef = ref(storage, 'socialicons/inlogo.png');
        const fourthUrl = await getDownloadURL(fourthRef);
        setFourthIcon(fourthUrl);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    fetchIcons();
  }, []);

  return (
    <FooterContainer>
      <IconContainer>
        {/* Affichage des logos */}
        <a href="https://www.facebook.com/BoitAMomes/">
        <Icon src={firstIcon} alt="Facebook Logo" />
        </a>

        <a href="https://twitter.com/boitamomes/">
        <Icon src={secondIcon} alt="Twitter Logo" />
        </a>

        <a href="https://www.youtube.com/user/boitamomes">
        <Icon src={thirdIcon} alt="YouTube Logo" />
        </a>

        <a href="https://www.linkedin.com/company/la-boite-a-momes/">
        <Icon src={fourthIcon} alt="LinkedIn Logo" />
        </a>

      </IconContainer>
      <Copyright>&copy; 2024 Boite a momes. Tous droits réservés.</Copyright>
    </FooterContainer>
  );
}


export default Footer;
