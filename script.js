document.querySelectorAll('[data-year]').forEach((el)=>el.textContent=new Date().getFullYear());
const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.primary-nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(isOpen));});}
const revealTargets=document.querySelectorAll('main > section, .service-card, .resource-list article');
revealTargets.forEach((element)=>element.setAttribute('data-reveal',''));
if('IntersectionObserver'in window){const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});revealTargets.forEach((element)=>observer.observe(element));}else{revealTargets.forEach((element)=>element.classList.add('is-visible'));}
