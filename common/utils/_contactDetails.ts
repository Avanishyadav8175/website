import { COMPANY_NUMBER, COMPANY_WHATSAPP } from "../constants/companyDetails";

export const whatsappContact = (message?: string): string => {
  const NUMBER = COMPANY_WHATSAPP;
  const msg = message || `Hey, I have a query`;

  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(msg)}`;
};

export const mobileContact = (): string => `tel:${COMPANY_NUMBER}`;
