(() => {
  // Année
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Menu mobile
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  function setMobile(open) {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute("aria-expanded", String(open));
    mobileNav.style.display = open ? "block" : "none";
  }

  if (toggle && mobileNav) {
    setMobile(false);
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      setMobile(!open);
    });

    // Fermer au clic
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => setMobile(false));
    });
  }

  // Formulaire (démo) — à connecter à un service d’emailing
  const form = document.getElementById("leadForm");
  if (!form) return;

  const status = form.querySelector(".form-status");

  function setStatus(msg) {
    if (status) status.textContent = msg || "";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("");

    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const consent = data.get("consent") === "on";

    if (!email || !email.includes("@")) {
      setStatus("Merci d’indiquer un email valide.");
      form.querySelector('input[name="email"]')?.focus();
      return;
    }
    if (!consent) {
      setStatus("Merci de cocher l’accord pour recevoir les emails.");
      return;
    }

    // ✅ Connecter ici à Brevo/Mailchimp/ConvertKit via un endpoint
    // await fetch("https://ton-endpoint.com/subscribe", { method:"POST", headers:{...}, body: JSON.stringify({ email }) })

    setStatus("C’est bon 🙌 Tu recevras les ressources très bientôt.");
    form.reset();
  });
})();
