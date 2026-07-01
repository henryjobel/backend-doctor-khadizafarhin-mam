import bcrypt from "bcryptjs";
import { SiteContent } from "../models/SiteContent.js";
import { User } from "../models/User.js";

const initialContent = {
  seo: {
    siteTitle: "Dr. Kazi Khadeza Farhin",
    metaTitle: "Dr. Kazi Khadeza Farhin | Fertility, Pregnancy & Gynecology Specialist",
    metaDescription:
      "Book appointments with Dr. Kazi Khadeza Farhin, FCPS Obs & Gyn and FCPS Reproductive Endocrinology & Infertility specialist in Dhaka.",
    keywords: "Dr Kazi Khadeza Farhin, fertility specialist Dhaka, gynecologist Uttara, Nova IVF Banani, infertility doctor Bangladesh",
    ogImage: "https://res.cloudinary.com/dav46zigt/image/upload/v1782026891/doctor-khadeza-farhin/doctor-portrait.jpg"
  },
  profile: {
    name: "Dr. Kazi Khadeza Farhin",
    title: "Obstetrician & Gynecologist and Fertility Specialist",
    intro:
      "FCPS in Obstetrics & Gynaecology and Reproductive Endocrinology & Infertility, with 19+ years of experience in fertility, ART and gynecological care.",
    phone: "+8801749000981",
    email: "drkfarhin@gmail.com",
    chamber: "Uttara Crescent Clinic & Hospital and Nova IVF Fertility, Banani",
    heroImage: "https://res.cloudinary.com/dav46zigt/image/upload/v1782026890/doctor-khadeza-farhin/doctor-cutout.png",
    portraitImage: "https://res.cloudinary.com/dav46zigt/image/upload/v1782026891/doctor-khadeza-farhin/doctor-portrait.jpg"
  },
  stats: [
    { value: "20+", label: "Years Experience" },
    { value: "FCPS", label: "Obs & Gyn" },
    { value: "FCPS", label: "RE & Infertility" }
  ],
  services: [
    "Infertility Consultation",
    "Reproductive Endocrinology",
    "Obstetrics & Gynaecology",
    "IVF & ART Counseling",
    "IUI Treatment",
    "PCOS & Endometriosis Care",
    "Laparoscopy & Hysteroscopy",
    "TVS & SIS Evaluation"
  ],
  videos: [{ title: "Fertility and reproductive health guidance", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }],
  blogs: [
    {
      slug: "when-couples-should-seek-infertility-consultation",
      title: "When couples should seek infertility consultation",
      excerpt: "A practical guide to early fertility assessment, diagnosis and treatment planning.",
      body:
        "Infertility consultation is helpful when a couple has been trying for pregnancy without success, when menstrual cycles are irregular, or when there is a known medical concern such as PCOS, endometriosis, recurrent miscarriage or male factor infertility.",
      date: "June 12, 2026",
      image: "https://res.cloudinary.com/dav46zigt/image/upload/v1782026895/doctor-khadeza-farhin/moments/643469072_911165054981355_4831196748019911732_n.jpg",
      published: true
    }
  ],
  moments: [
    {
      title: "Newborn care moment",
      caption: "Compassionate post-delivery care and family support.",
      image: "https://res.cloudinary.com/dav46zigt/image/upload/v1782026894/doctor-khadeza-farhin/moments/641637922_910145031750024_5302042371655209578_n.jpg"
    }
  ],
  home: {
    heroBadge: "FCPS Obs & Gyn | FCPS Reproductive Endocrinology & Infertility",
    heroHeading: "Fertility, pregnancy & women's health care by",
    experienceYears: "20+",
    experienceLabel: "Clinical Experience",
    specialistItems: [
      "Infertility IVF Specialist",
      "Obstetrics & Gynaecology",
      "Laparoscopy & Hysteroscopy",
      "IUI, PCOS & Endometriosis Care"
    ],
    aboutItems: [
      "Infertility & ART care",
      "Obs & Gyn procedures",
      "Laparoscopy & hysteroscopy",
      "PCOS and endometriosis care"
    ],
    journeyItems: [
      "Fertility evaluation and counseling",
      "Pregnancy and delivery planning",
      "PCOS, endometriosis and menstrual care",
      "Post-treatment and family follow-up"
    ],
    careMomentsEyebrow: "Care Moments",
    careMomentsTitle: "Real warmth from pregnancy, delivery and family care journeys",
    careMomentsSubtitle: "A visual glimpse of the trust, comfort and continuity patients experience throughout consultation, treatment and follow-up.",
    servicesEyebrow: "Services",
    servicesTitle: "Specialized care for fertility, pregnancy and women's health",
    servicesSubtitle: "Every care plan is explained clearly, with diagnostic guidance, treatment options and follow-up built into the patient journey.",
    journeyEyebrow: "Why Patients Trust Her",
    journeyTitle: "A calm, experienced doctor for sensitive women's health decisions",
    journeyBody: "From infertility diagnosis to pregnancy care, every patient needs clarity, privacy and steady guidance. The experience is organized around careful listening, evidence-based decisions and ongoing communication.",
    aboutEyebrow: "About Doctor",
    portfolioEyebrow: "Portfolio",
    portfolioTitle: "Education, experience and specialist training",
    portfolioSubtitle: "A CV-based overview of Dr. Farhin's academic background, government service, private consultancy and fertility-focused clinical work.",
    customSections: [
      {
        type: "cards",
        eyebrow: "Patient Care",
        title: "Editable homepage section",
        body: "Use the admin homepage CMS to update this section, add cards, or create more homepage blocks.",
        image: "",
        ctaLabel: "Book Appointment",
        ctaHref: "#appointment",
        items: ["Fertility consultation", "Pregnancy planning", "Gynecology follow-up"],
        enabled: true
      }
    ]
  },
  portfolio: {
    education: [
      {
        degree: "MBBS",
        meta: "Bachelor of Medicine and Bachelor of Surgery",
        institute: "Z H Sikder Women's Medical College & Hospital, Dhaka",
        year: "1998-2003"
      },
      {
        degree: "FCPS",
        meta: "Obstetrics & Gynaecology",
        institute: "Bangladesh College of Physicians & Surgeons (BCPS)",
        year: "Since Jan 2015"
      },
      {
        degree: "FCPS",
        meta: "Reproductive Endocrinology & Infertility",
        institute: "Bangladesh College of Physicians & Surgeons (BCPS)",
        year: "Since Jan 2022"
      }
    ],
    experience: [
      {
        role: "Medical Officer",
        place: "Department of Reproductive Endocrinology & Infertility, Dhaka Medical College Hospital",
        period: "December 2024 - Present"
      },
      {
        role: "Consultant",
        place: "Uttara Crescent Hospital, Reproductive Endocrinology & Infertility and Obs & Gynae",
        period: "2016 - Present"
      },
      {
        role: "Medical Officer",
        place: "Obstetric and Gynae Department, Kurmitola General Hospital",
        period: "March 2022 - December 2024"
      },
      {
        role: "Post Graduate Trainee Doctor",
        place: "Reproductive Endocrinology & Infertility, Dhaka Medical College Hospital",
        period: "2018 - 2022"
      },
      {
        role: "Medical Officer and Consultant Assistant",
        place: "Obstetric and Gynae Department, Dhaka Medical College Hospital",
        period: "2015 - 2018"
      },
      {
        role: "Medical Officer and Consultant Assistant",
        place: "Uttara Adhunik Medical Hospital, Dhaka",
        period: "2007 - 2010"
      }
    ],
    specialistTraining: [
      "Laparoscopy, hysteroscopy, IUI, IVF, andrology, TVS and SIS training",
      "Basic laparoscopy training from SELSB",
      "Advanced laparoscopy and fertility sparing surgery workshops from OGSB",
      "Hysteroscopy surgery workshop organized by OGSB",
      "Basic Surgical Skill and Research Methodology from BCPS"
    ],
    clinicalSkills: [
      "Female and male infertility evaluation",
      "PCOS, endometriosis, adenomyosis and fibroid care",
      "Obstetrics and gynecology surgery",
      "Pain free vaginal delivery and VBAC guidance",
      "Laparoscopy, hysteroscopy, TVS, IVF, SIS and IUI"
    ],
    research: [
      "Semaglutide vs Metformin in infertile women with PCOS selected for ASPIRE 2025 poster presentation in Singapore",
      "Semaglutide research selected for oral presentation by Fertility & Sterility Society of Bangladesh",
      "Role of micronutrients in improving sperm count and concentration selected for OGSB poster presentation",
      "Published and co-authored international research in gynecology, infertility and obstetrics"
    ]
  }
};

let bootstrapped = false;

export async function bootstrapAppData() {
  if (bootstrapped) return;

  const email = (process.env.ADMIN_EMAIL || "admin@drfarhin.local").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin12345";

  await User.findOneAndUpdate(
    { email },
    {
      name: "Admin",
      email,
      passwordHash: await bcrypt.hash(password, 10),
      role: "admin"
    },
    { upsert: true, new: true }
  );

  const exists = await SiteContent.findOne();
  if (!exists) {
    await SiteContent.create(initialContent);
  } else {
    const set = {};

    if (!exists.home) {
      set.home = initialContent.home;
    } else {
      if (!Array.isArray(exists.home.customSections)) {
        set["home.customSections"] = initialContent.home.customSections;
      }
      if (!exists.home.careMomentsTitle) {
        set["home.careMomentsEyebrow"] = initialContent.home.careMomentsEyebrow;
        set["home.careMomentsTitle"] = initialContent.home.careMomentsTitle;
        set["home.careMomentsSubtitle"] = initialContent.home.careMomentsSubtitle;
      }
      if (!exists.home.servicesTitle) {
        set["home.servicesEyebrow"] = initialContent.home.servicesEyebrow;
        set["home.servicesTitle"] = initialContent.home.servicesTitle;
        set["home.servicesSubtitle"] = initialContent.home.servicesSubtitle;
      }
      if (!exists.home.journeyTitle) {
        set["home.journeyEyebrow"] = initialContent.home.journeyEyebrow;
        set["home.journeyTitle"] = initialContent.home.journeyTitle;
        set["home.journeyBody"] = initialContent.home.journeyBody;
      }
      if (!exists.home.aboutEyebrow) {
        set["home.aboutEyebrow"] = initialContent.home.aboutEyebrow;
      }
      if (!exists.home.portfolioTitle) {
        set["home.portfolioEyebrow"] = initialContent.home.portfolioEyebrow;
        set["home.portfolioTitle"] = initialContent.home.portfolioTitle;
        set["home.portfolioSubtitle"] = initialContent.home.portfolioSubtitle;
      }
    }

    if (!exists.portfolio) {
      set.portfolio = initialContent.portfolio;
    }

    if (Object.keys(set).length > 0) {
      await SiteContent.findByIdAndUpdate(exists._id, { $set: set });
    }
  }

  bootstrapped = true;
}
