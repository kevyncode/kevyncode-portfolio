import { ReactNode } from "react";
import { StaticImageData } from "next/image";

export interface Technology {
  name: string;
  icon: string | StaticImageData;
}

export interface Skill {
  name: string;
  icon: ReactNode;
}

export interface Experience {
  title: string;
  company: string;
  description: string;
  details: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string | StaticImageData;
  username?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  aboutMe: string;
  profileImage: string | StaticImageData;
  profileImageHover?: string | StaticImageData;
  resumeUrl?: string;
}
