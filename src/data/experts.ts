export type Expert = {
  id: string;
  name: string;
  role: string;
  region: string;
  flag: string;
  bio: string;
  avatar: string;
};

export const experts: Expert[] = [
  {
    id: "sara-shehab",
    name: "Msc. Sara Shehab",
    role: "Health Sciences (MSc)",
    region: "Germany",
    flag: "🇩🇪",
    bio: "Originally from Lebanon and now based in Germany, with a BSc in Nursing and an MSc in Health Sciences. She blends scientific knowledge with a practical, relatable approach — advising on European product standards and the everyday rituals that help us feel good in our own skin.",
    avatar: "/experts/expert-1.svg",
  },
  {
    id: "tharwat",
    name: "Dr. Tharwat Mohyeldine",
    role: "Pharmaceutical Researcher",
    region: "France",
    flag: "🇫🇷",
    bio: "A pharmaceutical researcher and medicinal chemist passionate about wellness and preventive health. Through science-backed education and trusted guidance, she helps individuals make informed choices and achieve their health goals.",
    avatar: "/experts/expert-2.svg",
  },
  {
    id: "sara-mohyeldine",
    name: "Dr. Sara Mohyeldine",
    role: "Local Wellness Advisor",
    region: "Lebanon",
    flag: "🇱🇧",
    bio: "Our Lebanese expert and the one closest to our customers — advising on local needs and making sure each product genuinely fits everyday life in Lebanon.",
    avatar: "/experts/expert-3.svg",
  },
];
