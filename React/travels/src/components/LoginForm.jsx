// import React, { useState } from 'react'
// import axios from 'axios'

// const LoginForm = ({onLogin}) => {
//     const [form, setForm] = useState({
//         username:'', password:''
//     })
//     const[ message, setMessage] = useState('')

//     const handleChange =(e)=>{
//         setForm({...form, [e.target.name]: e.target.value})
//     }

//     const handleSubmit =async(e)=>{
//         e.preventDefault()
//         try {
//             const response = await axios.post('http://localhost:8000/api/login/', form);
//             setMessage('Login successful')
           
 
//             if(onLogin) {
//                 onLogin(response.data.token, response.data.user_id);
//             }

//         }
//         catch {
//             setMessage("Login failed")
//         } 
//     }

//   return (
//     <div>
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Username</label>
//                 <input type="text" name='username' value={form.username} onChange={handleChange}/><br/>
//                 <label>Password</label> 
//                 <input type="password" name='password' value={form.password} onChange={handleChange}/><br/>
//                 <button type = 'submit'>Login</button>
//             {message && <p>{message}</p>}
//             </div>
//         </form>
      
//     </div>
//   )
// }

// export default LoginForm



// After adding styling
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // ✅ Import navigation hook

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({
    username: '', password: ''
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()  // ✅ Initialize navigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/api/login/', form)
      setMessage('Login successful')
      if (onLogin) {
        onLogin(response.data.token, response.data.user_id)
        navigate('/')   // ✅ Redirect to home page after login
      }
    } catch {
      setMessage("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        
        {message && (
          <p className={`mt-4 text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}

export default LoginForm
