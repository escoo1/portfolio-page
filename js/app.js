document.addEventListener("DOMContentLoaded", () => {
  // Formularvalidierung
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
      alert(`Thank you, ${name}, for your message!`);
      contactForm.reset(); // Formular zurücksetzen
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
});
