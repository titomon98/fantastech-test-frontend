import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  List,
  ListItem,
  Box,
  Paper
} from '@mui/material';
import { apiURL } from '../config/constant';

function SmsForm() {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const sendSms = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const url = `${apiURL}/api/sms`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number, message })
      });

      const data = await res.json();

      if (!res.ok) {
        const error = data.error
        throw new Error(error);
      }

      setResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Send SMS
        </Typography>

        <form onSubmit={sendSms}>
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />

          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send SMS
            </Button>
          </Box>
        </form>

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {response && (
          <Box mt={4}>
            <Alert severity="success">{response.message}</Alert>
            <List>
              {response.sms.map((part, index) => (
                <ListItem key={index}>{part}</ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default SmsForm;
