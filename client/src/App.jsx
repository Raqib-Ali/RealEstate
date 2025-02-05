import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import About from "./Pages/About";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import { PrivateRoute } from "./Components/privateroute";
import CreateListing from "./Pages/createListing";
import UpdateListing from "./Pages/updateListing";
import { Listing } from "./Pages/listing";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/listing/:id" element={<Listing/>} />
          <Route element={<PrivateRoute />}>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/createListing" element={<CreateListing />} />
            <Route path="/update/:id" element={<UpdateListing/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}