export const swaggerOption = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Docs for Codeit Resources",
      version: "1.0.0",
      description: "...",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["**/*.ts"],
};
