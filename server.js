const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Conversation Schema
const conversationSchema = new mongoose.Schema({
  sessionId: String,
  messages: [{
    role: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
  }],
  metadata: {
    userAgent: String,
    ipAddress: String,
    timestamp: { type: Date, default: Date.now }
  }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Webhook endpoint for ElevenLabs
app.post('/webhook-test/travel', (req, res) => {
  try {
    console.log('=== Webhook Received ===');
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('=====================');
    
    // Send success response
    res.status(200).json({ 
      success: true,
      message: 'Webhook received'
    });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Endpoint to fetch latest conversation
app.get('/api/conversations/latest', async (req, res) => {
  try {
    const conversation = await Conversation.findOne()
      .sort({ 'metadata.timestamp': -1 })
      .limit(1);
    
    if (!conversation) {
      return res.status(404).json({ 
        success: false, 
        message: 'No conversations found' 
      });
    }
    
    res.json({ 
      success: true, 
      conversation 
    });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({
    message: 'Server is working',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
}); 