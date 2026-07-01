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
  } else if (!exists.home) {
    await SiteContent.findByIdAndUpdate(exists._id, { $set: { home: initialContent.home } });
  } else if (!Array.isArray(exists.home.customSections)) {
    await SiteContent.findByIdAndUpdate(exists._id, { $set: { "home.customSections": initialContent.home.customSections } });
  }

  bootstrapped = true;
}
