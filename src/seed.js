import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./lib/db.js";
import { User } from "./models/User.js";
import { SiteContent } from "./models/SiteContent.js";

const initialContent = {
  profile: {
    name: "Dr. Kazi Khadeza Farhin",
    title: "Obstetrician & Gynecologist and Fertility Specialist",
    intro: "FCPS in Obstetrics & Gynaecology and Reproductive Endocrinology & Infertility, with 19+ years of experience in fertility, ART and gynecological care.",
    phone: "+8801749000981",
    email: "drkfarhin@gmail.com",
    chamber: "Uttara Crescent Clinic & Hospital and Nova IVF Fertility, Banani",
    heroImage: "/images/doctor-cutout.png",
    portraitImage: "/images/doctor-portrait.jpg"
  },
  stats: [
    { value: "19+", label: "Years Experience" },
    { value: "FCPS", label: "Obs & Gyn" },
    { value: "FCPS", label: "RE & Infertility" }
  ],
  services: ["Infertility Consultation", "Reproductive Endocrinology", "Obstetrics & Gynaecology", "IVF & ART Counseling", "IUI Treatment", "PCOS & Endometriosis Care", "Laparoscopy & Hysteroscopy", "TVS & SIS Evaluation"],
  videos: [{ title: "Fertility and reproductive health guidance", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }],
  blogs: [{ title: "When couples should seek infertility consultation", excerpt: "A practical guide to early fertility assessment, diagnosis and treatment planning.", date: "June 12, 2026" }]
};

await connectDB();

await User.findOneAndUpdate(
  { email: (process.env.ADMIN_EMAIL || "admin@drfarhin.local").toLowerCase() },
  {
    name: "Admin",
    email: (process.env.ADMIN_EMAIL || "admin@drfarhin.local").toLowerCase(),
    passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin12345", 10),
    role: "admin"
  },
  { upsert: true }
);

const exists = await SiteContent.findOne();
if (!exists) {
  await SiteContent.create(initialContent);
}

console.log("Seed complete");
process.exit(0);
