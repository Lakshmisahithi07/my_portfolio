import React, { useState } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: left;
  align-items: center;
  background: url('/image/image4.jpg') no-repeat right center;
  background-size: contain; /* keep image on right, not full */
  background-color: #000;   /* fill remaining space with black */
`;

const Container = styled.div`
  padding: 10px 10%;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Logo = styled.img`
  width: 140px;
  position: absolute;
  top: 0;
  left: 0;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  transition: all 0.3s ease;

  @media only screen and (max-width: 600px) {
    background: #ff004f;
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-200px'};
    width: 200px;
    height: 100vh;
    padding-top: 50px;
    flex-direction: column;
    z-index: 1000;
  }
`;

const NavItem = styled.li`
  margin: 10px 20px;

  @media only screen and (max-width: 600px) {
    margin: 25px;
  }
`;

const NavLink = styled.a`
  color: aliceblue;
  text-decoration: none;
  font-size: 18px;
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    width: 0;
    height: 3px;
    background: #ff004f;
    position: absolute;
    left: 0;
    bottom: -6px;
    transition: 0.5s;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MenuIcon = styled.i`
  display: none;
  font-size: 25px;
  color: white;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const CloseIcon = styled.i`
  position: absolute;
  top: 25px;
  left: 25px;
  font-size: 25px;
  color: white;
  cursor: pointer;
  display: none;

  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const HeaderText = styled.div`
  margin-top: 15%;
  font-size: 30px;
  max-width: 60%; /* give more space so heading fits in one line */

  h1 {
    font-size: 40px;
    margin-top: 20px;
    white-space: nowrap; /* keep heading in one line on desktop */

    span {
      color: #ff004f;
    }
  }

  @media only screen and (max-width: 900px) {
    max-width: 70%;
  }

  @media only screen and (max-width: 600px) {
    margin-top: 30%;
    font-size: 16px;
    max-width: 100%;

    h1 {
      font-size: 30px;
      white-space: normal; /* allow wrapping on small screens */
    }
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <HeaderContainer id="header">
      <Container>
        <Nav>
          <Logo src="/image/image6.png" alt="Logo" />
          <NavList isOpen={isMenuOpen}>
            <NavItem>
              <NavLink onClick={() => scrollToSection('header')}>HOME</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => scrollToSection('about')}>ABOUT</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => scrollToSection('certifications')}>CERTIFICATIONS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => scrollToSection('contact')}>CONTACT</NavLink>
            </NavItem>
            <CloseIcon className="fas fa-times" onClick={closeMenu} />
          </NavList>
          <MenuIcon className="fas fa-bars" onClick={toggleMenu} />
        </Nav>
        <HeaderText>
          <p>Frontend Developer</p>
          <h1>HI, I'm Lakshmi Sahithi <span>Akkireddi</span></h1>
        </HeaderText>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
