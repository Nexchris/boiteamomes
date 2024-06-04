import React from 'react';
import styled, { keyframes } from 'styled-components';

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
  background-color:black;
  justify-content: space-between;
  padding: 2rem;
  animation: ${fadeIn} 2s;
`;

const Form = styled.form`
  width: 45%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 8px;
`;

const CinebamForm = styled.form`
  width: 45%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  height: 10rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem;
  font-size: 1rem;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

function Contact() {
  return (
    <ContactContainer>
      <CinebamForm>
        <h2>CinéBAM</h2>
        <Input type="text" placeholder="Nom" required />
        <Input type="email" placeholder="Adresse Email" required />
        <TextArea placeholder="Message" required />
        <SubmitButton type="submit">Envoyer</SubmitButton>
      </CinebamForm>

      <Form>
        <h2>Boite à Momes</h2>
        <Input type="text" placeholder="Nom" required />
        <Input type="email" placeholder="Adresse Email" required />
        <TextArea placeholder="Message" required />
        <SubmitButton type="submit">Envoyer</SubmitButton>
      </Form>
    </ContactContainer>
  );
}

export default Contact;
