import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaArrowUp } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #1F1F1F; 
  color: white; 
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  color: white;
`;

const ScrollToTop = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterContainer>
      <FooterNav>
        <a href="/">Home</a>
        <a href="/about">Wish list</a>
        <a href="./Cart.jsx">cart</a>
        <a href="/contact">Contact</a>
      </FooterNav>
      <SocialLinks>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size="1.5em" /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size="1.5em" /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size="1.5em" /></a>
      </SocialLinks>
      <ScrollToTop onClick={scrollToTop}>
        <FaArrowUp size="1.5em" />
      </ScrollToTop>
      <div>Game non Stop © 2023</div>
    </FooterContainer>
  );
};

export default Footer;
