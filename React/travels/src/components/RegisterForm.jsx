// import React, { useState } from 'react'
// import axios from 'axios'

// const RegisterForm = () => {
//     const [form, setForm] = useState({
//         username:'', email:'', password:''
//     })
//     const[ message, setMessage] = useState('')

//     const handleChange =(e)=>{
//         setForm({...form, [e.target.name]: e.target.value})
//     }

//     const handleSubmit =async(e)=>{
//         e.preventDefault()
//         try {
//             await axios.post('http://localhost:8000/api/register/', form);
//             setMessage('Registration successful')
//         } catch (error) {
//             setMessage("Regestration failed", + (error.response?.data?.username || error.message))
//         }
//     }

//   return (
//     <div>
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Username</label>
//                 <input type="text" name='username' value={form.username} onChange={handleChange}/><br/>
//                 <label>Email</label>
//                 <input type="email" name='email' value={form.email} onChange={handleChange}/><br/>
//                 <label>Password</label>
//                 <input type="password" name='password' value={form.password} onChange={handleChange}/><br/>
//                 <button type = 'submit'>Register</button>
//             {message && <p>{message}</p>}
//             </div>
//         </form>
      
//     </div>
//   )
// }

// export default RegisterForm

// After adding styling

// RegisterForm.jsx
import React, { useState } from 'react'
import axios from 'axios'

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '', email: '', password: ''
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await axios.post('http://localhost:8000/api/register/', form)
      setMessage('Registration successful! You can now login.')
    } catch (error) {
      setMessage("Registration failed: " + (error.response?.data?.username || error.message))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create an Account</h2>
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
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
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
          {isLoading ? 'Registering...' : 'Register'}
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

export default RegisterForm