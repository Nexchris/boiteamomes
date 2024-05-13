import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Maintext = styled.div`
  font-size: 2.5vh;
  margin-left: 60vh;
  width: 40%;
  text-align: center;
`;


const Container = styled.div`
background-color: royalblue;
  width: 100vw;

`;

const Mainscreen = styled.div`
background-color: royalblue;
  width: 100vw;
  height:100vh;

`;

const Back = styled.div`
margin-left:5vh;
width:10vh;
font-size:5vh;
font-weight:600;

&:hover{
color:white;
cursor: pointer;
}
`

const Maintitle = styled.h1`
  font-size: 15vh;
  margin:0;
  margin-left: 40vh;
  margin-bottom:10vh;
  padding-top: 25vh;
`;

const Secondtitle = styled.h2`
  font-size: 10vh;
  margin:0;
  margin-left: 70vh;

`;


const Thirdtitle = styled.h2`
  font-size: 10vh;
  margin:0;
  margin-left: 85vh;

`;
const Squarecontainer = styled.div`
display:flex;
`

const Square = styled.div`
width:30vw;
height:30vh;
margin-right:1vh;
margin-left:5vh;
background-color: aquamarine;
`

const Rectangle = styled.div`
width:70vw;
height:80vh;
margin-top:20vh;
margin-right:5vh;
margin-left:35vh;
margin-bottom:5vh;
background-color: aquamarine;
`
const Button = styled.button`
  font-size: 5vh;
  color: black;
  background-color: white;
  margin-left: 85vh;
  border: none; /* Retire le bord existant */
  border-radius: 10px; /* Ajoute un border radius de 10px */
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1); /* Ajoute une ombre transparente pour simuler le border transparent */
`;



function Offer() {
  return (
    <Container>
<Mainscreen>
<Link to="/">
        <Back>Retour</Back>
        </Link>
        <Maintitle>Exemples d'Offre</Maintitle>
        <Maintext>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda quae esse facere architecto quaerat odio molestiae quidem. Minus incidunt vitae a aliquam impedit accusantium voluptas quibusdam explicabo, voluptatibus fugit reiciendis.</Maintext>
</Mainscreen>
<Rectangle>Video</Rectangle>
        
        <Squarecontainer>
        <Square>Image</Square>
        <Square>Image</Square>
        <Square>Image</Square>
        <Square>Image</Square>
        </Squarecontainer>
        <br />
        <br />
        <Thirdtitle>Details</Thirdtitle>
        <Maintext>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda quae esse facere architecto quaerat odio molestiae quidem. Minus incidunt vitae a aliquam impedit accusantium voluptas quibusdam explicabo, voluptatibus fugit reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores numquam nisi, mollitia alias, temporibus, asperiores aut nam voluptatem reprehenderit assumenda quibusdam. Perferendis facilis dignissimos ipsum, inventore voluptatum laborum at tenetur!</Maintext>
        
        <br />
        <br />
        <Button>Inscrivez vous</Button>
        <br />
        <br />
        <br />
        


  
    </Container>
  );
}

export default Offer;
