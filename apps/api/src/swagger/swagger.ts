export const swaggerOption = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Docs for Codeit Resources",
      version: "1.0.0",
      description:
        "코드잇 리소스 관리를 위한 RESTful API 문서입니다. 사용자, 인증, 예약, 아이템, 카테고리 관리 기능을 제공합니다.",
    },
    tags: [
      {
        name: "Users",
        description: "유저 관련 API",
      },
      {
        name: "Auth",
        description: "인증인가 관련 API",
      },
      {
        name: "Reservations",
        description: "예약 관련 API",
      },
      {
        name: "Items",
        description: "아이템 관련 API",
      },
      {
        name: "Categories",
        description: "아이템 분류 관련 API",
      },
    ],
    servers: [
      {
        url: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
        description: "API 서버",
      },
    ],
  },
  apis: ["./src/controllers/**/*.ts", "./src/routes/**/*.ts"],
};
