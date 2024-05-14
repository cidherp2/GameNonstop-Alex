import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
    font-family: Arial;
    padding-right: 1rem;
    padding-left: 1rem;
    overflow: scroll;
    margin: 0;
  }
`


export default GlobalStyles;
