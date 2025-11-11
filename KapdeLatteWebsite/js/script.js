/* Kapde Latte — minimal JS for interactions */

document.addEventListener('DOMContentLoaded', function(){
  // Menu toggle (for future mobile implementation)
  const menuToggle = document.getElementById('menu-toggle');
  if(menuToggle) menuToggle.addEventListener('click', ()=> document.body.classList.toggle('nav-open'));

  // Quickview: simple modal that shows placeholder content
  const quickview = document.getElementById('quickview');
  const qclose = document.getElementById('q-close');
  document.querySelectorAll('.btn-outline').forEach(btn=>{
    btn.addEventListener('click', function(e){
      if(!this.dataset.handle) return;
      e.preventDefault();
      const handle = this.dataset.handle;
      openQuickView(handle);
    })
  });
  function openQuickView(handle){
    if(!quickview) return;
    const content = document.getElementById('q-content');
    content.innerHTML = `<h3 style="font-family:Playfair Display, serif;">${handle.replace(/-/g,' ')}</h3><p class="muted">Quick preview content — replace with product details.</p><img src="assets/product-placeholder.jpg" alt="product" style="width:100%;max-width:360px;border-radius:8px;margin-top:12px;" />`;
    quickview.setAttribute('aria-hidden','false');
    quickview.classList.add('open');
  }
  if(qclose) qclose.addEventListener('click', ()=>{ if(quickview){ quickview.setAttribute('aria-hidden','true'); quickview.classList.remove('open'); } });

  // Newsletter form handling (client-side only)
  const nform = document.getElementById('newsletter-form');
  if(nform) nform.addEventListener('submit', function(e){ e.preventDefault(); const msg = document.getElementById('newsletter-msg'); msg.textContent = 'Thanks — you are on the list.'; nform.reset(); });

  // Contact form (client-side demo)
  const cform = document.getElementById('contact-form');
  if(cform) cform.addEventListener('submit', function(e){ e.preventDefault(); const m = document.getElementById('contact-msg'); m.textContent = 'Message sent — we will get back to you shortly.'; cform.reset(); });
});