import "./styles/App.css";
import "./material-theme/css/light.css";
import "./material-theme/css/dark.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Authentication/SignIn";
import Signup from "./components/Authentication/SignUp";
import Main from "./components/Main";
import { DataProvider } from "./context/data";
import { StylingProvider } from "./context/styling";
import { AuthProvider } from "./context/loginStatus";
import {EventDetail} from "./components/Events"

function App() {
  return (
    <StylingProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Router>
        </DataProvider>
      </AuthProvider>
    </StylingProvider>
  );
}

export default App;
