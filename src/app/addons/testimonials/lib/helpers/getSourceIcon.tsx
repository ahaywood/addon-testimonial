import {
  Twitter,
  Linkedin,
  Globe,
  Youtube,
  Instagram,
  MessageSquare,
  Mail,
  Users,
  LucideIcon,
} from "lucide-react";

export const getSourceIcon = (sourceName: string): LucideIcon => {
  const lowerName = sourceName.toLowerCase();

  switch (lowerName) {
    case "twitter":
    case "twitter/x":
    case "x":
      return Twitter;
    case "linkedin":
      return Linkedin;
    case "youtube":
      return Youtube;
    case "instagram":
      return Instagram;
    case "discord":
      return MessageSquare;
    case "email":
      return Mail;
    case "website":
      return Globe;
    case "bluesky":
      return Users; // or import a custom BlueSky icon
    case "tiktok":
    case "reddit":
      return MessageSquare; // you might want specific icons for these
    default:
      return Globe; // fallback icon
  }
};
