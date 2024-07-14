// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import FetchDataComponent from './FetchDataComponent'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <FetchDataComponent />
//     </>
//   )
// }

// export default App

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Invoices from "./components/Invoices"
import CreateInvoice from "./components/CreateInvoice"
import EditInvoice from "./components/EditInvoice"
import ViewInvoice from "./components/ViewInvoice"


const App = () => {
  return (
        <Router>
            <Routes>
                <Route  path="/" element={<Invoices/>}></Route>
                <Route  path="/create-invoices" element={<CreateInvoice />}></Route>
                <Route  path="/edit-invoices/:id" element={<EditInvoice/>}></Route>
                <Route  path="/view-invoice/:id" element={<ViewInvoice/>}></Route>
            </Routes>
        </Router>
  )
}

export default App
