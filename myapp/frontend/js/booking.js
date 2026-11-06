// booking.js
//
// Handles the "Book a Room" form on booking.html.
// Use rooms.js as your reference for how to fetch data and build
// HTML with template strings.

async function populateRoomSelect() {
  const select = document.getElementById("room-select");


  // TODO:
  // 1. Call getRooms() from api.js
  // 2. For each room, create an <option value="ROOM_ID">ROOM_NAME</option>
  // 3. Append the options to `select`

const rooms = await getRooms();
rooms.forEach((room) => {
  const option = document.createElement("option");
  option.value = room.id;
  option.textContent = room.name;
  select.appendChild(option);
});

}

async function handleBookingSubmit(event) {
  event.preventDefault();

  const statusEl = document.getElementById("form-status");

  // TODO:
  // 1. Read the form values (roomId, clubName, date, startTime, endTime, purpose)
  //    Hint: use document.getElementById(...).value for each field
  // 2. Build a bookingData object matching the shape described in api.js
  // 3. Call createBooking(bookingData) from api.js
  // 4. On success, show a message in statusEl (add class "success")
  //    and consider resetting the form with event.target.reset()
  // 5. On failure, show an error message in statusEl (add class "error")

const bookingData = {
  roomId: document.getElementById("room-select").value,
  clubName: document.getElementById("club-name").value,
  date: document.getElementById("date").value,
  startTime: document.getElementById("start-time").value,
  endTime: document.getElementById("end-time").value,
  purpose: document.getElementById("purpose").value,
};

console.log("Booking data:", bookingData);

  statusEl.textContent = "TODO: implement handleBookingSubmit()  - already done";

try {
  const newBooking = await createBooking(bookingData);
  statusEl.textContent = "Booking created successfully!";
  statusEl.classList.add("success");
  statusEl.classList.remove("error");
  event.target.reset();
} catch (error) {
  console.error("Error creating booking:", error);
  statusEl.textContent = "Error creating booking. Please try again.";
  statusEl.classList.add("error");
  statusEl.classList.remove("success");
}
  }

document.addEventListener("DOMContentLoaded", () => {
  populateRoomSelect();
  document
    .getElementById("booking-form")
    .addEventListener("submit", handleBookingSubmit);
});
