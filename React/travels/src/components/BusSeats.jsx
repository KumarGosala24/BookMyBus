// import axios from 'axios'
// import React, {useState, useEffect} from 'react'
// import { useParams } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'


// const BusSeats = ({token}) => {
//     const [bus, setBus] = useState(null)
//     const [seats, setSeats] = useState([])

//     const { busId } = useParams()
//     const navigate = useNavigate()

//     console.log('Checking bus id number=', busId)

//     useEffect(()=>{
//         const fetchBusDetails = async()=>{
//             try {
//                 const response = await axios(`http://localhost:8000/api/buses/${busId}`)
//                 setBus(response.data)
//                 setSeats(response.data.seats || [])
//             } catch (error) {
//                 console.log('Error in fetching details', error)
//             }
//         }
//         fetchBusDetails()
//     }, [busId])

//     const handleBook = async(seatId)=>{
//         if(!token){
//             alert("Please login for booking a seat")
//             navigate('/login')
//             return;
//         }
//         try {
//             await axios.post("http://localhost:8000/api/booking/",
//                 {seat:seatId},
//                 {
//                     headers:{
//                         Authorization: `Token ${token}`
//                     }
//                 }
//             )
//             alert("Booking Successful")
//             setSeats((prevSeats) => 
//                 prevSeats.map((seat) =>
//                   seat.id === seatId ? { ...seat, is_booked: true } : seat
//                 )
//               );
              
            
//         } catch (error) {
//             alert(error.response?.data?.error ||"Booking failed")
//         }
//     }

//   return (
//     <div>
//         {bus && (
//             <div>
//                 <div>{bus.bus_name}</div>
//                 <div>{bus.number}</div>
//                 <div>{bus.origin}</div>
//                 <div>{bus.destination}</div>
//                 <div>{bus.start_time}</div>
//                 <div>{bus.reach_time}</div>
//             </div>
//         )}
//       <div>
//         {seats.map((seat)=>{ 
//             return(
//                 <div key={seat.id}>
//                     <button onClick={()=>handleBook(seat.id)}
//                     style={{color:seat.is_booked? 'red':'green'}}
//                     >
//                         Seat Number {seat.seat_number}
//                     </button>
//                 </div>
//             )
//         })}
//       </div>

//     </div>
//   )
// }

// export default BusSeats


// After adding styling
// BusSeats.jsx
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const BusSeats = ({ token }) => {
  const [bus, setBus] = useState(null)
  const [seats, setSeats] = useState([])
  const { busId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios(`http://localhost:8000/api/buses/${busId}`)
        setBus(response.data)
        setSeats(response.data.seats || [])
      } catch (error) {
        console.log('Error in fetching details', error)
      }
    }
    fetchBusDetails()
  }, [busId])

  const handleBook = async (seatId) => {
    if (!token) {
      alert("Please login for booking a seat")
      navigate('/login')
      return
    }
    try {
      await axios.post(
        "http://localhost:8000/api/booking/",
        { seat: seatId },
        { headers: { Authorization: `Token ${token}` } }
      )
      alert("Booking Successful")
      setSeats(prevSeats =>
        prevSeats.map(seat =>
          seat.id === seatId ? { ...seat, is_booked: true } : seat
        )
      )
    } catch (error) {
      alert(error.response?.data?.error || "Booking failed")
    }
  }

  const bookedCount = seats.filter(seat => seat.is_booked).length
  const availableCount = seats.length - bookedCount

  return (
    <div className="container mx-auto px-4 py-8">
      {bus && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-4xl mx-auto">
          {/* Bus Name */}
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg">
            {bus.bus_name}
          </h1>

          {/* Location with Icon */}
          <div className="flex items-center space-x-3 text-indigo-600 mb-6">
            <svg
              className="w-7 h-7 text-indigo-500 drop-shadow-md"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <circle cx="12" cy="11" r="3" />
            </svg>
            <span className="text-xl font-semibold">
              {bus.origin} <span className="mx-2 text-gray-400">→</span> {bus.destination}
            </span>
          </div>

          {/* Times container */}
          <div className="flex space-x-12 text-gray-700 font-medium text-lg">
            {/* Departure */}
            <div className="flex items-center space-x-2 bg-indigo-50 rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-300">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                Departure: <span className="font-semibold text-indigo-700">{bus.departure_time}</span>
              </span>
            </div>

            {/* Arrival */}
            <div className="flex items-center space-x-2 bg-indigo-50 rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-300">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                Arrival: <span className="font-semibold text-indigo-700">{bus.arrival_time}</span>
              </span>
            </div>
          </div>

          {/* Seats summary */}
          <div className="flex items-center justify-start space-x-6 mt-8">
            <div className="flex items-center space-x-2 bg-green-100 text-green-800 rounded-lg px-5 py-3 shadow-lg font-semibold text-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>{availableCount} Available</span>
            </div>
            <div className="flex items-center space-x-2 bg-red-100 text-red-800 rounded-lg px-5 py-3 shadow-lg font-semibold text-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>{bookedCount} Booked</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Available Seats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {seats.map((seat) => (
            <button
              key={seat.id}
              onClick={() => handleBook(seat.id)}
              disabled={seat.is_booked}
              className={`py-3 px-4 rounded-lg font-medium text-center transition-colors duration-200 ${
                seat.is_booked
                  ? 'bg-red-100 text-red-800 cursor-not-allowed shadow-inner'
                  : 'bg-green-100 text-green-800 hover:bg-green-200 shadow-md'
              }`}
              aria-label={`Seat ${seat.seat_number} ${seat.is_booked ? 'Booked' : 'Available'}`}
            >
              Seat {seat.seat_number}
              {seat.is_booked && <span className="block text-xs mt-1">Booked</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BusSeats
