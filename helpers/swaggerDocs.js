const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: "aiActive-app",
        description: "APIs for aiActive-app",
        contact: {
          name: "aiActiveinfo@aiactive.com"
        }
      },
      servers: [
        {
          url: "http://localhost:5000",
          description: "Local dev"
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./routes/*'], // files containing annotations as above
  };
  
  
  module.exports = options