export interface Certificate {
  id: string;
  learnerName: string;
  courseName: string;
  instituteName: string;
  completionDate: string;
  blockchainHash: string;
  userId: string;
  createdAt: string;
}

export async function generateBlockchainHash(
  learnerName: string,
  courseName: string,
  instituteName: string,
  completionDate: string
): Promise<string> {
  const data = `${learnerName}${courseName}${instituteName}${completionDate}${Date.now()}`;
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function issueCertificate(
  learnerName: string,
  courseName: string,
  instituteName: string,
  completionDate: string,
  userId: string,
  blockchainHash: string
): Certificate {
  const certificate: Certificate = {
    id: crypto.randomUUID(),
    learnerName,
    courseName,
    instituteName,
    completionDate,
    blockchainHash,
    userId,
    createdAt: new Date().toISOString(),
  };

  const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
  certificates.push(certificate);
  localStorage.setItem('certificates', JSON.stringify(certificates));

  return certificate;
}

export async function verifyCertificate(hashOrId: string): Promise<Certificate | null> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const certificates: Certificate[] = JSON.parse(localStorage.getItem('certificates') || '[]');
  return certificates.find(cert =>
    cert.blockchainHash === hashOrId || cert.id === hashOrId
  ) || null;
}

export function getUserCertificates(userId: string): Certificate[] {
  const certificates: Certificate[] = JSON.parse(localStorage.getItem('certificates') || '[]');
  return certificates.filter(cert => cert.userId === userId);
}
