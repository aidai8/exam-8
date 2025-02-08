import './App.css'
import {Container} from "@mui/material";
import NavBar from "./components/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import Quotes from "./Containers/Quotes/Quotes.tsx";
import NewQuote from "./Containers/NewQuote/NewQuote.tsx";

const App = () => {

  return (
    <>
      <header>
        <NavBar/>
      </header>
      <Container maxWidth="lg">
        <Routes>
            <Route path="/" element={<Quotes/>}/>
            <Route path="/quotes" element={<Quotes/>}/>
            <Route path="/add-quote" element={<NewQuote/>}/>
            <Route path="*" element={(<h1>Page Not Found</h1>)}/>
        </Routes>
      </Container>
    </>
  )
};

export default App
