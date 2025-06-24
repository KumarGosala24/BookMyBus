// import React from 'react'
// import { Link } from 'react-router-dom'

// const Wrapper = ({token, handleLogout, children}) => {

//     const logout = ()=>{
//         handleLogout()
//     }

//   return (
//     <div>
//       {token ? (
   
//             <button onClick={logout}>Logout</button>
    
//       ) :
//       <Link to="/login">
//             <button>Login</button>
//         </Link>
//       }
//    <main>{children}</main>
//     </div>
//   )
// }

// export default Wrapper

// After adding styling

// Wrapper.jsx
// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// const Wrapper = ({ token, handleLogout, children }) => {
//   const navigate = useNavigate()

//   const logout = () => {
//     handleLogout()
//     navigate('/')
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex">
//               <div className="flex-shrink-0 flex items-center">
//                 <Link to="/" className="text-xl font-bold text-blue-600">BusTravel</Link>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               {token ? (
//                 <>
//                   <Link to="/bookings" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
//                     My Bookings
//                   </Link>
//                   <button
//                     onClick={logout}
//                     className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <Link
//                   to="/login"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
//                 >
//                   Login
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
      
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {children}
//       </main>
      
//       <footer className="bg-white border-t border-gray-200 mt-8">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-gray-500 text-sm">
//             &copy; {new Date().getFullYear()} BusTravel. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default Wrapper

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Wrapper = ({ token, handleLogout, children, depTime }) => {
  const navigate = useNavigate()

  const logout = () => {
    handleLogout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
              </svg>
              <Link
                to="/"
                className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent select-none"
              >
                BusVoyage
              </Link>
            </div>

            {/* Departure Time - styled as a pill */}
            {depTime && (
              <div className="hidden md:flex items-center px-4 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold tracking-wide shadow-sm select-none">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Departure: {depTime}
              </div>
            )}

            <div className="flex items-center space-x-4">
              {token ? (
                <>
                  <Link
                    to="/bookings"
                    className="group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500 group-hover:text-blue-600 transition"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    My Bookings
                  </Link>

                  <button
                    onClick={logout}
                    className="group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500 group-hover:text-red-600 transition"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="group inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 transition duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-blue-500 group-hover:text-blue-700 transition"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md text-sm font-medium shadow-md hover:shadow-lg hover:brightness-110 transition duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-white group-hover:text-white transition"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      <footer className="bg-white/90 backdrop-blur-md border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
            </svg>
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent select-none">
              BusVoyage
            </span>
          </div>
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BusVoyage. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Wrapper
