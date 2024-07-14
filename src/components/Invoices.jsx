// import React, { useEffect, useState } from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DeleteModal from './DeleteModal';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// const StatusTableCell = styled(StyledTableCell)(({ status }) => ({
//   textTransform: 'uppercase',
//   color: status === 'paid' ? 'green' : status === 'pending' ? 'red' : 'black',
// }));

// const InvoiceList = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
//   const [filterStatus, setFilterStatus] = useState('');

//   useEffect(() => {
//     fetchInvoices();
//   }, []);

//   const navigate = useNavigate();

//   const fetchInvoices = () => {
//     axios.get('http://localhost:8000/api/invoices/')
//       .then(response => {
//         setInvoices(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the invoices!', error);
//         setError(error);
//         setLoading(false);
//       });
//   };

//   const handleDeleteClick = (id) => {
//     setSelectedInvoiceId(id);
//     setOpen(true);
//   };

//   const handleDeleteConfirm = () => {
//     axios.delete(`http://localhost:8000/api/invoices/${selectedInvoiceId}/`)
//       .then(response => {
//         setInvoices(invoices.filter(invoice => invoice.id !== selectedInvoiceId));
//         setOpen(false);
//         setSelectedInvoiceId(null);
//       })
//       .catch(error => {
//         console.error('There was an error deleting the invoice!', error);
//         setOpen(false);
//         setSelectedInvoiceId(null);
//       });
//   };

//   const handleDeleteCancel = () => {
//     setOpen(false);
//     setSelectedInvoiceId(null);
//   };

//   const handleFilterChange = (event) => {
//     setFilterStatus(event.target.value);
//   };

//   const filteredInvoices = invoices.filter(invoice => 
//     filterStatus === '' || invoice.status === filterStatus
//   );

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching invoices.</div>;
//   }

//   return (
//     <div style={{ padding: "2rem" }}>
//       <Typography variant="h3" component="h3" style={{ textAlign: "center" }}>
//         INVOICE GENERATOR
//       </Typography>

//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           onClick={() => navigate('/create-invoices')}
//         >
//           Create New Invoice
//         </Button>
//         <FormControl style={{ minWidth: 200 }}>
//           <InputLabel id="filter-status-label">Filter by Status</InputLabel>
//           <Select
//             labelId="filter-status-label"
//             id="filter-status"
//             value={filterStatus}
//             onChange={handleFilterChange}
//             label="Filter by Status"
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="paid">Paid</MenuItem>
//             <MenuItem value="pending">Pending</MenuItem>
//             <MenuItem value="draft">Draft</MenuItem>
//           </Select>
//         </FormControl>
//       </div>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Invoice Number</StyledTableCell>
//               <StyledTableCell>Payment Due</StyledTableCell>
//               <StyledTableCell>Name</StyledTableCell>
//               <StyledTableCell align="right">Amount($)</StyledTableCell>
//               <StyledTableCell>Status</StyledTableCell>
//               <StyledTableCell>Actions</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredInvoices.map((invoice) => (
//               <StyledTableRow key={invoice.id}>
//                 <StyledTableCell component="th" scope="row" style={{ fontWeight: "bold" }}>
//                   #{invoice.id}
//                 </StyledTableCell>
//                 <StyledTableCell>{invoice.paymentDue}</StyledTableCell>
//                 <StyledTableCell>{invoice.clientName}</StyledTableCell>
//                 <StyledTableCell align="right">{invoice.total}</StyledTableCell>
//                 <StatusTableCell status={invoice.status} style={{ fontWeight: "bold" }}>
//                   {invoice.status}
//                 </StatusTableCell>
//                 <StyledTableCell>
//                   <Button onClick={() => navigate(`/edit-invoices/${invoice.id}`)}>Edit</Button>
//                   <Button onClick={() => handleDeleteClick(invoice.id)}>Delete</Button>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <DeleteModal
//         open={open}
//         handleClose={handleDeleteCancel}
//         handleConfirm={handleDeleteConfirm}
//       />
//     </div>
//   );
// };

// export default InvoiceList;


import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StatusTableCell = styled(StyledTableCell)(({ status }) => ({
  textTransform: 'uppercase',
  color: status === 'paid' ? 'green' : status === 'pending' ? 'red' : 'black',
}));

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const navigate = useNavigate();

  const fetchInvoices = () => {
    axios.get('http://localhost:8000/api/invoices/')
      .then(response => {
        setInvoices(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the invoices!', error);
        setError(error);
        setLoading(false);
      });
  };

  const handleDeleteClick = (id) => {
    setSelectedInvoiceId(id);
    setOpen(true);
  };

  const handleDeleteConfirm = () => {
    axios.delete(`http://localhost:8000/api/invoices/${selectedInvoiceId}/`)
      .then(response => {
        setInvoices(invoices.filter(invoice => invoice.id !== selectedInvoiceId));
        setOpen(false);
        setSelectedInvoiceId(null);
      })
      .catch(error => {
        console.error('There was an error deleting the invoice!', error);
        setOpen(false);
        setSelectedInvoiceId(null);
      });
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setSelectedInvoiceId(null);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredInvoices = invoices.filter(invoice => 
    filterStatus === '' || invoice.status === filterStatus
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching invoices.</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h3" component="h3" style={{ textAlign: "center" }}>
        INVOICE GENERATOR
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/create-invoices')}
        >
          Create New Invoice
        </Button>
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel id="filter-status-label">Filter by Status</InputLabel>
          <Select
            labelId="filter-status-label"
            id="filter-status"
            value={filterStatus}
            onChange={handleFilterChange}
            label="Filter by Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Invoice Number</StyledTableCell>
              <StyledTableCell>Payment Due</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Amount($)</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <StyledTableRow key={invoice.id}>
                <StyledTableCell 
                  component="th" 
                  scope="row" 
                  style={{ fontWeight: "bold", cursor: 'pointer' }}
                  onClick={() => navigate(`/view-invoice/${invoice.id}`)}
                >
                  #{invoice.id}
                </StyledTableCell>
                <StyledTableCell>{invoice.paymentDue}</StyledTableCell>
                <StyledTableCell>{invoice.clientName}</StyledTableCell>
                <StyledTableCell align="right">{invoice.total}</StyledTableCell>
                <StatusTableCell status={invoice.status} style={{ fontWeight: "bold" }}>
                  {invoice.status}
                </StatusTableCell>
                <StyledTableCell>
                  <Button onClick={() => navigate(`/edit-invoices/${invoice.id}`)}>Edit</Button>
                  <Button onClick={() => handleDeleteClick(invoice.id)}>Delete</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteModal
        open={open}
        handleClose={handleDeleteCancel}
        handleConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default InvoiceList;


