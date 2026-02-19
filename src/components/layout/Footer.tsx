import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

interface FooterProps {
  ashramName?: string;
  basePath?: string;
}

const Footer = ({ ashramName, basePath = '' }: FooterProps) => {
  const displayName = ashramName || 'Ashram Platform';
  
  const quickLinks = basePath ? [
    { name: "About Us", href: `${basePath}/about` },
    { name: "Children Needs", href: `${basePath}/needs` },
    { name: "Donate", href: `${basePath}/donate` },
    { name: "Earn & Support", href: `${basePath}/earn` },
    { name: "Events & Media", href: `${basePath}/events` },
    { name: "Contact Us", href: `${basePath}/contact` },
  ] : [
    { name: "Browse Ashrams", href: "/" },
    { name: "Sign In", href: "/auth" },
  ];

  return (
    <footer className="bg-earth text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src="/logo.png" alt={displayName} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">{displayName}</h3>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              Supporting ashrams and orphanages across India. Together, we can make a difference.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <a key={index} href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Get Involved</h4>
            <ul className="space-y-3">
              {["Donate Food & Clothes", "Sponsor a Child", "Volunteer With Us", "Corporate Partnership", "Fundraise for Us", "Spread the Word"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 opacity-80 flex-shrink-0 mt-0.5" />
                <span className="text-sm opacity-80">Contact ashram for address</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 opacity-80" />
                <span className="text-sm opacity-80">See ashram details</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 opacity-80" />
                <span className="text-sm opacity-80">See ashram details</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-60">© {new Date().getFullYear()} {displayName}. All rights reserved.</p>
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
