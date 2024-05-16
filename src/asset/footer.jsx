import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem; /* Adjust as needed */
`;

const Footer = styled.footer`
  text-align: left;
  border: 1px solid white;
  margin-top: 2rem; /* Adjust as needed */
  padding-top: 1rem;
`;

const Contact = styled.div`
text-align:left;
`


function MyFooter() {
  return (
    <Container>
      <Footer>
        <Contact>
       <li>Contact</li>
       <li>34 Rue Georges Boisseau</li>
       <li>boitamomes@gmail.com</li>
       <li> +33(0)6.64.43.80.62</li>
       </Contact>
      </Footer>
    </Container>
  );
}

export default MyFooter;
