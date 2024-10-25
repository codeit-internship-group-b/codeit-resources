import 현지 from "@ui/public/images/현지.png";
import 보경 from "@ui/public/images/보경.png";
import 승헌 from "@ui/public/images/승헌.png";
import 영준 from "@ui/public/images/영준.png";
import 혜린 from "@ui/public/images/혜린.png";

export const MOCK_MEMBERS = [
  {
    id: "1",
    name: "영준",
    email: "yg@codeit.com",
    teams: ["Content"],
    role: "어드민",
    profileImage: 영준,
  },
  {
    id: "2",
    name: "보경",
    email: "bk@codeit.com",
    teams: ["Finance"],
    role: "멤버",
    profileImage: 보경,
  },
  {
    id: "3",
    name: "승헌",
    email: "sh@codeit.com",
    teams: ["Strategy"],
    role: "멤버",
    profileImage: 승헌,
  },
  {
    id: "4",
    name: "현지",
    email: "hj@codeit.com",
    teams: ["Brand Experience"],
    role: "멤버",
    profileImage: 현지,
  },
  {
    id: "5",
    name: "혜린",
    email: "hr@codeit.com",
    teams: ["Product"],
    role: "멤버",
    profileImage: 혜린,
  },
];

export const MOCK_CATEGORIES = [
  "전체",
  "멤버",
  "어드민",
  "Management",
  "Finance",
  "Strategy",
  "Brand Experience",
  "People & Culture",
];

export const MOCK_TEAMS = ["Management", "Finance", "Strategy", "Brand Experience", "People & Culture"];
