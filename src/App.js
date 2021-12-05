import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./Routes/Home";

function App() {
  return (
    <Router>
      <Header></Header>
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<Home></Home>} />
      </Routes>
    </Router>
  );
}

export default App;
