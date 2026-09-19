import { mockDelay } from './api';

export async function sendContactInquiry(contactData) {
  await mockDelay(600);
  // Future API: return api.post('/contact', contactData);
  return {
    success: true,
    ticketNumber: `INQ-${Math.floor(10000 + Math.random() * 90000)}`,
    message: 'Thank you for reaching out to Utkal Finance! We have received your inquiry and will respond within 24 hours.',
  };
}
