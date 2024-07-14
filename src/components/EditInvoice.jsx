import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const EditInvoice = () => {
  const { id } = useParams();
  console.log("id",id)
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState({
    clientName: '',
    clientEmail: '',
    description: '',
    paymentTerms: '',
    total: '',
    paymentDue: '',
    status: '',
    items: [{ name: '', quantity: '', price: '', total: '' }],
    senderAddress: { street: '', city: '', postCode: '', country: '' },
    clientAddress: { street: '', city: '', postCode: '', country: '' },
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/invoices/${id}/`)
      .then(response => {
        const data = response.data;
        setInvoice({
          ...data,
          paymentTerms: data.paymentTerms.toString(),
          total: data.total.toString(),
          items: data.items.map(item => ({
            ...item,
            quantity: item.quantity.toString(),
            price: item.price.toString(),
            total: item.total.toString(),
          })),
        });
      })
      .catch(error => {
        console.error('There was an error fetching the invoice!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({
      ...invoice,
      [name]: value,
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoice.items];
    items[index][name] = value;
    setInvoice({ ...invoice, items });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { name: '', quantity: '', price: '', total: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedInvoice = {
      ...invoice,
      paymentTerms: parseInt(invoice.paymentTerms, 10),
      total: parseFloat(invoice.total),
      items: invoice.items.map(item => ({
        ...item,
        quantity: parseInt(item.quantity, 10),
        price: parseFloat(item.price),
        total: parseFloat(item.total),
      })),
    };
    axios.put(`http://localhost:8000/api/invoices/${id}/`, formattedInvoice)
      .then(response => {
        console.log(response);
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error updating the invoice!', error.response.data);
      });
  };

  return (
    <Container component={Paper} maxWidth="md" style={{ padding: '2em' }}>
      <Typography variant="h4" gutterBottom>
        Edit Invoice
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="clientName"
              name="clientName"
              label="Client Name"
              fullWidth
              value={invoice.clientName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="clientEmail"
              name="clientEmail"
              label="Client Email"
              fullWidth
              value={invoice.clientEmail}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              fullWidth
              value={invoice.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="paymentTerms"
              name="paymentTerms"
              label="Payment Terms"
              fullWidth
              value={invoice.paymentTerms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="total"
              name="total"
              label="Total"
              fullWidth
              value={invoice.total}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="paymentDue"
              name="paymentDue"
              label="Payment Due Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={invoice.paymentDue}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={invoice.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Items
            </Typography>
            {invoice.items.map((item, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={3}>
                  <TextField
                    required
                    id={`item-name-${index}`}
                    name="name"
                    label="Name"
                    fullWidth
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    id={`item-quantity-${index}`}
                    name="quantity"
                    label="Quantity"
                    fullWidth
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    id={`item-price-${index}`}
                    name="price"
                    label="Price"
                    fullWidth
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    id={`item-total-${index}`}
                    name="total"
                    label="Total"
                    fullWidth
                    value={item.total}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </Grid>
              </Grid>
            ))}
            <Button onClick={addItem} variant="contained" style={{ marginTop: '1em' }}>
              Add Item
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Sender Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  required
                  id="sender-street"
                  name="street"
                  label="Street"
                  fullWidth
                  value={invoice.senderAddress.street}
                  onChange={(e) => setInvoice({
                    ...invoice,
                    senderAddress: { ...invoice.senderAddress, street: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="sender-city"
                  name="city"
                  label="City"
                  fullWidth
                  value={invoice.senderAddress.city}
                  onChange={(e) => setInvoice({
                    ...invoice,
                    senderAddress: { ...invoice.senderAddress, city: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="sender-postCode"
                  name="postCode"
                  label="Post Code"
                  fullWidth
                  value={invoice.senderAddress.postCode}
                  onChange={(e) => setInvoice({
                    ...invoice,
                    senderAddress: { ...invoice.senderAddress, postCode: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="sender-country"
                  name="country"
                  label="Country"
                  fullWidth
                  value={invoice.senderAddress.country}
                  onChange={(e) => setInvoice({
                    ...invoice,
                    senderAddress: { ...invoice.senderAddress, country: e.target.value }
                  })}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Client Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  required
                  id="client-street"
                  name="street"
                  label="Street"
                  fullWidth
                  value={invoice.clientAddress.street}
                  onChange={(e) => setInvoice({
                    ...invoice,
                    clientAddress: { ...invoice.clientAddress, street: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="client-city"
                  name="city"
                  label="City"
                  fullWidth
                  value={invoice.clientAddress.city}
                  onChange={(e) => setInvoice({
                    ...invoice,
                    clientAddress: { ...invoice.clientAddress, city: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="client-postCode"
                  name="postCode"
                  label="Post Code"
                  fullWidth
                  value={invoice.clientAddress.postCode}
                  onChange={(e) => setInvoice({
                    ...invoice,
                    clientAddress: { ...invoice.clientAddress, postCode: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="client-country"
                  name="country"
                  label="Country"
                  fullWidth
                  value={invoice.clientAddress.country}
                  onChange={(e) => setInvoice({
                    ...invoice,
                    clientAddress: { ...invoice.clientAddress, country: e.target.value }
                  })}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: '1em' }}>
              Update Invoice
            </Button>
            <Button type="button" variant="contained" color="secondary" onClick={() => navigate("/")}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditInvoice;
