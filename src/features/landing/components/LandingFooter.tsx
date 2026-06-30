

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.892h-2.33v6.987C18.343 21.128 22 16.991 22 12Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V9.94H5.67v8.4h2.67ZM7 8.78a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1ZM18.34 18.34v-4.62c0-2.47-1.32-3.62-3.08-3.62-1.42 0-2.06.78-2.41 1.33V9.94h-2.67c.04.75 0 8.4 0 8.4h2.67v-4.69c0-.25.02-.5.1-.68.2-.5.67-1.03 1.45-1.03 1.02 0 1.43.78 1.43 1.92v4.48h2.51Z" />
    </svg>
  );
}

const socialLinks = [
  { Icon: XIcon, label: "X (Twitter)", href: "#" },
  { Icon: FacebookIcon, label: "Facebook", href: "#" },
  { Icon: LinkedinIcon, label: "LinkedIn", href: "#" },
];

const quickLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Referral Partnership Program", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const resourceLinks = [
  { label: "Ashpot Learn", href: "#" },
  { label: "EarlyStart Coding Program for Kids", href: "#" },
  { label: "Ashpot Community Facebook Group", href: "#" },
  { label: "Ashpot Community Slack Workspace", href: "#" },
];

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

export default function LandingFooter() {
  return (
    <footer className="w-full bg-bg-soft">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 sm:col-span-2">
            <a href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-white"
                >
                  <path
                    d="M12 3 2 8l10 5 8-4.18V17h2V8L12 3Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6 11.5V16c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.5l-6 3-6-3Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="font-jakarta font-bold text-xl text-text-primary lowercase">
                schoolzy
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm font-jakarta text-text-secondary leading-relaxed">
              The all-in-one school management platform built for Nigerian
              schools. Manage students, staff, results, fees, and CBT exams
              from a single dashboard.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-jakarta font-semibold text-text-primary">
              Quick Links
            </h4>
            <ul className="mt-5 flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-jakarta text-text-secondary hover:text-brand-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-jakarta font-semibold text-text-primary">
              Resources
            </h4>
            <ul className="mt-5 flex flex-col gap-3.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-jakarta text-text-secondary hover:text-brand-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-jakarta font-semibold text-text-primary">
              Product
            </h4>
            <ul className="mt-5 flex flex-col gap-3.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-jakarta text-text-secondary hover:text-brand-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-jakarta font-semibold text-text-primary">
              Contact
            </h4>
            <ul className="mt-5 flex flex-col gap-3.5">
              <li>
                <a
                  href="https://ashpotmicrosystems.com"
                  className="text-sm font-jakarta text-text-secondary hover:text-brand-primary transition-colors"
                >
                  https://ashpotmicrosystems.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ashpotmicrosystems.com"
                  className="text-sm font-jakarta text-text-secondary hover:text-brand-primary transition-colors"
                >
                  info@ashpotmicrosystems.com
                </a>
              </li>
              <li className="text-sm font-jakarta text-text-secondary leading-relaxed">
                +234 806 340 9307
                <br />
                +234 812 787 0201
              </li>
              <li className="text-sm font-jakarta text-text-secondary leading-relaxed">
                11 Nicholas Street Aba, Abia State Nigeria.
                <br />
                Postal Code: 450721.
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-border-line03" />

        {/* Bottom row */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-8">
          <p className="text-sm font-jakarta text-text-secondary">
            © 2026 Ashpot Micro Systems
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.Icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-line03 text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}