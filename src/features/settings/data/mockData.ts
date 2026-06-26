import type { Testimonial, NewsPost } from "../types";

export const portfolioOptions = [
  { value: "Parent",    label: "Parent"    },
  { value: "Alumni",    label: "Alumni"    },
  { value: "Student",   label: "Student"   },
  { value: "Staff",     label: "Staff"     },
  { value: "Guardian",  label: "Guardian"  },
  { value: "Community", label: "Community" },
];

export const newsCategoryOptions = [
  { value: "News",          label: "News"          },
  { value: "Events",        label: "Events"        },
  { value: "Announcements", label: "Announcements" },
  { value: "Sports",        label: "Sports"        },
  { value: "Academic",      label: "Academic"      },
];

export const authorOptions = [
  { value: "Admin",                  label: "Admin"                  },
  { value: "Mrs. Adaeze Okonkwo",    label: "Mrs. Adaeze Okonkwo"    },
  { value: "Mr. Segun Bello",        label: "Mr. Segun Bello"        },
  { value: "Dr. Funke Adesanya",     label: "Dr. Funke Adesanya"     },
  { value: "Mr. James Adetokunbo",   label: "Mr. James Adetokunbo"   },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "t1",
    fullName: "Mrs. Adaeze Okonkwo",
    portfolio: "Parent",
    photo: "https://i.pravatar.cc/150?img=47",
    comment: "Greenfield Academy has transformed my daughter's outlook on education. The teachers are caring, attentive, and genuinely invested in every child's growth. I couldn't ask for a better school.",
    createdAt: "14 Jan 2025",
  },
  {
    id: "t2",
    fullName: "Mr. James Adetokunbo",
    portfolio: "Alumni",
    photo: "https://i.pravatar.cc/150?img=12",
    comment: "Being a Greenfield alumnus gave me a strong academic foundation that shaped my career in engineering. The discipline and values instilled here still guide me today.",
    createdAt: "3 Feb 2025",
  },
  {
    id: "t3",
    fullName: "Chisom Nwosu",
    portfolio: "Student",
    photo: "https://i.pravatar.cc/150?img=32",
    comment: "I love going to school every day because the lessons are fun and the teachers make everything so easy to understand. My favourite subject is Biology.",
    createdAt: "10 Mar 2025",
  },
  {
    id: "t4",
    fullName: "Dr. Funke Adesanya",
    portfolio: "Parent",
    photo: "https://i.pravatar.cc/150?img=44",
    comment: "The administration is transparent and proactive. The new digital portal keeps me informed about my son's progress in real time. Greenfield sets the standard.",
    createdAt: "22 Mar 2025",
  },
  {
    id: "t5",
    fullName: "Mr. Segun Bello",
    portfolio: "Staff",
    photo: "https://i.pravatar.cc/150?img=15",
    comment: "Working at Greenfield for over eight years has been an incredibly rewarding experience. The school's commitment to teacher development and student outcomes is unmatched.",
    createdAt: "1 Apr 2025",
  },
  {
    id: "t6",
    fullName: "Emmanuel Obi",
    portfolio: "Alumni",
    photo: "https://i.pravatar.cc/150?img=67",
    comment: "I graduated from Greenfield seven years ago and I still visit whenever I can. The bonds formed here with classmates and teachers alike are lifelong.",
    createdAt: "8 Apr 2025",
  },
];

export const mockNewsPosts: NewsPost[] = [
  {
    id: "n1",
    title: "2025 Graduation Ceremony — A Day to Remember",
    author: "Admin",
    category: "Events",
    content: "We are proud to celebrate the graduating class of 2025! The ceremony was held in the school auditorium and was attended by parents, staff, and dignitaries from across the state.",
    coverPhoto: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    featured: true,
    createdAt: "28 Mar 2025",
  },
  {
    id: "n2",
    title: "Annual Science Fair Showcases Brilliant Young Minds",
    author: "Mrs. Adaeze Okonkwo",
    category: "Academic",
    content: "This year's science fair exceeded all expectations with over 60 projects submitted by students across JSS1 to SSS3. Judges praised the creativity and rigour on display.",
    coverPhoto: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    featured: true,
    createdAt: "14 Feb 2025",
  },
  {
    id: "n3",
    title: "National Excellence Award: Greenfield Ranked #1 in Lagos",
    author: "Admin",
    category: "Announcements",
    content: "We are thrilled to announce that Greenfield Academy has been ranked the number one private secondary school in Lagos by the National Board of Education Excellence.",
    coverPhoto: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80",
    featured: true,
    createdAt: "5 Apr 2025",
  },
  {
    id: "n4",
    title: "Inter-House Sports Day 2025 — Green House Emerges Champions",
    author: "Mr. Segun Bello",
    category: "Sports",
    content: "The much-anticipated inter-house sports day was held last Friday on our main field. Students competed fiercely in track, field, and team events. Green House took the overall trophy.",
    coverPhoto: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
    featured: false,
    createdAt: "31 Jan 2025",
  },
  {
    id: "n5",
    title: "New Digital Learning Centre Now Open to Students",
    author: "Dr. Funke Adesanya",
    category: "News",
    content: "Greenfield Academy has officially launched its state-of-the-art Digital Learning Centre, equipped with 120 computers and high-speed internet access for all students.",
    coverPhoto: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
    featured: false,
    createdAt: "15 Jan 2025",
  },
  {
    id: "n6",
    title: "Parent-Teacher Forum Scheduled for April 26th",
    author: "Mr. James Adetokunbo",
    category: "Announcements",
    content: "Dear Parents and Guardians, the school management invites you to the bi-annual Parent-Teacher Forum scheduled for April 26th at the school hall from 9 AM.",
    coverPhoto: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    featured: false,
    createdAt: "10 Apr 2025",
  },
];

export const mockSchoolSettings = {
  name: "My School",
  motto: "Excellence Through Discipline",
  address: "14 Adewale Close, Ikeja, Lagos State",
  about: "",
  phone: "+234 803 456 7890",
  email: "info@myschool.edu.ng",
  facebook: "https://facebook.com/myschool",
  twitter: "https://twitter.com/myschool",
  whatsapp: "+234 803 456 7890",
};