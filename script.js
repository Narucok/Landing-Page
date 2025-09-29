document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('ticketForm');
  const tableBody = document.querySelector('#visitorTable tbody');
  const dateInput = document.getElementById('bookingDate');

  // Set min date = besok
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;
  dateInput.setAttribute("min", minDate);

  // ✅ 5 Data Dummy
  const dummyVisitors = [
    {
      name: 'Andi Saputra',
      bookingDate: '2025-09-14',
      submitTime: '13/09/25 08.15'
    },
    {
      name: 'Rina Kartika',
      bookingDate: '2025-09-15',
      submitTime: '13/09/25 08.30'
    },
    {
      name: 'Budi Wijaya',
      bookingDate: '2025-09-16',
      submitTime: '13/09/25 08.45'
    },
    {
      name: 'Siti Marlina',
      bookingDate: '2025-09-17',
      submitTime: '13/09/25 09.00'
    },
    {
      name: 'Fajar Nugroho',
      bookingDate: '2025-09-18',
      submitTime: '13/09/25 09.15'
    }
  ];

  dummyVisitors.forEach(visitor => {
    const formattedDate = new Date(visitor.bookingDate).toLocaleDateString("id-ID", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${visitor.name}</td>
      <td>${visitor.submitTime}</td>
      <td>${formattedDate}</td>
    `;
    tableBody.appendChild(row);
  });

  // ✅ Submit Form Handler
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const bookingDate = document.getElementById('bookingDate').value;
    const peopleCount = document.getElementById('peopleCount').value.trim();

    if (!name || !email || !phone || !bookingDate || !peopleCount) {
      alert("Semua kolom harus diisi!");
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "short"
    });

    const bookingDateFormatted = new Date(bookingDate).toLocaleDateString("id-ID", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    alert(`Form berhasil dikirim!\n\nNama: ${name}\nTanggal Booking: ${bookingDateFormatted}\nJumlah: ${peopleCount} orang`);

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${timeString}</td>
      <td>${bookingDateFormatted}</td>
    `;
    tableBody.appendChild(newRow);

    form.reset();
    dateInput.setAttribute("min", minDate);
  });
});