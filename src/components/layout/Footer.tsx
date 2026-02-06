import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-earth text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src="/logo.png" alt="Shri Shradhanand Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">Shri Shradhanand</h3>
                <p className="text-sm opacity-80">Anathalay, Nagpur</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              Providing love, care, and hope to orphaned children since 1952. 
              Together, we can make a difference in their lives.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Children Needs", href: "/needs" },
                { name: "Donate", href: "/donate" },
                { name: "Earn & Support", href: "/earn" },
                { name: "Events & Media", href: "/events" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Get Involved</h4>
            <ul className="space-y-3">
              {[
                "Donate Food & Clothes",
                "Sponsor a Child",
                "Volunteer With Us",
                "Corporate Partnership",
                "Fundraise for Us",
                "Spread the Word",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 opacity-80 flex-shrink-0 mt-0.5" />
                <span className="text-sm opacity-80">
                  123 Dharampeth, Near Main Road,<br />
                  Nagpur, Maharashtra 440010
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 opacity-80" />
                <a href="tel:+917122555555" className="text-sm opacity-80 hover:opacity-100">
                  +91 712 255 5555
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 opacity-80" />
                <a href="mailto:info@shradhanand.org" className="text-sm opacity-80 hover:opacity-100">
                  info@shradhanand.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-60">
              © {new Date().getFullYear()} Shri Shradhanand Anathalay. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm opacity-60 hover:opacity-100">Privacy Policy</a>
              <a href="#" className="text-sm opacity-60 hover:opacity-100">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
