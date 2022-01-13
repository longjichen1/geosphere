import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Nasa from './components/Nasa';
import Welcome from './components/Welcome';
function App() {
  
  document.body.style.backgroundColor='black';
  return (
    <>
      <Nav className="absolute top-0 left-0 right-0 bottom-0"/>
      <Welcome/>
    </>
    
    
  );
}

export default App;
