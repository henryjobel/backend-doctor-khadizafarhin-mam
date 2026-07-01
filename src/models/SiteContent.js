import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    intro: String,
    phone: String,
    email: String,
    chamber: String,
    heroImage: String,
    portraitImage: String
  },
  { _id: false }
);

const statsSchema = new mongoose.Schema(
  {
    value: String,
    label: String
  },
  { _id: false }
);

const videoSchema = new mongoose.Schema(
  {
    title: String,
    url: String
  },
  { _id: true }
);

const blogSchema = new mongoose.Schema(
  {
    slug: String,
    title: String,
    excerpt: String,
    body: String,
    date: String,
    image: String,
    seoTitle: String,
    seoDescription: String,
    seoKeywords: String,
    published: { type: Boolean, default: true }
  },
  { _id: true }
);

const momentSchema = new mongoose.Schema(
  {
    title: String,
    caption: String,
    image: String
  },
  { _id: true }
);

const homeSchema = new mongoose.Schema(
  {
    heroBadge: String,
    heroHeading: String,
    experienceYears: String,
    experienceLabel: String,
    specialistItems: [String],
    aboutItems: [String],
    journeyItems: [String],
    careMomentsEyebrow: String,
    careMomentsTitle: String,
    careMomentsSubtitle: String,
    servicesEyebrow: String,
    servicesTitle: String,
    servicesSubtitle: String,
    journeyEyebrow: String,
    journeyTitle: String,
    journeyBody: String,
    aboutEyebrow: String,
    portfolioEyebrow: String,
    portfolioTitle: String,
    portfolioSubtitle: String,
    customSections: [
      {
        type: { type: String, default: "cards" },
        eyebrow: String,
        title: String,
        body: String,
        image: String,
        ctaLabel: String,
        ctaHref: String,
        items: [String],
        enabled: { type: Boolean, default: true }
      }
    ]
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    education: [
      {
        degree: String,
        meta: String,
        institute: String,
        year: String
      }
    ],
    experience: [
      {
        role: String,
        place: String,
        period: String
      }
    ],
    specialistTraining: [String],
    clinicalSkills: [String],
    research: [String]
  },
  { _id: false }
);

const siteContentSchema = new mongoose.Schema(
  {
    seo: {
      siteTitle: String,
      metaTitle: String,
      metaDescription: String,
      keywords: String,
      ogImage: String
    },
    profile: profileSchema,
    stats: [statsSchema],
    services: [String],
    videos: [videoSchema],
    blogs: [blogSchema],
    moments: [momentSchema],
    home: homeSchema,
    portfolio: portfolioSchema
  },
  { timestamps: true }
);

export const SiteContent = mongoose.model("SiteContent", siteContentSchema);
