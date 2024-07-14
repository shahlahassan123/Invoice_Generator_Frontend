// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   Box
// } from '@mui/material';

// const ViewInvoice = () => {
//   const { id } = useParams();
//   const [invoice, setInvoice] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:8000/api/invoices/${id}/`)
//       .then(response => {
//         setInvoice(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the invoice!', error);
//         setError(error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching invoice.</div>;
//   }

//   return (
//     <Container component={Paper} maxWidth="md" style={{ padding: '2em', marginTop: '2em' }}>
//       <Typography variant="h4" gutterBottom>
//         Invoice #{invoice.id}
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <Typography variant="h6">Client Name</Typography>
//           <Typography>{invoice.clientName}</Typography>
//         </Grid>
//         <Grid item xs={6}>
//           <Typography variant="h6">Client Email</Typography>
//           <Typography>{invoice.clientEmail}</Typography>
//         </Grid>
//         <Grid item xs={6}>
//           <Typography variant="h6">Payment Due</Typography>
//           <Typography>{invoice.paymentDue}</Typography>
//         </Grid>
//         <Grid item xs={6}>
//           <Typography variant="h6">Status</Typography>
//           <Typography>{invoice.status.toUpperCase()}</Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h6">Description</Typography>
//           <Typography>{invoice.description}</Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h6">Items</Typography>
//           {invoice.items.map((item, index) => (
//             <Box key={index} mb={2}>
//               <Typography><strong>{item.name}</strong></Typography>
//               <Typography>Quantity: {item.quantity}</Typography>
//               <Typography>Price: ${item.price}</Typography>
//               <Typography>Total: ${item.total}</Typography>
//             </Box>
//           ))}
//         </Grid>
//         <Grid item xs={6}>
//           <Typography variant="h6">Sender Address</Typography>
//           <Typography>{invoice.senderAddress.street}, {invoice.senderAddress.city}</Typography>
//           <Typography>{invoice.senderAddress.postCode}, {invoice.senderAddress.country}</Typography>
//         </Grid>
//         <Grid item xs={6}>
//           <Typography variant="h6">Client Address</Typography>
//           <Typography>{invoice.clientAddress.street}, {invoice.clientAddress.city}</Typography>
//           <Typography>{invoice.clientAddress.postCode}, {invoice.clientAddress.country}</Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h6">Total</Typography>
//           <Typography>${invoice.total}</Typography>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ViewInvoice;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Button
} from '@mui/material';

const ViewInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/invoices/${id}/`)
      .then(response => {
        setInvoice(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the invoice!', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching invoice.</div>;
  }

  return (
    <Container component={Paper}  style={{ padding: '2rem', margin: '2rem' }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate(-1)}
        style={{ marginBottom: '1em' }}
      >
        Go Back
      </Button>
      <Typography variant="h4" gutterBottom>
        Invoice #{invoice.id}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">Client Name</Typography>
          <Typography>{invoice.clientName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Client Email</Typography>
          <Typography>{invoice.clientEmail}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Payment Due</Typography>
          <Typography>{invoice.paymentDue}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Status</Typography>
          <Typography>{invoice.status.toUpperCase()}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Description</Typography>
          <Typography>{invoice.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Items</Typography>
          {invoice.items.map((item, index) => (
            <Box key={index} mb={2}>
              <Typography><strong>{item.name}</strong></Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>Price: ${item.price}</Typography>
              <Typography>Total: ${item.total}</Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Sender Address</Typography>
          <Typography>{invoice.senderAddress.street}, {invoice.senderAddress.city}</Typography>
          <Typography>{invoice.senderAddress.postCode}, {invoice.senderAddress.country}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Client Address</Typography>
          <Typography>{invoice.clientAddress.street}, {invoice.clientAddress.city}</Typography>
          <Typography>{invoice.clientAddress.postCode}, {invoice.clientAddress.country}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Total</Typography>
          <Typography>${invoice.total}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewInvoice;
