import "./App.css";
import "react-tooltip/dist/react-tooltip.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shop from "./pages/shop";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Shop />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
