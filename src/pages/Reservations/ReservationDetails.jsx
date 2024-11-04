import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ReservationDetails.css";

//validating token from session storage
const token = sessionStorage.getItem("token_bookings");

//Get all reservation petition to API
const getReservations = async () => {
  try {
    const response = await axios.get(
      "https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting the booking details", error);
  }
};

//change reservation status from pending to confirmed or cancelled
// Change reservation status from pending to confirmed or cancelled
const setReservationStatus = async (id, newStatus) => {
  const token = sessionStorage.getItem("token_bookings");
  try {
    const response = await axios.patch(
      `https://apibookingsaccomodations-production.up.railway.app/api/V1/status_booking/${id}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating the reservation status", error);
  }
};
//get booking details from ID
function ReservationDetails() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReservations();
      if (data) {
        const reservationDetailsByID = data.find(
          (res) => res.id === parseInt(id)
        );
        setReservation(reservationDetailsByID);
      }
    };
    fetchData();
  }, [id]);

  const handleConfirm = async () => {
    if (reservation && reservation.status === "pending") {
      const updatedReservation = await setReservationStatus(
        reservation.id,
        "confirmed"
      );
      setReservation(updatedReservation);
    }
  };

  const handleCancel = async () => {
    /* console.log("cancel is being cllaed"); */

    if (reservation && reservation.status === "pending") {
      const updatedReservation = await setReservationStatus(
        reservation.id,
        "CANCELLED"
      );
      setReservation(updatedReservation);
    }
  };

  if (!reservation) {
    return <p>Loading...</p>;
  }
  // Destructure specific fields from the reservation object
  const {
    booking,
    check_in_date,
    check_out_date,
    status,
    total_amount,
    accomodation,
    created_at,
    updated_at,
  } = reservation;

  return (
    <div className="reservation-details">
      <h2>Reservation Details</h2>
      <form className="rown text-start">
        <ul className="row">
          <li className="col-sm-10 col-md-6">
            <label className="col-4">Booking Code</label>
            <input className="col-8" type="text" value={booking} readOnly />

            <label className="col-4">Accomodation:</label>
            <input
              className="col-8"
              type="text"
              value={accomodation}
              readOnly
            />
          </li>

          <li className="col-sm-10 col-md-6">
            <label className="col-4">Check In Date:</label>
            <input
              className="col-8"
              type="text"
              value={check_in_date}
              readOnly
            />

            <label className="col-4">Check Out Date:</label>
            <input
              className="col-8"
              type="text"
              value={check_out_date}
              readOnly
            />
          </li>
          <li className="col-sm-10 col-md-6">
            <label className="col-4">Status:</label>
            <input className="col-8" type="text" value={status} readOnly />

            <label className="col-4">Total Amount:</label>
            <input
              className="col-8"
              type="text"
              value={total_amount}
              readOnly
            />
          </li>
          <li className="col-sm-10 col-md-6">
            <label className="col-4">Day Created:</label>
            <input className="col-8" type="text" value={created_at} readOnly />

            <label className="col-4">Last update:</label>
            <input className="col-8" type="text" value={updated_at} readOnly />
          </li>
        </ul>

        <div className="row justify-content-evenly">
          <button
            className="col-4"
            type="button"
            onClick={handleConfirm}
            /* disabled={status !== "pending"} */
          >
            Confirm Reservation
          </button>
          <button
            className="col-4"
            type="button"
            onClick={handleCancel}
            /* disabled={status !== "pending"} */
          >
            Cancel Reservation
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationDetails;
