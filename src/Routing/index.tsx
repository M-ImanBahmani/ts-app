import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Posts from "../Pages/Posts";
import ContactUs from "../Pages/Contact-Us";
import AboutUs from "../Pages/Abous-Us";
import Login from "../Pages/Login/Login";
import AppLayout from "../components/AppLayout";
import ResetPassword from "../Pages/Reset-Pass/ResetPass";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Profile from "../Pages/Profile";
import Counter from "../Pages/counter";
import Products from "../Pages/Producs";
import Cart from "../Pages/Cart";


function Routing() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-Pass" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/app/home" />} />

      <Route
        path="/app"
        element={
          <ProtectedRoutes>
            <AppLayout />
          </ProtectedRoutes>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="posts" element={<Posts />} />
        <Route path="products" element={<Products />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="counter" element={<Counter />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}
export default Routing;
