import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./component/login";
import Register from "./component/register";
import Dashboard from "./component/dashboard";
import PostSurat from "./component/PostSurat";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<PostSurat />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
