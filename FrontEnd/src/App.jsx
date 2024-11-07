import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import User from "./pages/User/User";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = () => {
  

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<Navigate to="/" />} />
        token ? (
        <Route path="/profile" element={<User />} />
        ) : (
        <Route path="/profile" element={<Navigate to="/signin" />} />)
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
