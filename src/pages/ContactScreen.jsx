import styled from 'styled-components';
import React, { useState } from 'react';
import { firestore } from '../firebaseConfig';
import { storage } from '../firebaseConfig'; 
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Imagetemplate from '../images/image.png';
import Imagetemplate2 from '../images/image2.png';
import { Link } from 'react-router-dom';
import Header from '../asset/header';
import Footer from '../asset/footer';
import { InView } from 'react-intersection-observer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const IntroText = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
`;

const Address = styled.address`
  text-align: center;
  margin-bottom: 20px;
  font-style: normal;
  line-height: 1.6;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
`;

function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.name) {
      validationErrors.name = 'Vous devez entrer votre nom.';
    }
    if (!formData.email) {
      validationErrors.email = 'Vous devez entrer votre adresse email.';
    }
    if (!formData.message) {
      validationErrors.message = 'Vous devez entrer un message.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle form submission here
      console.log(formData);
      setErrors({});
    }
  };

  return (
    <>
      <Header />
      <Container>
        <IntroText>
          Association La Boîte à Mômes<br />
          34, rue Georges Boisseau<br />
          92110 Clichy-la-Garenne<br />
          <a href="mailto:boitamomes@gmail.com">boitamomes@gmail.com</a><br />
          T. : +33(0)6.64.43.80.62
        </IntroText>
        <Address>
          Une question ? Un projet ? Une demande ?<br />
          Remplissez le formulaire ci-dessous. L'équipe de la Boîte à Mômes sera ravie de vous répondre dans les meilleurs délais et vous remercie, par avance, de l'intérêt que vous lui portez.
        </Address>
        <Title>Contactez-nous</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">Nom</Label>
          <Input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          <Label htmlFor="email">Email</Label>
          <Input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <Label htmlFor="message">Message</Label>
          <TextArea 
            id="message" 
            name="message" 
            rows="5" 
            value={formData.message} 
            onChange={handleChange} 
          />
          {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          <Button type="submit">Envoyer</Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}

export default ContactScreen;
