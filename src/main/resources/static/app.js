let html5QrCode;
window.onload = loadActive;

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    document.getElementById('theme-icon').innerText = isLight ? '☀️' : '🌙';
    document.getElementById('theme-text').innerText = isLight ? 'Day Mode' : 'Night Mode';
}

async function checkIn() {
    const btn = document.querySelector('.btn-checkin');
    btn.disabled = true;
    btn.innerText = "Encrypting & Sending Pass...";

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        hostName: document.getElementById('hostName').value,
        hostEmail: document.getElementById('hostEmail').value
    };

    try {
        const res = await fetch('/api/visitors/check-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            await loadActive();
            clearInputs();
            alert("Success! A Secure QR Pass has been sent to " + data.email);
        } else {
            alert("Check-in failed. Please verify the email address.");
        }
    } catch (error) {
        console.error("Connection error:", error);
    } finally {
        btn.disabled = false;
        btn.innerText = "Check In";
    }
}

async function loadActive() {
    const res = await fetch('/api/visitors/active');
    const visitors = await res.json();
    const tableBody = document.getElementById('visitorTable');
    tableBody.innerHTML = visitors.map(v => `
        <tr>
            <td><b>${v.name}</b><br><small style="color:var(--text-muted)">${v.phone}</small></td>
            <td>${v.hostName}<br><small style="color:var(--text-muted)">${v.hostEmail}</small></td>
            <td><button class="btn-out" onclick="checkOut(${v.id})">Manual Out</button></td>
        </tr>
    `).join('');
}

async function checkOut(id) {
    const res = await fetch('/api/visitors/check-out/' + id, { method: 'PUT' });
    if (res.ok) {
        loadActive();
        return true;
    }
    return false;
}

function toggleScanner() {
    const reader = document.getElementById('reader');
    const btn = document.getElementById('scan-btn');

    if (reader.style.display === 'none' || reader.style.display === '') {
        reader.style.display = 'block';
        btn.innerText = "🛑 Stop Scanner";
        btn.classList.add('active');
        startScanner();
    } else {
        stopScanner();
    }
}

function startScanner() {
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "user" },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
            const success = await checkOut(decodedText);
            if (success) {
                alert("Checkout Successful! Thank you for visiting.");
                stopScanner();
            }
        },
        () => {}
    ).catch(err => {
        console.error("Camera access denied", err);
        stopScanner();
    });
}

function stopScanner() {
    const reader = document.getElementById('reader');
    const btn = document.getElementById('scan-btn');
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            reader.style.display = 'none';
            btn.innerText = "📷 Scan Pass to Checkout";
            btn.classList.remove('active');
        }).catch(err => console.error("Error stopping scanner", err));
    }
}

function clearInputs() {
    document.querySelectorAll('input').forEach(i => i.value = '');
}