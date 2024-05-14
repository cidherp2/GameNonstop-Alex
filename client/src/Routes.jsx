import { Routes, Route } from "react-router-dom";
import Layout from "./assets/components/Layout";
import Games from "./assets/components/Games";
import Cart from "./assets/components/Cart";
import Whishlist from "./assets/components/Wishlist";
import Footer from "./assets/components/Footer";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<><Games /><Footer /></>} />
          <Route path="cart" element={<><Cart /><Footer /></>} />
        <Route path="Wishlist" element={<Whishlist />} />
      </Route>
    </Routes>
);
}
export default AppRoutes;

