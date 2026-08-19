import confetti from 'canvas-confetti';
import { bmdcDoctors } from './data.js';
import { initHealthcareIdCard } from './healthcare-id.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive 3D Parallax Tilt for Hero AI Robot Visual
  const dioramaBox = document.getElementById('diorama-container-box');
  const heroStage = document.getElementById('hero-interactive-stage');

  if (heroStage && dioramaBox) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateY = (x / rect.width) * 14;
      const rotateX = -(y / rect.height) * 12;
      dioramaBox.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    heroStage.addEventListener('mouseleave', () => {
      dioramaBox.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  }

  initHealthcareIdCard();

  const langBtn = document.getElementById('lang-switch-btn');
  let currentLang = 'bn';
  langBtn?.addEventListener('click', () => {
    currentLang = currentLang === 'bn' ? 'en' : 'bn';
    langBtn.innerHTML = currentLang === 'bn' ? '<span>🌐 EN</span>' : '<span>🌐 বাংলা</span>';
  });

  const doctorsGrid = document.getElementById('doctors-list-grid');
  const searchInput = document.getElementById('doctor-search-input');
  const specialtySelect = document.getElementById('doctor-specialty-select');
  const locationSelect = document.getElementById('doctor-location-select');
  const searchBtn = document.getElementById('btn-trigger-doctor-search');
  const heroQuickSearchInput = document.getElementById('hero-quick-search-input');
  const heroQuickSearchTrigger = document.getElementById('hero-quick-search-trigger');

  function handleHeroSearch() {
    if (!heroQuickSearchInput) return;
    const query = heroQuickSearchInput.value.trim();
    if (query) {
      if (searchInput) searchInput.value = query;
      document.getElementById('doctors')?.scrollIntoView({ behavior: 'smooth' });
      filterDoctors();
    }
  }

  heroQuickSearchTrigger?.addEventListener('click', handleHeroSearch);
  heroQuickSearchInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleHeroSearch(); });

  function renderDoctorsList(docs) {
    if (!doctorsGrid) return;
    if (docs.length === 0) {
      doctorsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748B;">🔍 কোনো ডাক্তার পাওয়া যায়নি।</div>`;
      return;
    }
    doctorsGrid.innerHTML = docs.map(doc => `
      <div class="doctor-profile-card">
        <div>
          <div class="doc-card-header">
            <img src="${doc.avatar}" alt="${doc.name}" class="doc-avatar-img" />
            <div>
              <span class="doc-bmdc-badge">✔ ${doc.bmdcReg}</span>
              <h4 class="doc-name-text">${doc.name}</h4>
              <div class="doc-spec-text">${doc.specialty}</div>
              <div class="doc-hosp-text">${doc.hospital}</div>
            </div>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 0.82rem;">
            <span style="color: #F59E0B; font-weight: 700;">★ ${doc.rating} (${doc.reviewCount})</span>
            <strong style="color: #7C3AED; font-size: 1rem;">${doc.consultationFee}</strong>
          </div>
          <button class="btn-book-slot" data-doc-name="${doc.name}" data-doc-spec="${doc.specialty}">
            <span>অ্যাপয়েন্টমেন্ট নিন</span><span>➔</span>
          </button>
        </div>
      </div>
    `).join('');

    doctorsGrid.querySelectorAll('.btn-book-slot').forEach(btn => {
      btn.addEventListener('click', () => {
        openBookingModal(btn.getAttribute('data-doc-name'), btn.getAttribute('data-doc-spec'));
      });
    });
  }

  function filterDoctors() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const spec = specialtySelect?.value || 'all';
    const loc = locationSelect?.value || 'all';
    const filtered = bmdcDoctors.filter(doc => {
      const matchQ = !q || doc.name.toLowerCase().includes(q) || doc.specialty.toLowerCase().includes(q) || (doc.nameEn && doc.nameEn.toLowerCase().includes(q));
      const matchSpec = spec === 'all' || doc.specialtyKey === spec;
      const matchLoc = loc === 'all' || doc.district === loc;
      return matchQ && matchSpec && matchLoc;
    });
    renderDoctorsList(filtered);
  }

  renderDoctorsList(bmdcDoctors);
  searchBtn?.addEventListener('click', filterDoctors);
  searchInput?.addEventListener('input', filterDoctors);
  specialtySelect?.addEventListener('change', filterDoctors);
  locationSelect?.addEventListener('change', filterDoctors);

  const bookModal = document.getElementById('modal-doctor-booking');
  const closeBookBtn = document.getElementById('btn-close-booking-modal');

  function openBookingModal(name, spec) {
    if (bookModal) {
      document.getElementById('booking-modal-doc-name').textContent = `অ্যাপয়েন্টমেন্ট: ${name}`;
      document.getElementById('booking-modal-doc-spec').textContent = spec;
      bookModal.classList.add('active');
    }
  }

  closeBookBtn?.addEventListener('click', () => bookModal?.classList.remove('active'));

  document.getElementById('form-confirm-booking')?.addEventListener('submit', (e) => {
    e.preventDefault();
    bookModal?.classList.remove('active');
    alert('🎉 অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে!');
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 }, colors: ['#7C3AED', '#EC4899', '#10B981'] });
  });

  window.triggerSOS = function() {
    alert('🚨 SOS Emergency Dispatcher: 999');
    confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 }, colors: ['#FF5757', '#DC2626', '#F43F5E'] });
  };

  document.getElementById('btn-hero-sos')?.addEventListener('click', window.triggerSOS);

  const aiModal = document.getElementById('modal-home-ai');
  const aiClose = document.getElementById('btn-close-home-ai');
  const aiInput = document.getElementById('home-ai-input');
  const aiSend = document.getElementById('home-ai-send');
  const aiMessages = document.getElementById('home-ai-messages');

  function openAIModal() { aiModal?.classList.add('active'); aiInput?.focus(); }
  function closeAIModal() { aiModal?.classList.remove('active'); }

  document.getElementById('btn-hero-ask-ai')?.addEventListener('click', openAIModal);
  document.getElementById('dock-btn-ai')?.addEventListener('click', openAIModal);
  document.getElementById('orbit-btn-ai')?.addEventListener('click', openAIModal);
  document.getElementById('floating-ai-robot-btn')?.addEventListener('click', openAIModal);
  document.getElementById('nav-trigger-ai')?.addEventListener('click', (e) => { e.preventDefault(); openAIModal(); });
  document.getElementById('hero-speech-bubble')?.addEventListener('click', openAIModal);
  aiClose?.addEventListener('click', closeAIModal);

  function handleAISend() {
    const q = aiInput.value.trim();
    if (!q) return;
    const userMsg = document.createElement('div');
    userMsg.style.cssText = "background: #7C3AED; color: #ffffff; padding: 10px 14px; border-radius: 14px; font-size: 0.88rem; align-self: flex-end; max-width: 80%;";
    userMsg.textContent = q;
    aiMessages.appendChild(userMsg);
    aiInput.value = '';
    aiMessages.scrollTop = aiMessages.scrollHeight;
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.style.cssText = "background: #F3EEFF; color: #1E1B4B; padding: 12px 14px; border-radius: 14px; font-size: 0.88rem; align-self: flex-start; max-width: 85%; line-height: 1.5; border: 1px solid rgba(139,92,246,0.15);";
      botMsg.innerHTML = generateAIAnswer(q);
      aiMessages.appendChild(botMsg);
      aiMessages.scrollTop = aiMessages.scrollHeight;
    }, 600);
  }

  aiSend?.addEventListener('click', handleAISend);
  aiInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleAISend(); });

  function generateAIAnswer(query) {
    const q = query.toLowerCase();
    if (q.includes('doctor') || q.includes('ডাক্তার')) return `🩺 <a href="/doctor.html">ডাক্তার পোর্টাল দেখুন ➔</a>`;
    if (q.includes('blood') || q.includes('রক্ত')) return `🩸 <a href="/blood.html">রক্তদান নেটওয়ার্ক ➔</a>`;
    if (q.includes('id') || q.includes('healthcare')) return `🪪 <a href="/portal.html">পেশেন্ট পোর্টাল ➔</a>`;
    return `✦ MEDICAL ECOSYSTEM AI: আপনার স্বাস্থ্য জিজ্ঞাসায় সাহায্য করতে প্রস্তুত।`;
  }

  document.getElementById('btn-copy-id')?.addEventListener('click', () => {
    navigator.clipboard?.writeText('ME-BD-47290344');
    alert('📋 Healthcare ID কপি করা হয়েছে!');
  });
});
