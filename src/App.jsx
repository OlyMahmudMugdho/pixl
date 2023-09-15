import Default from "./components/home/Default";
import HomePage from "./pages/HomePage";
import '../dist/style.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/forms/SignUp";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Default/>}>
            
          </Route>
          <Route path="home" element={<HomePage />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
