export interface LegalSection {
  id: string;
  title: string;
  body: string; // paragraphs separated by \n\n, lists prefixed with "- "
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  lastUpdated: "September 17, 2026",
  intro:
    'These Terms of Service ("Terms") govern your access to and use of Schoolzy, a school management software platform operated by Ashpot Microsystems Ltd. ("Ashpot", "we", "us", or "our").\n\nBy creating an account, accessing, or using Schoolzy, you agree to these Terms. If you are using Schoolzy on behalf of a school or organization, you represent that you have authority to accept these Terms on its behalf.',
  sections: [
    {
      id: "the-service",
      title: "1. The Schoolzy Service",
      body: "Schoolzy provides cloud-based software designed to help educational institutions manage school operations.\n\nFeatures may include student management, staff management, attendance, academic records, examinations, school fees, communication, reporting, and other functionality.\n\nFeatures may vary according to the subscription plan selected by the school.",
    },
    {
      id: "eligibility",
      title: "2. Eligibility",
      body: "Schoolzy is intended primarily for schools, educational institutions, organizations, and their authorized representatives.\n\nUsers must provide accurate information when creating an account and must have the authority necessary to use Schoolzy.",
    },
    {
      id: "school-accounts",
      title: "3. School Accounts",
      body: "A school administrator is responsible for establishing and managing the school's Schoolzy account.\n\nThe school is responsible for:\n- Providing accurate account information\n- Managing authorized users\n- Assigning appropriate user permissions\n- Protecting login credentials\n- Removing access for users who no longer require it\n- Ensuring that information entered into Schoolzy is accurate\n- Using the platform lawfully",
    },
    {
      id: "subscription-plans",
      title: "4. Subscription Plans",
      body: "Schoolzy may offer different subscription plans with different features, limits, and pricing.\n\nThe applicable features and limits are those displayed on the Schoolzy website or communicated to the school at the time of subscription.\n\nWe may change subscription plans or introduce new plans from time to time. Changes will not retroactively alter an already-paid subscription period unless otherwise agreed.",
    },
    {
      id: "fees-payments",
      title: "5. Fees and Payments",
      body: "Where a paid subscription is selected, the school agrees to pay the applicable subscription fees.\n\nPayment may be processed through third-party payment providers. Additional terms from the applicable payment provider may apply.\n\nUnless otherwise stated, subscription fees are non-refundable after the applicable service period has commenced, except where required by law or expressly agreed by Schoolzy.",
    },
    {
      id: "free-plans-trials",
      title: "6. Free Plans and Trials",
      body: "Where Schoolzy provides a free plan or trial, we may impose limits on storage, users, students, features, usage, or duration.\n\nFree services may be changed, suspended, or discontinued where reasonably necessary.",
    },
    {
      id: "school-data",
      title: "7. School Data",
      body: "Schools retain their rights and interests in information they submit to Schoolzy.\n\nThe school grants Ashpot the limited rights necessary to host, process, transmit, back up, display, and otherwise handle such information solely for the purpose of providing, securing, maintaining, and improving the Schoolzy service.\n\nSchools are responsible for ensuring that they have the necessary rights and lawful authority to submit information to Schoolzy.",
    },
    {
      id: "personal-data",
      title: "8. Personal Data",
      body: "The processing of personal information through Schoolzy is governed by our Privacy Policy.\n\nSchools must comply with applicable data protection requirements when collecting and entering personal information into Schoolzy.",
    },
    {
      id: "acceptable-use",
      title: "9. Acceptable Use",
      body: "You agree not to:\n- Use Schoolzy for unlawful purposes\n- Attempt to gain unauthorized access to another account\n- Attempt to access another school's data\n- Interfere with or disrupt the platform\n- Introduce malicious software or code\n- Attempt to bypass security controls\n- Reverse engineer the platform except where permitted by law\n- Copy or reproduce Schoolzy without authorization\n- Use automated systems to abuse or overload the service\n- Use Schoolzy to violate another person's rights",
    },
    {
      id: "intellectual-property",
      title: "10. Intellectual Property",
      body: "Schoolzy, including its software, source code, interfaces, designs, logos, trademarks, documentation, and related materials, is owned by or licensed to Ashpot Microsystems Ltd.\n\nYour use of Schoolzy does not transfer ownership of any Schoolzy intellectual property to you.\n\nYou retain ownership of content and information that you submit to the platform, subject to the rights necessary for us to provide the service.",
    },
    {
      id: "service-availability",
      title: "11. Service Availability",
      body: "We aim to keep Schoolzy available and reliable, but we do not guarantee uninterrupted or error-free operation.\n\nService interruptions may occur because of maintenance, upgrades, infrastructure failures, security incidents, internet failures, third-party services, or circumstances beyond our reasonable control.",
    },
    {
      id: "updates-changes",
      title: "12. Updates and Changes",
      body: "We may modify, improve, add, or remove features from Schoolzy.\n\nWe may also update these Terms when necessary to reflect changes in the service, business operations, technology, or applicable law.",
    },
    {
      id: "third-party-services",
      title: "13. Third-Party Services",
      body: "Schoolzy may depend on third-party services such as hosting, payment processing, email, messaging, analytics, authentication, or other infrastructure providers.\n\nThird-party services may be subject to their own terms and privacy policies.",
    },
    {
      id: "suspension-termination",
      title: "14. Suspension and Termination",
      body: "We may suspend or terminate access where:\n- These Terms are materially violated\n- The account is used for unlawful activities\n- The account poses a security risk\n- Payment obligations remain unpaid\n- Required by law or a lawful authority\n- Suspension is necessary to protect the platform or users\n\nWhere reasonably possible, we will provide notice before suspension or termination, except where immediate action is necessary for security, legal, or operational reasons.",
    },
    {
      id: "data-after-termination",
      title: "15. Data After Termination",
      body: "Following termination, schools should export any information they need before their account is permanently removed.\n\nSubject to applicable law and our retention obligations, Schoolzy may delete school data following termination after a reasonable retention period.",
    },
    {
      id: "disclaimers",
      title: "16. Disclaimers",
      body: "Schoolzy is provided as a software service. While we make reasonable efforts to maintain accuracy, reliability, and availability, we do not guarantee that the service will always be completely error-free, uninterrupted, or suitable for every particular purpose.\n\nSchools remain responsible for reviewing important records and decisions made using information generated through Schoolzy.",
    },
    {
      id: "limitation-of-liability",
      title: "17. Limitation of Liability",
      body: "To the maximum extent permitted by applicable law, Ashpot shall not be liable for indirect, incidental, special, consequential, or punitive losses arising from the use of Schoolzy.\n\nNothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited under applicable law.",
    },
    {
      id: "indemnification",
      title: "18. Indemnification",
      body: "To the extent permitted by law, you agree to indemnify and hold harmless Ashpot Microsystems Ltd. from claims, losses, liabilities, and expenses arising from your unlawful use of Schoolzy, violation of these Terms, or violation of the rights of another person.",
    },
    {
      id: "force-majeure",
      title: "19. Force Majeure",
      body: "We will not be responsible for delays or failures caused by circumstances reasonably beyond our control, including natural disasters, internet or telecommunications failures, government actions, civil emergencies, infrastructure failures, or other force majeure events.",
    },
    {
      id: "governing-law",
      title: "20. Governing Law",
      body: "These Terms shall be governed by and interpreted in accordance with the laws of the Federal Republic of Nigeria, subject to any mandatory legal requirements applicable to the parties.",
    },
    {
      id: "contact",
      title: "21. Contact",
      body: "Questions concerning these Terms may be directed to:\n\nAshpot Microsystems Ltd.\nAba, Abia State, Nigeria\nEmail: support@schoolzy.com.ng\nWebsite: schoolzy.com.ng",
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  title: "Cookie Policy",
  lastUpdated: "September 17, 2026",
  intro:
    "This Cookie Policy explains how Schoolzy, operated by Ashpot Microsystems Ltd., uses cookies and similar technologies on the Schoolzy website and application.",
  sections: [
    {
      id: "what-are-cookies",
      title: "1. What Are Cookies?",
      body: "Cookies are small text files that are stored on your device when you visit a website or use an online application.\n\nCookies allow websites to remember information about your visit, maintain sessions, provide security, and improve functionality.",
    },
    {
      id: "how-we-use-cookies",
      title: "2. How Schoolzy Uses Cookies",
      body: "Schoolzy uses cookies and similar technologies for purposes such as:\n- Keeping users securely logged in\n- Maintaining user sessions\n- Protecting accounts and preventing unauthorized activity\n- Remembering user preferences\n- Improving website and application performance\n- Understanding how the service is used\n- Diagnosing technical problems",
    },
    {
      id: "types-of-cookies",
      title: "3. Types of Cookies We May Use",
      body: "3.1 Strictly Necessary Cookies\nThese cookies are necessary for Schoolzy to function correctly. They may be used for authentication, session management, security, and other essential functionality. Because these cookies are necessary for the operation of the service, disabling them may prevent some parts of Schoolzy from working properly.\n\n3.2 Preference Cookies\nPreference cookies may allow Schoolzy to remember choices made by users, such as interface or display preferences.\n\n3.3 Analytics Cookies\nWhere analytics tools are enabled, analytics cookies may help us understand how users interact with Schoolzy. This information may be used to identify usage patterns, improve performance, and understand which features are useful.\n\n3.4 Security Cookies\nSecurity-related cookies or similar technologies may be used to detect suspicious activity, protect accounts, and prevent abuse.",
    },
    {
      id: "session-cookies",
      title: "4. Session Cookies",
      body: "Some cookies are temporary and remain on your device only while your browser session is active. These cookies may be deleted when you close your browser.",
    },
    {
      id: "persistent-cookies",
      title: "5. Persistent Cookies",
      body: "Some cookies may remain on your device for a defined period after you close your browser. They may be used to remember preferences or support functionality during future visits.",
    },
    {
      id: "third-party-cookies",
      title: "6. Third-Party Cookies",
      body: "Certain Schoolzy features may rely on third-party service providers. These providers may use cookies or similar technologies in connection with the services they provide.\n\nThird-party cookies are governed by the respective provider's policies.",
    },
    {
      id: "managing-cookies",
      title: "7. Managing Cookies",
      body: "Most web browsers allow you to control cookies through their settings.\n\nYou may be able to:\n- View cookies stored on your device\n- Delete existing cookies\n- Block cookies\n- Allow cookies only from selected websites\n- Receive notifications when cookies are being used\n\nBlocking or deleting essential cookies may affect the functionality of Schoolzy, including login and session-related features.",
    },
    {
      id: "cookies-personal-info",
      title: "8. Cookies and Personal Information",
      body: "Some cookies may be associated with information that can identify or distinguish a user.\n\nWhere cookie information constitutes personal information, it will be handled in accordance with our Privacy Policy and applicable data protection requirements.",
    },
    {
      id: "changes",
      title: "9. Changes to This Cookie Policy",
      body: 'We may update this Cookie Policy when our technology, services, cookies, or legal obligations change.\n\nThe updated version will be published on this page with a revised "Last Updated" date.',
    },
    {
      id: "contact",
      title: "10. Contact Us",
      body: "If you have questions about our use of cookies, please contact:\n\nAshpot Microsystems Ltd.\nAba, Abia State, Nigeria\nEmail: privacy@schoolzy.com.ng\nWebsite: schoolzy.com.ng",
    },
  ],
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: "September 17, 2026",
  intro:
    'Schoolzy ("Schoolzy", "we", "us", or "our") respects your privacy and is committed to protecting personal information entrusted to us. This Privacy Policy explains how we collect, use, store, protect, disclose, and otherwise process personal information when you use the Schoolzy platform, website, applications, and related services.\n\nSchoolzy is operated by Ashpot Microsystems Ltd. ("Ashpot"), a company based in Nigeria.\n\nThis Privacy Policy should be read together with our Terms of Service and Cookie Policy.',
  sections: [
    {
      id: "data-protection-responsibilities",
      title: "1. Our Data Protection Responsibilities",
      body: "Schoolzy provides software that enables schools to manage student, parent, teacher, staff, academic, attendance, financial, and administrative information.\n\nIn relation to information that a school enters into Schoolzy, the school will generally determine why and how that information is processed. Depending on the specific processing activity, the school may therefore act as the data controller or equivalent responsible party, while Ashpot may process the information on the school's behalf as a data processor or service provider.\n\nFor information that Ashpot collects directly for operating its own business, such as account administration, billing, security, support, and website usage, Ashpot may determine the purposes and means of processing.\n\nOur processing practices are intended to comply with applicable Nigerian data protection requirements, including the Nigeria Data Protection Act 2023, as applicable.",
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      body: "2.1 School Information\n- School name\n- School address\n- School contact information\n- School logo and branding information\n- School administrator information\n- Subscription information\n\n2.2 User Information\nDepending on the user's role, Schoolzy may process:\n- Full name\n- Email address\n- Telephone number\n- Username or account identifier\n- Password credentials in securely protected form\n- User role and permissions\n- Account activity\n\n2.3 School Records\nSchools may enter information into Schoolzy concerning students, parents, guardians, teachers, staff, and other members of the school community. Such information may include:\n- Student identification information\n- Parent and guardian information\n- Contact information\n- Class and academic information\n- Attendance records\n- Examination and assessment records\n- School fees and financial records\n- Staff records\n- Disciplinary and administrative records\n- Other information entered by authorized school users\n\n2.4 Technical Information\nWe may automatically collect information such as:\n- IP address\n- Browser type\n- Operating system\n- Device information\n- Login times\n- Pages and features accessed\n- Security and diagnostic information",
    },
    {
      id: "how-we-use-information",
      title: "3. How We Use Personal Information",
      body: "We may process information to:\n- Provide Schoolzy services\n- Create and manage accounts\n- Authenticate users\n- Manage schools and user permissions\n- Process subscriptions and payments\n- Provide customer support\n- Maintain platform security\n- Prevent fraud, abuse, and unauthorized access\n- Monitor and improve system performance\n- Communicate service-related information\n- Maintain backups and business continuity\n- Comply with applicable legal obligations",
    },
    {
      id: "lawful-basis",
      title: "4. Lawful Basis for Processing",
      body: "Where applicable, we process personal information on the basis of one or more lawful grounds recognized by applicable data protection law, including:\n- Performance of a contract\n- Compliance with legal obligations\n- Consent\n- Legitimate interests, where applicable\n- Protection of vital interests, where applicable",
    },
    {
      id: "childrens-data",
      title: "5. Children's Data",
      body: "Schoolzy is designed for educational institutions and may process information relating to children and other minors.\n\nSchools are responsible for ensuring that they have an appropriate legal basis and authority to collect and process children's information and to provide such information to Schoolzy for the purposes of providing the service.\n\nWe do not intentionally use student information for targeted advertising or commercial profiling.",
    },
    {
      id: "data-security",
      title: "6. Data Security",
      body: "We implement reasonable technical and organizational safeguards designed to protect personal information against unauthorized access, alteration, disclosure, loss, destruction, or misuse.\n\nThese measures may include:\n- Secure authentication\n- Role-based access controls\n- Restricted database access\n- HTTPS encryption in transit\n- Infrastructure security controls\n- Security monitoring\n- Regular software updates\n- Backups and recovery procedures\n\nNo internet-based system can guarantee absolute security. Users must also protect their account credentials and use appropriate security practices.",
    },
    {
      id: "school-data-isolation",
      title: "7. School Data Isolation",
      body: "Schoolzy is designed to support multiple schools on a shared software platform. Technical controls are implemented to separate school environments and restrict access to authorized information.\n\nUsers must not attempt to access another school's information without authorization.",
    },
    {
      id: "sharing-of-information",
      title: "8. Sharing of Information",
      body: "We do not sell or rent personal information.\n\nWe may disclose information to service providers where reasonably necessary to operate Schoolzy, including hosting, infrastructure, payment, communication, security, analytics, and support providers.\n\nWe may also disclose information where required by law, court order, regulatory authority, or other valid legal process.",
    },
    {
      id: "international-transfers",
      title: "9. International Data Transfers",
      body: "Some service providers used to operate Schoolzy may process or store information outside Nigeria.\n\nWhere personal information is transferred across borders, we will take reasonable steps to ensure that the transfer and subsequent processing comply with applicable data protection requirements.",
    },
    {
      id: "data-retention",
      title: "10. Data Retention",
      body: "We retain information only for as long as reasonably necessary for the purposes for which it was collected, including service delivery, security, legal compliance, dispute resolution, accounting, and legitimate business purposes.\n\nFollowing account termination, information may remain temporarily within backups or disaster-recovery systems before being deleted or securely disposed of in accordance with applicable retention requirements.",
    },
    {
      id: "your-rights",
      title: "11. Your Data Protection Rights",
      body: "Subject to applicable law, individuals may have rights to:\n- Request access to personal information\n- Request correction of inaccurate information\n- Request deletion where applicable\n- Request restriction of processing\n- Object to certain processing\n- Withdraw consent where processing is based on consent\n- Request information about processing activities\n\nWhere Schoolzy processes information on behalf of a school, requests relating to student, parent, teacher, or staff records should generally be directed to the relevant school.",
    },
    {
      id: "cookies",
      title: "12. Cookies",
      body: "Schoolzy uses cookies and similar technologies to provide essential functionality, maintain user sessions, improve security, and understand how the platform is used.\n\nPlease see our Cookie Policy for additional information.",
    },
    {
      id: "account-security",
      title: "13. Account Security",
      body: "Users are responsible for maintaining the confidentiality of their login credentials and for activities carried out through their accounts.\n\nIf you believe your account has been compromised, notify your school administrator or Schoolzy support as soon as possible.",
    },
    {
      id: "data-breach",
      title: "14. Data Breach",
      body: "If we become aware of a security incident involving personal information, we will take reasonable steps to investigate, contain, and remediate the incident.\n\nWhere applicable law requires notification to regulators or affected individuals, we will make such notifications in accordance with the applicable requirements.",
    },
    {
      id: "changes",
      title: "15. Changes to This Policy",
      body: 'We may update this Privacy Policy periodically. Updated versions will be published on this page and will include a revised "Last Updated" date.',
    },
    {
      id: "contact",
      title: "16. Contact Us",
      body: "For privacy questions, data protection requests, or concerns about the handling of personal information, contact:\n\nAshpot Microsystems Ltd.\nAba, Abia State, Nigeria\nEmail: privacy@schoolzy.com.ng\nWebsite: schoolzy.com.ng",
    },
  ],
};