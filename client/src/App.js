import { Routes, Route } from "react-router-dom"
import Header from "./components/header"
import Cafe from "./pages/cafe"
import Employee from "./pages/employee"
import CreateCafe from "./pages/createcafe"

function App() {
  return (<>
    <Header></Header>
    <main>
    <Routes>
      <Route path="/" element={<Cafe/>}></Route>
      <Route path="/cafes" element={<Cafe/>}></Route>
      <Route path="/createcafe" element={<CreateCafe/>}></Route>
      <Route path="/employees" element={<Employee/>}></Route>
    </Routes>
    </main>
  </>

  );
}

export default App;
