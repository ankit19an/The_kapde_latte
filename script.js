const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const cartToggle = document.querySelector(".cart-toggle");
const cartPanel = document.querySelector(".cart-panel");
const cartClose = document.querySelector(".cart-close");
const overlay = document.querySelector("[data-overlay]");
const cartItemsContainer = document.querySelector("[data-cart-items]");
const cartTotal = document.querySelector("[data-cart-total]");
const cartCount = document.querySelector("[data-cart-count]");
const filterChips = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll(".product-card");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const subscribeForms = document.querySelectorAll(".subscribe-form");
const searchToggle = document.querySelector(".search-toggle");
const yearNodes = document.querySelectorAll("[data-year]");
const revealNodes = document.querySelectorAll(".reveal");

const cart = [];

const formatCurrency = (value) =>
  `Rs. ${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value)}`;

const renderCart = () => {
  if (!cartItemsContainer || !cartTotal || !cartCount) {
    return;
  }

  cartCount.textContent = String(cart.length);

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="cart-empty">Your bag is empty. Add a few favorites to see them here.</p>';
    cartTotal.textContent = formatCurrency(0);
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <article class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <span>Added to your edit</span>
          </div>
          <span class="cart-item-price">${formatCurrency(item.price)}</span>
        </article>
      `
    )
    .join("");

  cartTotal.textContent = formatCurrency(total);
};

const setCartOpen = (isOpen) => {
  if (!cartPanel || !overlay || !cartToggle) {
    return;
  }

  cartPanel.classList.toggle("is-open", isOpen);
  cartPanel.setAttribute("aria-hidden", String(!isOpen));
  cartToggle.setAttribute("aria-expanded", String(isOpen));
  overlay.hidden = !isOpen;
  document.body.style.overflow = isOpen ? "hidden" : "";
};

const setMenuOpen = (isOpen) => {
  if (!siteNav || !menuToggle) {
    return;
  }

  siteNav.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
};

menuToggle?.addEventListener("click", () => {
  setMenuOpen(!siteNav.classList.contains("is-open"));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 820) {
      setMenuOpen(false);
    }
  });
});

cartToggle?.addEventListener("click", () => {
  setCartOpen(!cartPanel.classList.contains("is-open"));
});

cartClose?.addEventListener("click", () => setCartOpen(false));
overlay?.addEventListener("click", () => setCartOpen(false));

searchToggle?.addEventListener("click", () => {
  document.querySelector("#featured")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;

    filterChips.forEach((currentChip) => {
      currentChip.classList.toggle("is-active", currentChip === chip);
    });

    productCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.hidden = !matches;
    });
  });
});

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cart.push({
      name: button.dataset.product,
      price: Number(button.dataset.price),
    });

    renderCart();
    setCartOpen(true);

    const originalLabel = button.textContent;
    button.textContent = "Added";

    window.setTimeout(() => {
      button.textContent = originalLabel;
    }, 900);
  });
});

subscribeForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailField = form.querySelector('input[type="email"]');
    const message = form.querySelector("[data-form-message]");
    const email = emailField?.value.trim();

    if (!emailField || !message) {
      return;
    }

    if (!email) {
      message.textContent = "Please enter your email address.";
      return;
    }

    message.textContent = `Thanks, ${email}. You are on the list.`;
    form.reset();
  });
});

yearNodes.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

renderCart();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}
