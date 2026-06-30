import {
  Building2,
  Monitor,
  CreditCard,
  BarChart2,
  FileText,
  Bell,
} from "lucide-react";
import type { ElementType } from "react";

export interface Feature {
  icon: ElementType;
  title: string;
  description: string;
}

export interface Beneficiary {
  number: string;
  role: string;
  title: string;
  bullets: string[];
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  isPopular: boolean;
  features: string[];
  cta: string;
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: 5430, suffix: "", label: "Students managed" },
  { value: 500, suffix: "+", label: "Schools onboarded" },
  { value: 2, suffix: "", label: "Awards won" },
  { value: 24, suffix: "hrs", label: "Setup time" },
];

export const features: Feature[] = [
  {
    icon: Building2,
    title: "Structural Management",
    description:
      "Create and manage sessions, terms, classes, class groups and subjects. Your entire school structure in one view.",
  },
  {
    icon: Monitor,
    title: "E-Learning & CBT",
    description:
      "Share lesson materials, stream videos, manage curriculum and run full computer-based tests, all within the platform.",
  },
  {
    icon: CreditCard,
    title: "Online Registration & Payments",
    description:
      "Accept payments, issue receipts, and manage student, parent and teacher data — without paperwork or back-and-forth.",
  },
  {
    icon: BarChart2,
    title: "Daily Accounting",
    description:
      "Real-time income and expense tracking — daily, weekly, and quarterly. See your financial position without calling anyone.",
  },
  {
    icon: FileText,
    title: "Online Results",
    description:
      "Publish results once, parents access them immediately from anywhere. No printing, no waiting, no repeated calls to the office.",
  },
  {
    icon: Bell,
    title: "Events & Notifications",
    description:
      "Announce events, share updates and get real-time feedback from staff, students, and parents in seconds.",
  },
];

export const beneficiaries: Beneficiary[] = [
  {
    number: "01",
    role: "School Administrators",
    title: "Run your school from anywhere",
    bullets: [
      "Full visibility into revenue, attendance and academic progress",
      "Control who accesses what across the entire platform",
      "Communicate directly with staff and parents",
      "Generate reports and share with stakeholders in one click",
    ],
  },
  {
    number: "02",
    role: "Teachers & Finance Officers",
    title: "Less admin, more impact",
    bullets: [
      "Assign and track homework and holiday projects",
      "Upload scores, publish results and take attendance",
      "Design class timetables with built-in tools",
      "Process fees, generate receipts and keep daily records",
    ],
  },
  {
    number: "03",
    role: "Parents & Students",
    title: "Always in the loop",
    bullets: [
      "View results as soon as they are published",
      "Track attendance and assignment completion",
      "Access class timetables and online courses",
      "Stay notified of everything happening at school",
    ],
  },
];

export const steps: Step[] = [
  {
    number: "01",
    title: "Set up your school",
    description:
      "Create your school profile, configure classes, subjects, and fee structures. Onboard your staff and import your student list in minutes.",
  },
  {
    number: "02",
    title: "Manage operations",
    description:
      "Record attendance, collect fees, run CBT assessments and communicate with parents — all from your Schoolzy dashboard, every day.",
  },
  {
    number: "03",
    title: "Track performance",
    description:
      "Generate results at the end of every term, analyze academic trends, review financials, and share reports with stakeholders with one click.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Tunde Ibrahim",
    role: "Principal",
    location: "Abuja",
    quote:
      "Managing fee collection and attendance are no longer a headache. The difference is night and day.",
    rating: 5,
  },
  {
    name: "Ngozi Kalu",
    role: "Parent",
    location: "Port Harcourt",
    quote:
      "The CBT module has completely replaced our manual exam process. Students take tests on their own devices and results are ready instantly. Parents love the transparency.",
    rating: 5,
  },
  {
    name: "Blessing Akpan",
    role: "Class Teacher",
    location: "Enugu",
    quote:
      "I used to spend three days compiling term results. Now it takes under 30 minutes. The grading system is flexible and the broadsheet exports perfectly.",
    rating: 5,
  },
  {
    name: "Biodun Okafor",
    role: "School Owner",
    location: "Lagos",
    quote:
      "The payment tracking alone has transformed our administration. I can see exactly what's been paid and what's outstanding at any moment.",
    rating: 5,
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "₦25,000",
    period: "/month",
    isPopular: false,
    cta: "Get started",
    features: [
      "Up to 200 students",
      "Student & staff management",
      "Attendance tracking",
      "Results & grading",
      "Fee payment tracking",
      "CBT module",
      "Parent portal",
    ],
  },
  {
    name: "Standard",
    price: "₦55,000",
    period: "/month",
    isPopular: true,
    cta: "Get started",
    features: [
      "All Basic features",
      "Up to 500 students",
      "CBT module (unlimited tests)",
      "Parent portal access",
      "Expense & finance tracking",
      "SMS & email notifications",
      "Priority support",
    ],
  },
  {
    name: "Premium",
    price: "₦95,000",
    period: "/month",
    isPopular: false,
    cta: "Get started",
    features: [
      "All Standard features",
      "Unlimited students",
      "Multi-branch management",
      "Custom domain",
      "API access & integrations",
      "Dedicated account manager",
      "24/7 phone support",
    ],
  },
];

export const footerColumns: FooterColumn[] = [
  {
    heading: "Quick Links",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Referral Partnership Program", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Ashpot Learn", href: "#" },
      { label: "EarlyStart Coding Program for Kids", href: "#" },
      { label: "Ashpot Community Facebook Group", href: "#" },
      { label: "Ashpot Community Slack Workspace", href: "#" },
    ],
  },
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export const contactInfo = {
  address: "11 Nicholas Street Aba, Abia State, Nigeria. Postal Code: 450721",
  email: "info@ashpotmicrosystems.com",
  website: "https://ashpotmicrosystems.com",
  phones: ["+234 806 340 9307", "+234 812 787 0201"],
};

export const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
];

export function avatarColor(name: string): string {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}