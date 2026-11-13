// my-bookings.js
//
// Renders the list of bookings on my-bookings.html and lets the
// user cancel a booking. Use rooms.js as your reference.

async function renderBookings() {
  const container = document.getElementById("bookings-list");
  const bookings = await getBookings();

  if (bookings.length === 0) {
    container.innerHTML = "<p>You do not have any bookings.</p>";
    return;
  }

  const rooms = await getRooms();
  const bookingItems = bookings.map((booking) => {
    const room = rooms.find((r) => r.id === booking.roomId);
    const roomName = room ? room.name : booking.roomId;

    return `
      <div class="booking-item">
        <div>
          <h2>${roomName}</h2>
          <p><strong>Room ID:</strong> ${booking.roomId}</p>
          <p><strong>Club:</strong> ${booking.clubName}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.startTime}-${booking.endTime}</p>
          <p><strong>Purpose:</strong> ${booking.purpose || "Not Specified"}</p>
        </div>
        <button type="button" data-id="${booking.id}">Cancel</button>
      </div>
    `;
  });

  container.innerHTML = bookingItems.join("");

  container.querySelectorAll("button[data-id]").forEach((button) => {
    button.addEventListener("click", () => {
      handleCancelClick(button.dataset.id);
    });
  });
}

async function handleCancelClick(bookingId) {
  await deleteBooking(bookingId);
  await renderBookings();
}

document.addEventListener("DOMContentLoaded", renderBookings);
