const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Docs for Codeit Resources",
      version: "1.0.0",
      description: "...",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["**/*.ts"],
};
export default options;
