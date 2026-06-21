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
    title: String,
    excerpt: String,
    body: String,
    date: String,
    image: String,
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

const siteContentSchema = new mongoose.Schema(
  {
    profile: profileSchema,
    stats: [statsSchema],
    services: [String],
    videos: [videoSchema],
    blogs: [blogSchema],
    moments: [momentSchema]
  },
  { timestamps: true }
);

export const SiteContent = mongoose.model("SiteContent", siteContentSchema);
