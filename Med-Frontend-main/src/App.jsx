import { Routes, Route } from "react-router-dom"; // Import Routes and Route correctly
import UserAuthForm from "./pages/userAuthForm.page"; // Ensure UserAuthForm is imported
import Home from "./pages/home";
import UserInterface from "./pages/UserInterface";

const App = () => {
  return (
    <Routes>
      {/* Parent Route: Navbar will be shown for all routes */}
      <Route path="/" element={<Home />}></Route>
        {/* Child Routes */}
        <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="signup" element={<UserAuthForm type="sign-up" />} />
        <Route path="UserInterface" element={<UserInterface />} />
      
    </Routes>
  );
};

export default App;
