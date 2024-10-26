document.addEventListener("DOMContentLoaded", () => {
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

  let userLocationMap; // Variable für die Leaflet Map

  findLocationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Zerstören der bestehenden Karte, falls vorhanden
    if (userLocationMap) {
      userLocationMap.off(); // Entferne alle Event-Listener
      userLocationMap.remove(); // Entferne die Karte aus dem DOM
    }

    // Initialisiere die Leaflet-Karte erneut
    userLocationMap = L.map("map", {
      center: [latitude, longitude],
      zoom: 13,
      maxZoom: 18,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(userLocationMap);

    // Füge einen Marker hinzu
    L.marker([latitude, longitude])
      .addTo(userLocationMap)
      .bindPopup("You are here!")
      .openPopup();

    // Dynamisches Neurendern der Kartengröße sicherstellen
    userLocationMap.whenReady(() => {
      userLocationMap.invalidateSize();
    });
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  // Setze die Standard-Icons von Leaflet manuell
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
});
