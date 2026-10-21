import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { href: '#', label: 'GitHub', Icon: FaGithub },
    { href: '#', label: 'Twitter', Icon: FaTwitter },
    { href: '#', label: 'LinkedIn', Icon: FaLinkedin },
  ];

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/products', label: 'Products' },
  ];

  return (
    <footer className="container mx-auto rounded bg-[#087C7E] border-t border-neutral-900 px-6 py-12 md:px-10 md:py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {/* 1. Brand */}
        <div className="flex items-start gap-4">
          <Image
            src="/assets/furniture-logo.jpg"
            alt="serein logo"
            width={50}
            height={50}
            className="h-12 w-12 shrink-0 rounded-md object-contain"
          />
          <div>
            <p className="text-2xl font-bold tracking-widest text-black">serein.</p>
            <p className="mt-1 max-w-xs text-xs font-light leading-relaxed tracking-wide text-white">
              Considered furniture and objects for a more meaningful home.
            </p>
          </div>
        </div>

        {/* 2. Social */}
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
            Follow
          </h3>
          <div className="flex items-center gap-4 text-white">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transition-colors duration-200 hover:text-purple-600"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* 3. Company */}
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
            Company
          </h3>
          <ul className="space-y-3">
            {navLinks.map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-sm text-white transition-colors duration-200 hover:text-black"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Copyright */}
        <div className="flex items-end md:items-start lg:items-end lg:justify-end">
          <p className="text-[11px] font-light tracking-wide text-white md:text-xs lg:text-right">
            &copy; {currentYear} serein. &mdash; A Furniture Hub.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;







