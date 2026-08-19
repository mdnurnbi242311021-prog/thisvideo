import { getEcosystemDB } from './ecosystem-store.js';

document.addEventListener('DOMContentLoaded', () => {
  const db = getEcosystemDB();
  const logsContainer = document.getElementById('privacy-access-logs');
  if (logsContainer) {
    logsContainer.innerHTML = db.auditLogs.map(log => `
      <div style="background: #FAF8F5; border: 1px solid rgba(0,168,120,0.15); padding: 10px 14px; border-radius: 10px; margin-bottom: 8px; display: flex; justify-content: space-between; font-size: 0.85rem;">
        <span><strong>${log.actor}:</strong> ${log.action}</span>
        <span style="color: #64748B;">${log.time}</span>
      </div>
    `).join('');
  }

  document.getElementById('btn-download-my-data')?.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
    const a = document.createElement('a');
    a.setAttribute("href", dataStr);
    a.setAttribute("download", "MEDICAL_ECOSYSTEM_HEALTH_RECORD.json");
    a.click();
  });
});
