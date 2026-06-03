import './styles/landing.css';

const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.14 });

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const form = document.getElementById("signupForm");
    const validators = {
      name: (value) => value.trim().length >= 2 ? "" : "Ingresa tu nombre.",
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Ingresa un correo valido.",
      profile: (value) => value ? "" : "Selecciona tu perfil."
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;
      Object.keys(validators).forEach((field) => {
        const input = form.elements[field];
        const error = validators[field](input.value);
        document.getElementById(field + "Error").textContent = error;
        if (error) valid = false;
      });

      if (!valid) return;
      const entries = JSON.parse(localStorage.getItem("closetSwapLeads") || "[]");
      entries.push({
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        profile: form.elements.profile.value,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("closetSwapLeads", JSON.stringify(entries));
      document.getElementById("successBox").style.display = "block";
      form.reset();
    });

