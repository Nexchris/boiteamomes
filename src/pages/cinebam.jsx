import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../asset/header'

const Maintext = styled.div`
  font-size: 2.5vh;
  margin-left: 60vh;
  width: 40%;
  text-align: center;
`;


const Container = styled.div`
  background-color: teal;
  width: 100vw;

`;

const Mainscreen = styled.div`
background-color: teal;
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
  font-size: 20vh;
  margin:0;
  margin-left: 58vh;
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
  margin-left: 90vh;

`;
const Squarecontainer = styled.div`
display:flex;
`

const Square = styled.div`
width:30vw;
height:50vh;
margin-right:5vh;
margin-left:5vh;
background-color: aquamarine;
`

const Rectangle = styled.div`
width:70vw;
height:80vh;
margin-top:20vh;
margin-right:5vh;
margin-left:35vh;
background-color: aquamarine;
`




function Cinebam() {
  return (
    <Container>
<Header/>
<Mainscreen>
<Link to="/">
        <Back>Retour</Back>
        </Link>
        <Maintitle>CINEBAM</Maintitle>
        <Maintext>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda quae esse facere architecto quaerat odio molestiae quidem. Minus incidunt vitae a aliquam impedit accusantium voluptas quibusdam explicabo, voluptatibus fugit reiciendis.</Maintext>
</Mainscreen>
        <Secondtitle>Production</Secondtitle>
        <Squarecontainer>
        <Square>Image</Square>
        <Square>Image</Square>
        <Square>Image</Square>
        </Squarecontainer>
        <br />
        <br />
        <Thirdtitle>H2</Thirdtitle>
        <Squarecontainer>
        <Square>Image</Square>
        <Square>Image</Square>
        <Square>Image</Square>
        </Squarecontainer>
        <Rectangle>Video</Rectangle>
        <br />
        <br />
        <br />
        


  
    </Container>
  );
}

export default Cinebam;
