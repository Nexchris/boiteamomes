import React from 'react';
import styled from 'styled-components';
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const Icon = styled.div`
  font-size: 24px;
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
      <IconContainer>
        <Icon><AiOutlineHome /></Icon>
        <Icon><AiOutlineInfoCircle /></Icon>
        <Icon><AiOutlineMail /></Icon>
        <Icon><AiOutlinePhone /></Icon>
      </IconContainer>
      <Copyright>&copy; 2024 Boite a momes. Tous droits réservés.</Copyright>
    </FooterContainer>
  );
}

export default Footer;

