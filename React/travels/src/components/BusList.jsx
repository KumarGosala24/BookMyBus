// import React, {useState, useEffect} from 'react'
// import axios from 'axios'

// const BusList = () => {
//     const [buses, setBuses] = useState([])

//   useEffect(() => {
//     const fetchBuses = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/buses/');
//         setBuses(response.data);
//       } catch (error) {
//         console.log("Error fetching buses:", error);
//       }
//     };

//     fetchBuses();
//   }, []);

//   return (
//     <div>
//         {buses.map((item) => {
//         return (
//             <div>
//                 <h1>{item.number}</h1>
//             </div>
//         )
//         })}
//     </div>
//   )
// }

// export default BusList



// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const BusList = () => {
//   const [buses, setBuses] = useState([])

//     const navigate = useNavigate()

//   useEffect(() => {
//     const fetchBuses = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/buses/')
//         setBuses(response.data)
//       } catch (error) {
//         console.log("Error fetching buses:", error)
//       }
//     }

//     fetchBuses()
//   }, [])


// const handleViewSeats = (id) => {
//     navigate(`/bus/${id}`) // ✅ Navigate to the bus seats page with the bus ID
// }

//   return (
//     <div>
//       {buses.map((item) => {
//         return (
//           <div key={item.id}> {/* ✅ Added unique key */}
//             <div>Bus name : {item.bus_name}</div>
//              <div>Bus Number : {item.bus_number}</div>
//             <div>Origin : {item.origin}</div>
//             <div>Destination : {item.destination}</div>
//             <div>Departure Time : {item.departure_time}</div>
//             <div>Arrival Time : {item.arrival_time}</div>
            
//             <button onClick={()=>handleViewSeats(item.id)}>View Seats</button>
//             <hr />
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default BusList



// After adding styling
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Reusable Filter Dropdown
const FilterDropdown = ({ label, value, options, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1 text-gray-600">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">All</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
)

const BusList = () => {
  const [buses, setBuses] = useState([])
  const [filteredBuses, setFilteredBuses] = useState([])

  const [searchTerm, setSearchTerm] = useState('')
  const [originFilter, setOriginFilter] = useState('')
  const [destinationFilter, setDestinationFilter] = useState('')

  const navigate = useNavigate()

  // Fetch Data
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/buses/')
        setBuses(response.data)
        setFilteredBuses(response.data)
      } catch (error) {
        console.log("Error fetching buses:", error)
      }
    }
    fetchBuses()
  }, [])

  // Update Filters
  useEffect(() => {
    let updated = [...buses]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      updated = updated.filter(bus =>
        bus.bus_name.toLowerCase().includes(term) ||
        bus.origin.toLowerCase().includes(term) ||
        bus.destination.toLowerCase().includes(term)
      )
    }

    if (originFilter) {
      updated = updated.filter(bus => bus.origin === originFilter)
    }

    if (destinationFilter) {
      updated = updated.filter(bus => bus.destination === destinationFilter)
    }

    setFilteredBuses(updated)
  }, [searchTerm, originFilter, destinationFilter, buses])

  const handleViewSeats = (id) => {
    navigate(`/bus/${id}`)
  }

  const uniqueOrigins = [...new Set(buses.map(bus => bus.origin))]
  const uniqueDestinations = [...new Set(buses.map(bus => bus.destination))]

  const clearFilters = () => {
    setSearchTerm('')
    setOriginFilter('')
    setDestinationFilter('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Available Buses</h1>

      {/* Search and Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <input
          type="text"
          placeholder="Search bus name, origin, destination"
          className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FilterDropdown
          label="Origin"
          value={originFilter}
          options={uniqueOrigins}
          onChange={(e) => setOriginFilter(e.target.value)}
        />

        <FilterDropdown
          label="Destination"
          value={destinationFilter}
          options={uniqueDestinations}
          onChange={(e) => setDestinationFilter(e.target.value)}
        />
      </div>

      <div className="mb-6 text-right">
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      {/* Results */}
      {filteredBuses.length === 0 ? (
        <p className="text-center text-gray-500">No buses found matching your criteria.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBuses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition duration-300"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">{bus.bus_name}</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {bus.bus_number}
                  </span>
                </div>
                <div className="text-gray-600 mb-1">
                  <span className="font-medium">{bus.origin}</span> → <span className="font-medium">{bus.destination}</span>
                </div>
                <div className="text-sm text-gray-500 mb-4">Departure: {bus.departure_time}</div>
                <button
                  onClick={() => handleViewSeats(bus.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-md transition"
                >
                  View Seats
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BusList
