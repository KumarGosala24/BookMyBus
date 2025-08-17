// import axios from 'axios'
// import React, { useState, useEffect } from 'react'

// const UserBookings = ({ token, userId }) => {
//   const [bookings, setBookings] = useState([])
//   const [bookingError, setBookingError] = useState(null)

//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!token || !userId) {
//         return
//       }
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/user/${userId}/bookings/`,
//           {
//             headers: {
//               Authorization: `Token ${token}`
//             }
//           }
//         )
//         console.log('Booking data = ', response.data)
//         setBookings(response.data)
//         console.log('checking for user bookings =', response.data)
//         setBookingError(null) // clear previous errors on success
//       } catch (error) {
//         console.log('fetching details failed', error)
//         setBookingError(error.response?.data?.message || 'Failed to fetch bookings')
//       }
//     }
//     fetchBookings()
//   }, [userId, token])

//   if (bookingError) {
//     return <div>Error: {bookingError}</div>
//   }

//   if (!bookings.length) {
//     return <div>No bookings found.</div>
//   }

//   return (
//     <div>
//       {bookings.map((item, index) => {
//         // Added key using index or a better unique key if you have one like item.id
//         return (
//           <div key={item.id || index}>
//             {/* Defensive checks using optional chaining */}
//             {item.user ?? 'Unknown User'} -{' '}
//             {item.bus ?? 'Unknown Bus'} -{' '}
//             {item.seat ?? 'N/A'} -{' '}
//             {item.booking_time ?? 'Unknown Time'}
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default UserBookings


// After adding styling

// UserBookings.jsx
// import axios from 'axios'
// import React, { useState, useEffect } from 'react'

// const UserBookings = ({ token, userId }) => {
//   const [bookings, setBookings] = useState([])
//   const [bookingError, setBookingError] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!token || !userId) return
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/user/${userId}/bookings/`,
//           { headers: { Authorization: `Token ${token}` } }
//         )
//         setBookings(response.data)
//         setBookingError(null)
//       } catch (error) {
//         setBookingError(error.response?.data?.message || 'Failed to fetch bookings')
//       } finally {
//         setIsLoading(false)
//       }
//     }
//     fetchBookings()
//   }, [userId, token])

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     )
//   }

//   if (bookingError) {
//     return <div className="text-red-600 text-center py-8">{bookingError}</div>
//   }

//   if (!bookings.length) {
//     return <div className="text-gray-600 text-center py-8">No bookings found.</div>
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Bookings</h1>
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Time</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {bookings.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">{item.bus?.bus_name || 'Unknown Bus'}</div>
//                     <div className="text-sm text-gray-500">{item.bus?.origin || '?'} → {item.bus?.destination || '?'}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                       Seat {item.seat?.seat_number || 'N/A'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {item.booking_time || 'Unknown Time'}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserBookings



import axios from 'axios'
import React, { useState, useEffect } from 'react'

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([])
  const [bookingError, setBookingError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !userId) return
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${userId}/bookings/`,
          { headers: { Authorization: `Token ${token}` } }
        )
        setBookings(response.data)
        setBookingError(null)
      } catch (error) {
        setBookingError(error.response?.data?.message || 'Failed to fetch bookings')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBookings()
  }, [userId, token])

  // -------------------------
  // Cancel Booking Function
  // -------------------------
  // const handleCancel = async (bookingId) => {
  //   if (!window.confirm('Are you sure you want to cancel this booking?')) return
  //   try {
  //     await axios.post(
  //       `http://localhost:8000/api/cancel-booking/${bookingId}/`,
  //       {},
  //       { headers: { Authorization: `Token ${token}` } }
  //     )
  //     // Update local state after successful cancellation
  //     setBookings((prev) =>
  //       prev.map((b) => (b.id === bookingId ? { ...b, canceled: true } : b))
  //     )
  //     alert('Booking canceled successfully.')
  //   } catch (error) {
  //     alert(error.response?.data?.message || 'Failed to cancel booking')
  //   }
  // }



  const handleCancel = async (bookingId) => {
  if (!window.confirm('Are you sure you want to cancel this booking?')) return
  try {
    await axios.post(
      `http://localhost:8000/api/cancel-booking/${bookingId}/`,
      {},
      { headers: { Authorization: `Token ${token}` } }
    )
    // Remove booking from local state
    setBookings((prev) => prev.filter((b) => b.id !== bookingId))

    alert('Booking canceled successfully.')
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to cancel booking')
  }
}


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (bookingError) {
    return <div className="text-red-600 text-center py-8">{bookingError}</div>
  }

  if (!bookings.length) {
    return <div className="text-gray-600 text-center py-8">No bookings found.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Bookings</h1>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.bus?.bus_name || 'Unknown Bus'}</div>
                    <div className="text-sm text-gray-500">{item.bus?.origin || '?'} → {item.bus?.destination || '?'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.canceled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      Seat {item.seat?.seat_number || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.booking_time || 'Unknown Time'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!item.canceled && (
                      <button
                        onClick={() => handleCancel(item.id)}
                        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                    {item.canceled && <span className="text-red-600 font-semibold">Canceled</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserBookings
