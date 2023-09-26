import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrain,
  faPlane,
  faBus,
  faTaxi,
} from '@fortawesome/free-solid-svg-icons';

const bookingsData = [
  { type: 'Train', id: 1, name: 'Train Booking', icon: faTrain },
  { type: 'Airways', id: 2, name: 'Airways Booking', icon: faPlane },
  { type: 'Bus', id: 3, name: 'Bus Booking', icon: faBus },
  { type: 'Taxi', id: 4, name: 'Taxi Booking', icon: faTaxi },
];

function App() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState({
    fromWhere: '',
    toWhere: '',
    departureDate: '',
    passengers: 1,
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [step, setStep] = useState(1);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [thankYou, setThankYou] = useState(false);

  const handleBookingSelect = (booking) => {
    setSelectedBooking(booking);
    setStep(1);
    setSelectedSeats([]);
    setBookingStatus(null);
    setThankYou(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeats.length < formData.passengers) {
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatNumber]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setBookingStatus('Booking in progress...');

      setTimeout(() => {
        switch (selectedBooking.type) {
          case 'Train':
            setBookingStatus('Train booked successfully!');
            break;
          case 'Airways':
            setBookingStatus('Airways booked successfully!');
            break;
          case 'Bus':
            setBookingStatus('Bus booked successfully!');
            break;
          case 'Taxi':
            setBookingStatus('Taxi booked successfully!');
            break;
          default:
            setBookingStatus(null);
            break;
        }
        setFormData({
          fromWhere: '',
          toWhere: '',
          departureDate: '',
          passengers: 1,
        });
        setSelectedSeats([]);
        setStep(3);
        setThankYou(true);
      }, 1500);
    }
  };

  const renderSeatSelection = () => {
    const rows = 5;
    const cols = 6;
    const totalSeats = rows * cols;

    return (
      <div className="seat-selection">
        <h3>Select Your Seats</h3>
        <div className="seat-grid">
          {Array.from({ length: totalSeats }, (_, index) => {
            const seatNumber = index + 1;
            const isSelected = selectedSeats.includes(seatNumber);
            const isBooked = Math.random() < 0.2;

            return (
              <button
                key={seatNumber}
                onClick={() => handleSeatSelect(seatNumber)}
                className={`seat-button ${
                  isSelected
                    ? 'selected'
                    : isBooked
                    ? 'booked'
                    : 'available'
                }`}
                disabled={isBooked || isSelected}
              >
                {seatNumber}
              </button>
            );
          })}
        </div><hr></hr>



<div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => setStep(1)} className="back-button">
  Back to Form
</button>
<button onClick={handleSubmit} className="book-button">
  Book
</button></div>

      </div>
    );
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Transportation Booking System</h1>
      </header>
      <div className="booking-container">
        <div className="booking-options">
          {bookingsData.map((booking) => (
            <button
              key={booking.id}
              onClick={() => handleBookingSelect(booking)}
              className={`booking-button ${
                selectedBooking && selectedBooking.id === booking.id
                  ? 'active'
                  : ''
              }`}
            >
              <FontAwesomeIcon icon={booking.icon} className="booking-icon" />
              {booking.name}
            </button>
          ))}
        </div>
        {selectedBooking && (
          <div className="booking-details">
            <h2>{selectedBooking.name}</h2>
            <div className="booking-form">
              {step === 1 && (
                <>
                  <p>Booking Type: {selectedBooking.type}</p>
                  <form onSubmit={handleSubmit}>
                    <p>From Where:</p>
                    <input
                      type="text"
                      name="fromWhere"
                      value={formData.fromWhere}
                      onChange={handleFormChange}
                      required
                    />
                    <p>To Where:</p>
                    <input
                      type="text"
                      name="toWhere"
                      value={formData.toWhere}
                      onChange={handleFormChange}
                      required
                    />
                    <p>Departure Date:</p>
                    <input
                      type="date"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleFormChange}
                      required
                    />
                    <p>Number of Passengers:</p>
                    <input
                      type="number"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleFormChange}
                      required
                      min="1"
                    />
                    <button type="submit">Next</button>
                  </form>
                </>
              )}
              {step === 2 && renderSeatSelection()}
              {step === 3 && (
                <div className="thank-you">
                  <p>Thank you for booking!</p>
                </div>
              )}
              {bookingStatus && <p>{bookingStatus}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
