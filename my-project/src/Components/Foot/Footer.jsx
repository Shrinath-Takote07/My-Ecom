import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = {
    shop: "shop",
    help: "help",
    about: "about",
    legal: "legal",
  };

  const footerLinks = {
    shop: [
      { name: "Men's Fashion", path: "/category/men" },
      { name: "Women's Fashion", path: "/category/women" },
      { name: "Kids & Baby", path: "/category/kids" },
      { name: "Electronics", path: "/electronics" },
      { name: "Home & Kitchen", path: "/category/home" },
      { name: "Beauty & Wellness", path: "/beauty" },
      { name: "Sports & Outdoors", path: "/category/sports" },
      { name: "Books & Stationery", path: "/category/books" },
    ],
    help: [
      { name: "Help Center", path: "/help" },
      { name: "Order Tracking", path: "/track-order" },
      { name: "Shipping Policy", path: "/shipping" },
      { name: "Returns & Refunds", path: "/returns" },
      { name: "Size Guide", path: "/size-guide" },
      { name: "Contact Us", path: "/contact" },
      { name: "FAQs", path: "/faqs" },
      { name: "Store Locator", path: "/stores" },
    ],
    about: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Press & Media", path: "/press" },
      { name: "Investor Relations", path: "/investors" },
      { name: "Sustainability", path: "/sustainability" },
      { name: "Affiliate Program", path: "/affiliate" },
      { name: "Bulk Orders", path: "/bulk-orders" },
      { name: "Partner With Us", path: "/partners" },
    ],
    legal: [
      { name: "Terms of Service", path: "/terms" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Accessibility", path: "/accessibility" },
      { name: "Modern Slavery Act", path: "/modern-slavery" },
      { name: "Tax Strategy", path: "/tax-strategy" },
    ],
  };

  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "MasterCard", icon: "💳" },
    { name: "PayPal", icon: "🔵" },
    { name: "Apple Pay", icon: "🍎" },
    { name: "Google Pay", icon: "📱" },
    { name: "Amazon Pay", icon: "🅰️" },
    { name: "Klarna", icon: "💖" },
    { name: "Afterpay", icon: "⏱️" },
  ];

  const socialMedia = [
    { icon: Facebook, name: "Facebook", color: "hover:text-blue-600" },
    { icon: Twitter, name: "Twitter", color: "hover:text-blue-400" },
    { icon: Instagram, name: "Instagram", color: "hover:text-pink-600" },
    { icon: Youtube, name: "YouTube", color: "hover:text-red-600" },
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "Safe & Secure Payments",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "We're here to help",
    },
    {
      icon: CreditCard,
      title: "Easy Returns",
      description: "30-Day Return Policy",
    },
  ];

  return (
    // <footer className="bg-gray-900 text-white mt-12">
    <footer className="bg-gray-900 text-white mt-12">
      {/* className="container mx-auto px-3 sm:px-4 mt-6 sm:mt-8" */}
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-800 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">Don't Miss Out!</h3>
              <p className="text-gray-200">
                Subscribe for exclusive deals & updates
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-1">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <button className="bg-white text-purple-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{feature.title}</h4>
                    <p className="text-gray-300 text-xs">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-8 px-4">
        <div className="container mx-auto">
          {/* Desktop View */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Logo & Description */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                  <span className="text-xl font-bold">=</span>
                </div>
                <h2 className="text-2xl font-bold">CLASSYSHOP</h2>
              </div>
              <p className="text-gray-300 text-sm mb-6">
                Your one-stop destination for all your shopping needs. Quality
                products at unbeatable prices.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-purple-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-purple-400" />
                  <span>support@classyshop.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-purple-400" />
                  <span>123 Commerce St, City, Country</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-3">
                {socialMedia.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href="#"
                      className={`w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center ${social.color} transition-colors`}
                      aria-label={social.name}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links - Desktop */}
            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key}>
                <h3 className="font-bold text-lg mb-4 capitalize">{key}</h3>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Accordion View */}
          <div className="lg:hidden space-y-4">
            {/* Logo & Description for Mobile */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                  <span className="text-lg font-bold">=</span>
                </div>
                <h2 className="text-xl font-bold">CLASSYSHOP</h2>
              </div>
              <p className="text-gray-300 text-sm">
                Your one-stop shopping destination
              </p>
            </div>

            {/* Accordion Sections */}
            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key} className="border-b border-gray-800">
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full flex items-center justify-between py-3 text-left"
                >
                  <h3 className="font-bold capitalize">{key}</h3>
                  {openSection === key ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>

                {openSection === key && (
                  <div className="pb-4">
                    <ul className="grid grid-cols-2 gap-2">
                      {links.map((link, index) => (
                        <li key={index}>
                          <Link
                            to={link.path}
                            className="text-gray-300 hover:text-white transition-colors text-sm py-1 block"
                            onClick={() => setOpenSection(null)}
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {/* Contact Info for Mobile */}
            <div className="pt-4">
              <h3 className="font-bold mb-3">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-purple-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-purple-400" />
                  <span>support@Clashshop.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-800 py-6 px-4 border-t border-gray-700">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-2">We Accept</h4>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <span>{method.icon}</span>
                    <span>{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* App Store Badges */}
              <div className="flex gap-2">
                <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <span className="text-xl">🍏</span>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <span className="text-xl">▶️</span>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} CLASSYSHOP. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-2">
                {footerLinks.legal.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="text-gray-400 hover:text-white text-xs transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Made with</span>
              <Heart size={14} className="text-red-500 fill-red-500" />
              <span className="text-gray-400">for shoppers everywhere</span>
            </div>
          </div>

          {/* Mobile Social Media */}
          <div className="md:hidden flex justify-center gap-4 mt-4">
            {socialMedia.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href="#"
                  className={`w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center ${social.color} transition-colors`}
                  aria-label={social.name}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Help Button Floating on Mobile */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
        <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-colors">
          <HelpCircle size={24} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
