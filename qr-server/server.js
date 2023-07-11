const express = require('express');
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const { Schema } = mongoose;
const cors = require("cors");
const app = express();
app.use(cors())
let corsOptions = {
  origin: ['http://localhost:3000'],

}

app.use(cors(corsOptions))
app.use(bodyParser.json())
// Connect to MongoDB
mongoose.connect("mongodb+srv://timichris45:iZ6AFw8I2hsnCTpE@onunufestival.1nefnlb.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define attendee schema
const attendeeSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  ticketType: {
    type: String,
    enum: ['VIP', 'VVIP', 'Regular'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  isticketValid: {
    type: Boolean,
    /*required: true,*/
    default:true
  },
  eventCode: {
    type: String,
    required: true,
  }
});

// Create attendee model
const Attendee = mongoose.model('Attendee', attendeeSchema);

// Create a new attendee
app.post('/attendees', (req, res) => {
  try {
    console.log(req.body)
    const { email, name, ticketType, password, eventCode } = req.body;
    console.log(email)
    console.log(name)
    console.log(ticketType)
    console.log(password)
    const attendee = new Attendee({
      email,
      name,
      ticketType,
      password,
      eventCode
    });
     attendee.save();
    res.status(201).json({ message: 'Attendee created successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }

});

// Get all attendees
app.get('/attendees', async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving attendees' });
  }
});

// Get a specific attendee by ID
app.get('/attendees/:id', async (req, res) => {
  try {
    const attendee = await Attendee.findById(req.params.id);
    if (!attendee) {
      res.status(404).json({ error: 'Attendee not found' });
    } else {
      res.status(200).json(attendee);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving attendee' });
  }
});

// Update a specific attendee by ID
app.put('/attendees/:id', async (req, res) => {
  try {
    const attendee = await Attendee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!attendee) {
      res.status(404).json({ error: 'Attendee not found' });
    } else {
      res.status(200).json(attendee);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating attendee' });
  }
});

// Delete a specific attendee by ID
app.delete('/attendees/:id', async (req, res) => {
  try {
    const attendee = await Attendee.findByIdAndDelete(req.params.id);
    if (!attendee) {
      res.status(404).json({ error: 'Attendee not found' });
    } else {
      res.status(204).json({ message: 'Attendee deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting attendee' });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
