import "./App.css";
import "./material-theme/css/light.css";
import "./material-theme/css/dark.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Authenticate/SignIn";
import Signup from "./components/Authenticate/SignUp";
import Main from "./components/Main";
import { DataProvider } from "./context/data";

import { AuthProvider } from "./context/loginStatus";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
