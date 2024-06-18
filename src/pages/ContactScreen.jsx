import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import emailjs from 'emailjs-com';
import Footer from '../asset/footer';
import Test from '../images/test.jpg';
import Header from '../asset/Header';
import Test2 from '../images/test2.jpg';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ContactContainer = styled.div`
  display: flex;
  animation: ${fadeIn} 2s;
`;

const FormContainer = styled.div`
  height: 68vh;
  width: 50%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  @media (max-width: 500px) {
    height: auto;
    width: auto;
    position: relative;

  }
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  @media (max-width: 500px) {
   display: block;
   margin-bottom: 0;
   text-align:center;
  }
  
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 1vw;
  font-family: 'Poppins';
  border: 1px solid #000;
  @media (max-width: 500px) {
    margin-bottom: 2vh;
   }
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  height: 30vh;
  width: 47vw;
  font-family: 'Poppins';
  @media (max-width: 500px) {
    width: 80vw;
    height: 40vh;
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 1vh;
  margin-left: 14vw;
  width: 20vw;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Poppins';

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 500px) {
    margin-left: 10vw;
    width: 65vw
  }
`;

const Title = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: xx-large;
`;

const Button = styled.button`
  width: fit-content;
  font-size: xx-large;
  font-weight: 400;
  border: none;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3vh;
  @media (max-width: 500px) {
    margin-top: 10vh;
  }
`;

function Contact() {
  const [showCBForm, setShowCBForm] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [backgroundImage, setBackgroundImage] = useState(Test2); // Définir l'image de fond initiale

  const toggleForm = () => {
    setShowCBForm(!showCBForm);
    setBackgroundImage(showCBForm ? Test : Test2);
  };

  const LeftContainer = styled.div`
    height: auto;
    background-image: url(${backgroundImage});
    background-size: cover;
    width: 50vw;
    animation: ${fadeIn} 2s;
    @media (max-width: 500px) {
      display: none; }
  `;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      first_name: formData.firstName,
      last_name: formData.lastName,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      form_name: showCBForm ? 'CBForm' : 'BAMForm'
    };

    const templateId = showCBForm ? 'template_9pqmfdc' : 'template_q01f6ss'; // IDs de vos modèles

    emailjs.send(
      'service_b1w4wqu', // Remplacez par votre ID de service EmailJS
      templateId, // Sélection dynamique du modèle
      templateParams,
      '0uk0STjROFDlPMJ_C' // Remplacez par votre ID utilisateur EmailJS
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Message envoyé!');
    }, (error) => {
      console.log('FAILED...', error);
      alert(`Erreur lors de l'envoi du message: ${error.text}`);
    });
  };

  return (
    <>
      <Header />
      <ContactContainer>
        <LeftContainer />
        {showCBForm ? (
          <FormContainer>
            <Center>
              <Button onClick={toggleForm}>Boite à Momes</Button>
              <Title>CinéBAM</Title>
            </Center>
            <form onSubmit={handleSubmit}>
              <FormRow>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Nom de famille"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </FormRow>
              <FormRow>
                <Input
                  type="email"
                  name="email"
                  placeholder="Mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Téléphone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </FormRow>
              <TextArea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <SubmitButton type="submit">Envoyer</SubmitButton>
            </form>
          </FormContainer>
        ) : (
          <FormContainer>
            <Center>
              <Button onClick={toggleForm}>Cinébam</Button>
              <Title>Boite à Momes</Title>
            </Center>
            <form onSubmit={handleSubmit}>
              <FormRow>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Nom de famille"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </FormRow>
              <FormRow>
                <Input
                  type="email"
                  name="email"
                  placeholder="Adresse Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Téléphone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </FormRow>
              <TextArea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <SubmitButton type="submit">Envoyer</SubmitButton>
            </form>
          </FormContainer>
        )}
      </ContactContainer>
      <Footer />
    </>
  );
}

export default Contact;
