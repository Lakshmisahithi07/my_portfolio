import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 25px 0;
  background: #121111;
  font-weight: 300;
  color: beige;

  p {
    margin: 0;
    font-size: 16px;

    i {
      margin: 0 5px;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        Copyright © Sahithi <i className="fa-solid fa-heart" style={{ color: '#fe0101' }}></i>
      </p>
    </FooterContainer>
  );
};

export default Footer;
