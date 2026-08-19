import confetti from 'canvas-confetti';
import { demoPatientRecord } from './data.js';

export function initHealthcareIdCard() {
  const card = document.getElementById('hologram-id-card');
  const sheen = document.getElementById('hologram-sheen');
  const copyBtn = document.getElementById('btn-copy-id');
  const flipBtn = document.getElementById('btn-flip-id');
  const downloadBtn = document.getElementById('btn-download-id');

  if (!card) return;
  let isFlipped = false;

  card.addEventListener('mousemove', (e) => {
    if (isFlipped) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -14;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 14;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    if (sheen) {
      const sheenX = (x / rect.width) * 100;
      const sheenY = (y / rect.height) * 100;
      sheen.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(110, 231, 183, 0.35) 0%, rgba(230, 184, 92, 0.2) 30%, transparent 60%)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    if (!isFlipped) card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });

  flipBtn?.addEventListener('click', () => {
    isFlipped = !isFlipped;
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.transform = isFlipped ? 'perspective(1000px) rotateY(180deg)' : 'perspective(1000px) rotateY(0deg)';
    const front = card.querySelector('.id-card-front');
    const back = card.querySelector('.id-card-back');
    if (front && back) {
      front.style.display = isFlipped ? 'none' : 'block';
      back.style.display = isFlipped ? 'block' : 'none';
    }
  });

  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(demoPatientRecord.id).then(() => {
      showToast('Healthcare ID কপি: ' + demoPatientRecord.id);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 }, colors: ['#00A878', '#6EE7B7'] });
    });
  });

  downloadBtn?.addEventListener('click', () => {
    showToast('ডিজিটাল হেলথ কার্ড ডাউনলোড হচ্ছে...');
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 }, colors: ['#00A878', '#E6B85C'] });
  });
}

export function showToast(message) {
  let container = document.getElementById('global-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'global-toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<span>✦</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
