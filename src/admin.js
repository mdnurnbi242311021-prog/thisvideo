import confetti from 'canvas-confetti';
import { systemHealthMetrics, registeredFacilities } from './admin-data.js';
import { getEcosystemDB } from './ecosystem-store.js';

document.addEventListener('DOMContentLoaded', () => {
  const db = getEcosystemDB();
  document.getElementById('metric-users').textContent = systemHealthMetrics.activeUsers;
  document.getElementById('metric-doctors').textContent = systemHealthMetrics.verifiedDoctors;
  document.getElementById('metric-hospitals').textContent = systemHealthMetrics.smartHospitals;
  document.getElementById('metric-uptime').textContent = systemHealthMetrics.uptime;

  const facTable = document.getElementById('admin-facilities-table-body');
  if (facTable) {
    facTable.innerHTML = registeredFacilities.map(f => `
      <tr>
        <td style="font-weight: 700; color: #1E293B;">${f.name}</td>
        <td>${f.type}</td>
        <td style="font-family: monospace; font-size: 0.78rem;">${f.license}</td>
        <td><span class="status-badge-clean ${f.status === 'VERIFIED' ? 'status-completed' : 'status-pending'}">${f.status}</span></td>
        <td><button class="btn-report-action" onclick="alert('ভেরিফিকেশন ডিটেইলস')" style="padding: 4px 8px; font-size: 0.72rem;">${f.status === 'VERIFIED' ? 'Manage' : 'Approve'}</button></td>
      </tr>
    `).join('');
  }

  const auditContainer = document.getElementById('admin-live-audit-logs');
  if (auditContainer) {
    auditContainer.innerHTML = db.auditLogs.map(a => `
      <div style="background: #E8F3ED; padding: 10px 12px; border-radius: 10px; font-size: 0.8rem; margin-bottom: 6px; display: flex; justify-content: space-between;">
        <span><strong>${a.actor}:</strong> ${a.action}</span>
        <span style="color: #64748B;">${a.time}</span>
      </div>
    `).join('');
  }

  document.getElementById('btn-admin-backup')?.addEventListener('click', () => {
    alert('📥 ডাটাবেজ ব্যাকআপ সম্পন্ন!');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 }, colors: ['#00A878', '#10B981'] });
  });
});
