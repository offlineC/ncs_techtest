import { Routes, Route } from "react-router-dom"
import Header from "./components/header"
import Cafe from "./pages/cafe"
import Employee from "./pages/employee"
import CreateCafe from "./pages/createcafe"
import EditCafe from "./pages/editcafe"
import { CssBaseline, ThemeProvider, createTheme,} from '@mui/material';

function App() {
  const defaultTheme = createTheme();
  return (<>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header></Header>
      <main style={{ maxWidth: '100%' }}>
        <Routes>
          <Route path="/" element={<Cafe />}></Route>
          <Route path="/cafes" element={<Cafe />}></Route>
          <Route path="/createcafe" element={<CreateCafe />}></Route>
          <Route path="//editcafe/" element={<EditCafe />}></Route>
          <Route path="/employees" element={<Employee />}></Route>
        </Routes>
      </main>
    </ThemeProvider>
  </>

  );
}

export default App;
