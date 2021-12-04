import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";

function App() {
  return (
    <Router>
      <Header></Header>
      <Sidebar></Sidebar>
      <Routes></Routes>
    </Router>
  );
}

export default App;
