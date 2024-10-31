export const swaggerOption = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Docs for Codeit Resources",
      version: "1.0.0",
      description: "...",
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
        description: "아이템 관련 API",
      },
      {
        name: "Items",
        description: "아이템 관련 API",
      },
      {
        name: "Category",
        description: "아이템 관련 API",
      },
    ],
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["**/*.ts"],
};
