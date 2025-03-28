import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  phoneNumber: string; // Phone number with country code (e.g., "911234567890")
  message?: string; // Optional pre-filled message
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = "Hello! I'm interested in your products.",
}) => {
  // Create WhatsApp URL
  const getWhatsAppUrl = () => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 md:bottom-10 md:right-10 z-40 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition-all duration-300 hover:shadow-xl"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={28} className="text-white" />
    </a>
  );
};

export default WhatsAppButton;
