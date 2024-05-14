import React, { useState } from 'react';
import { HeaderContainer, Navigation, Logo, SocialMediaButton, StyledNavLink, IconButton, LoginButton } from './Header.Styles.js';
import { FaFacebookF, FaTwitter, FaInstagram, FaRegSun, FaRegMoon } from 'react-icons/fa';
import { useTheme } from './ThemeContext.jsx'; 
import Auth from "../utils/auth";
import LoginFormModal from './LogIn.jsx'; 
import SignUpFormModal from './SignUp.jsx';

const Header = () => {
  const { toggleTheme, theme } = useTheme();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleSignupClick = () => {
    setShowSignUpModal(true);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
  };

  const handleCloseSignup = () => {
    setShowSignUpModal(false);
  };

  const handleLogOut = () => {
    Auth.logout();
  };

  const socialMedia = () =>{
    return(<div>
      <SocialMediaButton href="https://www.facebook.com" target="_blank" aria-label="Facebook">
        <FaFacebookF />
          </SocialMediaButton>
          <SocialMediaButton href="https://www.twitter.com" target="_blank" aria-label="Twitter">
            <FaTwitter />
          </SocialMediaButton>
          <SocialMediaButton href="https://www.instagram.com" target="_blank" aria-label="Instagram">
        <FaInstagram />
      </SocialMediaButton>
    </div>)
  }

  if (Auth.loggedIn()){
    return ( 
      <HeaderContainer>
        <Logo>GameNonStop</Logo>
        <Navigation>
          <StyledNavLink to="/">Home</StyledNavLink> 
          <StyledNavLink to="/WishList">Wish List</StyledNavLink> 
          <StyledNavLink to="/cart">My Cart</StyledNavLink>
          <LoginButton onClick={handleLogOut}>Log Out</LoginButton>
        <LoginFormModal show={showLoginModal} onClose={handleCloseLogin} />
        <SignUpFormModal show={showSignUpModal} onClose={handleCloseSignup} />
        </Navigation>
        <IconButton onClick={toggleTheme}>
        {theme === 'light' ? <FaRegMoon size={24} /> : <FaRegSun size={24} />} 
        </IconButton>
        {socialMedia()}
      </HeaderContainer>
    )     
    }else{
      return ( 
        <HeaderContainer>
          <Logo>GameNonStop</Logo>
          <Navigation>
            <LoginButton onClick={handleLoginClick}>Log In</LoginButton>
            <LoginButton onClick={handleSignupClick}>Register</LoginButton>
          <LoginFormModal show={showLoginModal} onClose={handleCloseLogin} />
          <SignUpFormModal show={showSignUpModal} onClose={handleCloseSignup} />
          </Navigation>
          <IconButton onClick={toggleTheme}>
            {theme === 'light' ? <FaRegMoon size={24} /> : <FaRegSun size={24} />} 
          </IconButton>
            {socialMedia()}
        </HeaderContainer>
      )     
    }
  
};

export default Header;

