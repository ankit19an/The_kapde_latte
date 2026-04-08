const revealElements = () => document.querySelectorAll(".kl-reveal");

const revealNow = (elements) => {
  elements.forEach((element) => element.classList.add("is-visible"));
};

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
      threshold: 0.12,
    }
  );

  revealElements().forEach((element) => observer.observe(element));

  document.addEventListener("shopify:section:load", (event) => {
    const scopedReveals = event.target.querySelectorAll(".kl-reveal");
    scopedReveals.forEach((element) => observer.observe(element));
  });
} else {
  revealNow(revealElements());
}
