import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendeeForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [ticketType, setTicketType] = useState('VIP');
  const [message, setMessage] = useState('');

  const generatePassword = () => {
    // Implement your own password generation logic here
    // For simplicity, this example generates a random 6-digit number
    const password = Math.floor(Math.random() * 900000) + 100000;
    return password.toString();
  };

  const handleSubmit =  (e) => {
    e.preventDefault();

    const password = generatePassword(); // Generate a unique password

    const attendeeData = {
      email,
      name,
      ticketType,
      password,
      date: new Date(),
      eventCode:"1"
    };
    console.log(attendeeData)
/*hi guys
    try {
      const response = axios.post('http://localhost:5000/attendees', attendeeData);

      if (response.status === 200) {
        setMessage('Attendee created successfully');
        setEmail('');
        setName('');
        setTicketType('VIP');
      } else {
        setMessage('Error creating attendee');
      }
    } catch (error) {
      setMessage('Error creating attendee');
      console.error(error);
    }
    */

      axios.post("http://localhost:5000/attendees", attendeeData)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    }


  return (
    <div>
      <h1>Attendee Details Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="ticketType">Ticket Type:</label>
        <select
          id="ticketType"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
          required
        >
          <option value="VIP">VIP</option>
          <option value="VVIP">VVIP</option>
          <option value="Regular">Regular</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default AttendeeForm;
