import { Routes, Route } from "react-router-dom"
import Header from "./components/header"
import Cafe from "./pages/cafe"
import Employee from "./pages/employee";
function App() {
  return (<>
    <Header></Header>
    <main>
    <Routes>
      <Route path="/" element={<Cafe/>}></Route>
      <Route path="/cafes" element={<Cafe/>}></Route>
      <Route path="/employees" element={<Employee/>}></Route>
      <Route path="/cafe" element={<Cafe/>}></Route>
    </Routes>
    </main>
  </>

  );
}

export default App;
