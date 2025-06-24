// import React, { useState } from 'react'
// import RegisterForm from './components/RegisterForm.jsx'
// import LoginForm from './components/LoginForm.jsx'
// import { Routes, Route } from 'react-router-dom'
// import BusList from './components/BusList.jsx'

// const App = () => {

//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [userId, setUserId] = useState(localStorage.getItem('userId'));


// const handleLogin = (token, userId) => {
//   localStorage.setItem('token', token);
//   localStorage.setItem('userId', userId);

// }

//   return (
//     <div>
//       <Routes>
//         <Route path='/' element={<BusList/>}/>
//         <Route path="/register" element={<RegisterForm />} />
//         <Route path="/login" element={<LoginForm onLogin = {handleLogin}/>} />
//       </Routes>
    
//   </div>
//   )
// }

// export default App  



// import React, { useState } from 'react'
// import RegisterForm from './components/RegisterForm.jsx'
// import LoginForm from './components/LoginForm.jsx'
// import BusList from './components/BusList.jsx'
// import { Routes, Route } from 'react-router-dom'
// import BusSeats from './components/BusSeats.jsx'
// import UserBookings from './components/UserBookings.jsx'
// import Wrapper from './components/Wrapper.jsx'

// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [userId, setUserId] = useState(localStorage.getItem('userId'));

//   const handleLogin = (token, userId) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('userId', userId);
//     setToken(token);         // ✅ Update state too
//     setUserId(userId);       // ✅ Update state too
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//   }

//   return (
//     <div>
//       <Wrapper handleLogout={handleLogout} token={token} >
//       <Routes>
//         <Route path='/' element={<BusList />} />
//         <Route path="/register" element={<RegisterForm />} />
//         <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
     
//         <Route path="/bus/:busId" element={<BusSeats token={token} />} />
//         <Route path="/my-bookings" element={<UserBookings token={token} userId={userId}/>}/>
//       </Routes>
//        </Wrapper>
//     </div>
//   )
// }

// export default App



import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import BusList from './components/BusList.jsx';
import { Routes, Route } from 'react-router-dom';
import BusSeats from './components/BusSeats.jsx';
import UserBookings from './components/UserBookings.jsx';
import Wrapper from './components/Wrapper.jsx';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const handleLogin = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setToken(token);         // ✅ Update state too
    setUserId(userId);       // ✅ Update state too
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <div>
      <Wrapper handleLogout={handleLogout} token={token} >
        <Routes>
          <Route path="/" element={<BusList />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/bus/:busId" element={<BusSeats token={token} />} />
          <Route path="/my-bookings" element={<UserBookings token={token} userId={userId} />} />
          <Route path="/bookings" element={<UserBookings token={token} userId={userId} />} />  {/* ✅ Added the missing route */}
        </Routes>
      </Wrapper>
    </div>
  );
};

export default App;
