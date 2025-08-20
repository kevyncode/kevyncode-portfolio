import { SocialLink, ProfileData } from "@/types";
import linkedinIcon from "@/assets/linkedinIcon.svg";
import githubIcon from "@/assets/githubIcon.svg";
import twitterIcon from "@/assets/twitterIcon.svg";
import emailIcon from "@/assets/emailIcon.png";
import imagePerfil from "@/assets/fotoperfil.svg";
import imagePerfilAlternate from "@/assets/fotoPerfilVerse.png";

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kevyn-rodrigues/",
    icon: linkedinIcon,
    username: "in/kevyn-rodrigues",
  },
  {
    name: "GitHub",
    url: "https://github.com/kevyncode",
    icon: githubIcon,
    username: "kevyncode",
  },
  {
    name: "Twitter",
    url: "https://x.com/kevyncode",
    icon: twitterIcon,
    username: "@kevyncode",
  },
  {
    name: "Email",
    url: "mailto:kevynrodrigo123@gmail.com",
    icon: emailIcon,
    username: "kevynrodrigo123@gmail.com",
  },
];

export const profileData: ProfileData = {
  name: "Kevyn Rodrigues",
  title: "Software Engineer Student",
  aboutMe:
    "My name is Kevyn Rodrigues, and I am passionate about software development. Currently, I am studying Software Engineering at Jala University, but I have already gained experience that has prepared me to tackle technical challenges and collaborate on innovative projects.",
  profileImage: imagePerfil,
  profileImageHover: imagePerfilAlternate,
  resumeUrl:
    "https://drive.google.com/file/d/1ar8BH1mTjr97ApSW9BcEvIIJyV_Qs_Cl/view",
};
