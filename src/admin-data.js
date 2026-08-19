/**
 * MEDICAL ECOSYSTEM - Admin Portal Data Store
 */

export const systemHealthMetrics = {
  activeUsers: "1,420,850",
  verifiedDoctors: "18,450",
  accreditedLabs: "1,240",
  smartHospitals: "420",
  registeredPharmacies: "3,890",
  activeBloodDonors: "284,000",
  apiLatency: "38ms",
  uptime: "99.99%",
  securityStatus: "OPTIMAL (0 Vulnerabilities)",
  e2eEncryption: "AES-256-GCM Active"
};

export const registeredFacilities = [
  { id: "FAC-01", name: "City Smart Hospital & Heart Center", type: "Hospital", license: "DGHS-HOSP-2026-4421", status: "VERIFIED", admin: "Dr. Jalil" },
  { id: "FAC-02", name: "City Diagnostic Services & Lab", type: "Diagnostic Lab", license: "DGHS-LAB-2026-8819", status: "VERIFIED", admin: "Dr. Rehana" },
  { id: "FAC-03", name: "City Care Smart Pharmacy", type: "Pharmacy", license: "DGHS-DRUG-2026-9921", status: "VERIFIED", admin: "Tariqul Islam" },
  { id: "FAC-04", name: "Uttara General Care Hospital", type: "Hospital", license: "DGHS-HOSP-2026-3312", status: "PENDING_REVIEW", admin: "Dr. Faruq" }
];

export const userRoleBreakdown = [
  { role: "Patients", count: "1,240,000", accessLevel: "Patient Protected Data" },
  { role: "Doctors (BMDC Verified)", count: "18,450", accessLevel: "Clinical Orders & Medical History" },
  { role: "System Administrators", count: "8", accessLevel: "Full System Telemetry & RBAC Config" }
];
