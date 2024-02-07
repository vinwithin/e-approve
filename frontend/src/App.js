import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import "./index.css";
import Login from "./component/login";
import Register from "./component/register";
import Dashboard from "./component/dashboard";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
