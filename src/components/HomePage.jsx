import React from 'react'
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom'
import CreateInvoice from './CreateInvoice'
import EditInvoice from './EditInvoice'
import Invoices from './Invoices'
import ViewInvoice from './ViewInvoice'

const HomePage = () => {
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

export default HomePage
