import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#24670D] text-white ">
      {/* Main Footer Content */}
      <div className=" px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <div className="space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Madhyam Logo"
                width={150}
                height={40}
                className="brightness-0 invert"
              />
            </Link>

            <p className="text-white/80 text-sm leading-relaxed">
              Bringing you healthy, vibrant plants with expert care tips for a
              flourishing indoor or outdoor space
            </p>

            {/* Social Links */}
            {/* <div className="flex items-center gap-4">
              {[
                { icon: <Facebook size={20} />, href: "#" },
                { icon: <Instagram size={20} />, href: "#" },
                { icon: <Twitter size={20} />, href: "#" },
                { icon: <Linkedin size={20} />, href: "#" },
              ].map((social, index) => (
                
                  key={index}
                  href={social.href}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div> */}
          </div>

          {/* Pages Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Pages</h3>
            <ul className="space-y-3">
              {["Home", "About us", "Category", "Your WishList", "Blog"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-white/80 hover:text-white transition-colors duration-200 text-sm inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "Seeds",
                "Home plant",
                "Gardening Kits",
                "Office Plants",
                "Track Order",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors duration-200 text-sm inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Get in Touch
            </h3>
            <p className="text-sm text-white/80 mb-4">
              For any suggestion, Queries Please contact us at,
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+91-1234567891"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 text-sm"
                >
                  <Phone size={16} />
                  <span>+91-1234567891</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@logo.com"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 text-sm"
                >
                  <Mail size={16} />
                  <span>support@logo.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-center text-white/60 text-sm">
            Copyright © All right reserve to Nursery website 2020-{currentYear}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
