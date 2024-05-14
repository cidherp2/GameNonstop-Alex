import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext'; 
import { NavBarContainer, NavigationLinks } from './NavigationBar.styles';

const NavigationBar = () => {
  const { theme } = useTheme(); 

  return (
    <NavBarContainer theme={theme}>
      <Link to="/">Home</Link>
      <NavigationLinks theme={theme}>
        <Link to="/wishlist">Wish List</Link>
        <Link to="/contact">Contact</Link>
      </NavigationLinks>
      <div>
        {/* Contenido a la derecha, como botones de login */}
      </div>
    </NavBarContainer>
  );
};

export default NavigationBar;
