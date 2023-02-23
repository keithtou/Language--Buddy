import "./App.css";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/signIn/signIn";
import SignUp from "./components/signUp/signUp";
import Profile_created from "./components/profile_created/profile_created";
import BasicExample from "./components/SendRequest/BasicExample ";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile_created" element={<Profile_created />} />
        <Route path="/send_req" element={<BasicExample />} />
      </Routes>
    </div>
  );
}

export default App;
