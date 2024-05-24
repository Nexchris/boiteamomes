import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MDBIcon } from 'mdb-react-ui-kit';
import BAM from '../images/logo.png';
import { storage } from '../firebaseConfig'; // Assurez-vous que le chemin est correct
import { ref, getDownloadURL } from "firebase/storage";

// Styled components
const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  padding: 20px 0;
  display: flex;
`;

const Zone = styled.div`
  margin-right: 10vw;
`;

const SocialZone = styled(Zone)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 4vw;
`;

const SocialIcon = styled(Zone)`
  width: 30px;
  height: 30px;
  background-color: white;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const AboutZone = styled(Zone)``;

const ContactZone = styled(Zone)``;

const NewsletterZone = styled(Zone)`
  display: flex;
  align-items: center;
`;

const Flexicons = styled.div`
  display: flex;
`;

const NewsletterColumn = styled.div`
  flex-direction: column;
`;

const NewsletterInput = styled.input`
  padding: 5px;
  border: none;
  width: 20vw;
  height: 5vh;
  margin-right: 0;
  border-radius: 50px;
`;

const ConfirmButton = styled.button`
  padding: 5px 10px;
  width: 10vw;
  height: 6vh;
  margin-right: 0;
  border-radius: 0;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

// Footer component

const Footer = () => {
  const [firstIcon, setFirstIcon] = useState('');
  const [secondIcon, setSecondIcon] = useState('');
  const [thirdIcon, setThirdIcon] = useState('');
  const [fourthIcon, setFourthIcon] = useState('');

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const firstRef = ref(storage, 'socialicons/facebookicon.png');
        const firstUrl = await getDownloadURL(firstRef);
        setFirstIcon(firstUrl);

        const secondRef = ref(storage, 'socialicons/twittericon.png');
        const secondUrl = await getDownloadURL(secondRef);
        setSecondIcon(secondUrl);

        const thirdRef = ref(storage, 'socialicons/mailicon.png');
        const thirdUrl = await getDownloadURL(thirdRef);
        setThirdIcon(thirdUrl);

        const fourthRef = ref(storage, 'socialicons/linkedinlogo.png');
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
      <SocialZone>
        <img src={BAM} alt="BAM Logo" />
        <Flexicons>
          {firstIcon && (
            <SocialIcon>
              <img src={firstIcon} alt="Facebook Icon" style={{ width: '100%', borderRadius: '50%' }} />
            </SocialIcon>
          )}
          {secondIcon && (
            <SocialIcon>
              <img src={secondIcon} alt="Twitter Icon" style={{ width: '100%', borderRadius: '50%' }} />
            </SocialIcon>
          )}
          {thirdIcon && (
            <SocialIcon>
              <img src={thirdIcon} alt="Mail Icon" style={{ width: '100%', borderRadius: '50%' }} />
            </SocialIcon>
          )}
          {fourthIcon && (
            <SocialIcon>
              <img src={fourthIcon} alt="LinkedIn Icon" style={{ width: '100%', borderRadius: '50%' }} />
            </SocialIcon>
          )}
        </Flexicons>
      </SocialZone>

      <AboutZone>
        <h4>À propos</h4>
        <ul>
          <li>Qui sommes nous ?</li>
          <li>Contact</li>
          <li>FAQ</li>
        </ul>
      </AboutZone>

      <ContactZone>
        <h4>Contact</h4>
        <ul>
          <li>34 rue Georges Boisseau</li>
          <li>boiteàmomes@gmail.com</li>
          <li>+33(0)6.64.43.80.62</li>
        </ul>
      </ContactZone>

      <NewsletterZone>
        <NewsletterColumn>
          <h1>Newsletter</h1>
          <h2>Lororieinsso</h2>
        </NewsletterColumn>
        <NewsletterInput type="email" placeholder="Votre adresse e-mail" />
        <ConfirmButton>Confirmer</ConfirmButton>
      </NewsletterZone>
    </FooterContainer>
  );
};

export default Footer;