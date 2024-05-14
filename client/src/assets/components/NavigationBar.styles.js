import styled from "styled-components";

export const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => (theme === "light" ? "#fff" : "#333")};
  color: ${({ theme }) => (theme === "light" ? "#333" : "#fff")};
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const NavigationLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  a {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => (theme === "light" ? "#007bff" : "#4da3ff")};
    }
  }
`;
