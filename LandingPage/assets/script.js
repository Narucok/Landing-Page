// Harga tiket
const ticketPrices = {
    adult: 50000,
    child: 35000,
    toddler: 20000
};

// Update jumlah tiket
function updateQuantity(type, change) {
    const input = document.getElementById(type);
    let value = parseInt(input.value) + change;
    if (value < 0) value = 0;
    input.value = value;
    updateSummary();
}

// Update ringkasan pemesanan
function updateSummary() {
    const adultCount = parseInt(document.getElementById('adult').value);
    const childCount = parseInt(document.getElementById('child').value);
    const toddlerCount = parseInt(document.getElementById('toddler').value);
    
    const adultTotal = adultCount * ticketPrices.adult;
    const childTotal = childCount * ticketPrices.child;
    const toddlerTotal = toddlerCount * ticketPrices.toddler;
    const grandTotal = adultTotal + childTotal + toddlerTotal;
    
    // Update ringkasan
    const summaryItems = document.querySelectorAll('.summary-item');
    summaryItems[0].innerHTML = `<span>Dewasa (x${adultCount})</span><span>Rp ${adultTotal.toLocaleString('id-ID')}</span>`;
    summaryItems[1].innerHTML = `<span>Anak (x${childCount})</span><span>Rp ${childTotal.toLocaleString('id-ID')}</span>`;
    summaryItems[2].innerHTML = `<span>Balita (x${toddlerCount})</span><span>Rp ${toddlerTotal.toLocaleString('id-ID')}</span>`;
    document.querySelector('.summary-total').innerHTML = `<span>Total</span><span>Rp ${grandTotal.toLocaleString('id-ID')}</span>`;
}

// Form submission
document.getElementById('ticketForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const adultCount = parseInt(document.getElementById('adult').value);
    const childCount = parseInt(document.getElementById('child').value);
    const toddlerCount = parseInt(document.getElementById('toddler').value);
    
    if (adultCount + childCount + toddlerCount === 0) {
        alert('Silakan pilih minimal 1 tiket');
        return;
    }
    
    // Simulasi pemesanan berhasil
    const name = document.getElementById('name').value;
    const visitDate = document.getElementById('visitDate').value;
    
    alert(`Pemesanan tiket berhasil!\n\nAtas nama: ${name}\nTanggal kunjungan: ${visitDate}\nTotal: Rp ${(adultCount * ticketPrices.adult + childCount * ticketPrices.child + toddlerCount * ticketPrices.toddler).toLocaleString('id-ID')}\n\nDetail tiket telah dikirim ke email Anda.`);
    
    // Reset form
    document.getElementById('ticketForm').reset();
    document.getElementById('adult').value = 0;
    document.getElementById('child').value = 0;
    document.getElementById('toddler').value = 0;
    updateSummary();
});

// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll ke form pemesanan
function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({
        behavior: 'smooth'
    });
}

// Set tanggal minimal untuk form (hari ini)
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('visitDate').setAttribute('min', today);
    
    // Set nilai default untuk tanggal (3 hari dari sekarang)
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    const defaultDateString = defaultDate.toISOString().split('T')[0];
    document.getElementById('visitDate').value = defaultDateString;
    
    // Set waktu default
    document.getElementById('visitTime').value = '10:00';
});

// Animasi untuk elemen saat di-scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Terapkan animasi pada elemen
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.facility-card, .testimonial-card').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter-input').value;
    
    if (email) {
        alert(`Terima kasih! Email ${email} telah berhasil didaftarkan untuk newsletter.`);
        this.reset();
    } else {
        alert('Silakan masukkan alamat email Anda.');
    }
});
