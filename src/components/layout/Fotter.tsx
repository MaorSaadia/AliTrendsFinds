import { Facebook, Instagram, Twitter, Youtube, Copyright } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        {/* Content Section */}
        <div className="flex flex-col items-center text-center space-y-6 mb-6">
          {/* Logo/Brand Name */}
          <Link href="/">
            <span className="text-xl font-bold tracking-tight sm:text-2xl">
              <span className="text-orange-500">Ali</span>
              <span className="text-red-700">Trends</span>
              <span className="text-orange-500">Finds</span>
            </span>
          </Link>

          {/* About Text */}
          <p className="text-sm text-gray-600 max-w-md">
            We curate the best products from AliExpress to help you find amazing
            deals and trending items from trusted sellers.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://youtube.com"
              className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-6 w-6" />
            </a>
            <a
              href="https://facebook.com"
              className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center text-sm text-gray-500">
              <Copyright className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{currentYear} All Trends Finds. All rights reserved.</span>
            </div>
            <div className="text-sm text-gray-500">
              As an AliExpress Associate we earn from qualifying purchases.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
