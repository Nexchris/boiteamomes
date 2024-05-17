import React from 'react';
import styled from 'styled-components';
import { MDBIcon } from 'mdb-react-ui-kit';
import BAM from '../images/logo.png';

// Styled components
const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  padding: 20px 0;
  display:flex;
`;

const Flexzone = styled.div`

`;



const Zone = styled.div`
  margin-right: 10vw; /* "margin-right" correctement orthographié */
`;

const SocialZone = styled(Zone)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 4vw;
`;

const SocialIcon = styled(Zone)` /* Utilisation correcte de la zone stylée */
  width: 30px;
  height: 30px;
  background-color: white;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const AboutZone = styled(Zone)` /* Utilisation correcte de la zone stylée */
`;

const ContactZone = styled(Zone)` /* Utilisation correcte de la zone stylée */
`;

const NewsletterZone = styled(Zone)` /* Utilisation correcte de la zone stylée */
  display: flex; /* "flow" remplacé par "flex" */
  align-items: center;
`;

const Flexicons = styled.div`
display:flex;
`;


const NewsletterColumn = styled.div`
flex-direction: column;
`;

const NewsletterInput = styled.input`
  padding: 5px;
  border:none;
  width:20vw;
  height:5vh;
  margin-right: 0;
  border-radius: 50;

`;

const ConfirmButton = styled.button`
  padding: 5px 10px;
  width:10vw;
  height:6vh;
  margin-right: 0;
  border-radius: 0;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

// Footer component
const Footer = () => {
  return (
    <FooterContainer>



        <SocialZone>
        <img src={BAM} alt="" />
        <Flexicons>
          <SocialIcon><MDBIcon fab icon="facebook-f" /></SocialIcon>
          <SocialIcon><MDBIcon fab icon="twitter" /></SocialIcon>
          <SocialIcon><MDBIcon fab icon="instagram" /></SocialIcon>
          <SocialIcon><MDBIcon fab icon="linkedin-in" /></SocialIcon>
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

      {/* Newsletter Zone */}
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
