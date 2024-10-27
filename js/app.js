document.addEventListener("DOMContentLoaded", () => {
  // Dark Mode Toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  // Überprüfen, ob der Benutzer bereits eine Dark Mode Präferenz hat
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  // Event Listener für den Toggle Button
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Dark Mode Einstellung speichern
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }
  });

  // Formularvalidierung und EmailJS E-Mail senden
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Verhindert das normale Absenden

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      alert("Please fill in all the fields.");
    } else if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
    } else {
      // EmailJS Nachricht senden
      emailjs
        .send("service_sgbw9os", "template_lgbjv6k", {
          from_name: name,
          from_email: email,
          message: message,
          to_name: "Oliver Escobar Rüsch", // Dein Name für die Personalisierung
        })
        .then((response) => {
          alert("Message sent successfully!");
          contactForm.reset(); // Formular zurücksetzen
        })
        .catch((error) => {
          alert("Failed to send the message. Please try again.");
          console.error("EmailJS Error:", error);
        });
    }
  });

  // E-Mail-Validierung
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }

  // Smooth Scroll für Navigationslinks
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Scroll-Effekte für Timeline
  const timelineItems = document.querySelectorAll(".timeline-item");

  const onScroll = () => {
    timelineItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        item.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // Initiale Prüfung, ob einige Elemente bereits im Viewport sind

  // Geolocation und Leaflet.js Map
  const findLocationButton = document.getElementById("find-location");
  const mapContainer = document.getElementById("map");

  // Initialisiere Leaflet Karte - einmalig
  let userLocationMap = L.map("map", {
    center: [46.9479739, 7.4474468], // Startposition auf Bern
    zoom: 13,
    maxZoom: 18,
  });

  // Füge die Kartenkachel von OpenStreetMap hinzu - einmalig
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(userLocationMap);

  // Variable für den Marker (damit wir sie später entfernen können)
  let userMarker = null;

  // Event Listener für den Button
  findLocationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });

  // Funktion zur Anzeige der Position
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Setze die Ansicht auf die aktuelle Position
    userLocationMap.setView([latitude, longitude], 13);

    // Entferne den alten Marker, falls vorhanden
    if (userMarker) {
      userLocationMap.removeLayer(userMarker);
    }

    // Füge oder aktualisiere den Marker
    userMarker = L.marker([latitude, longitude])
      .addTo(userLocationMap)
      .bindPopup("You are here!")
      .openPopup();

    // Vergewissere dich, dass die Kartengröße richtig dargestellt wird
    setTimeout(() => {
      userLocationMap.invalidateSize();
    }, 200);
  }

  // Fehlerbehandlung für Geolocation
  function showError(error) {
    const errorMessages = {
      [error.PERMISSION_DENIED]: "User denied the request for Geolocation.",
      [error.POSITION_UNAVAILABLE]: "Location information is unavailable.",
      [error.TIMEOUT]: "The request to get user location timed out.",
      [error.UNKNOWN_ERROR]: "An unknown error occurred.",
    };
    alert(errorMessages[error.code] || "An unknown error occurred.");
  }
});
