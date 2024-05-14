import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderContainer = styled.header /*style*/`
  background-image: url('https://media.rawg.io/media/games/062/06285b425e61623530c5430f20e5d222.jpg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5rem;
  color: ${({ theme }) => theme.text};
  border: solid 1px black;
  border-radius: 6px;
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 2rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SocialMediaButton = styled.a`
  color: white;
  margin: 0 10px;
  font-size: 2rem;
  transition: color 0.3s ease;
  align-items: end;

  &:hover {
    color: #ccc;
  }
`;

export const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin-right: 10px;
  font-weight: bold;

  &.active {
    border-bottom: 2px solid white;
  }

  &:hover {
    color: #ccc;
  }
`;

export const Logo = styled.h1`
  font-size: 2rem;
  cursor: pointer;
`;
export const LoginButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;
export const IconButton = styled.button`
  background-color: gray;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }

  &:focus {
    outline: none;
  }
`;
