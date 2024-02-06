import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import CreatePost from './Components/CreatePost';
import { auth } from './FirebaseAuthentication';
import { signOut } from 'firebase/auth';
import EditPost from './Components/EditPost';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false);
        window.location.pathname = "/login"
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });
  };

  return (
    <>
      <Router>
        <nav className='Navbar'>
          <Link to="/" className='routing'>Home</Link>

          {!isAuth ? (
            <Link to="/login" className='routing'>Login</Link>
          ) : (
            <>
              <Link to="/create" className='routing'> Create</Link>
              <button onClick={signUserOut} className='logoutButton'>Log Out</button>
            </>
          )}
        </nav>
        <Routes>
          <Route path='/' element={<Home isAuth={isAuth}/>} />
          <Route path='/create' element={<CreatePost isAuth = {isAuth}/>} />
          <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
          <Route path='/edit/:postId' element={<EditPost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
