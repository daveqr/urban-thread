const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "env": {
      "MONGODB_URI": "mongodb://localhost:27017/your-database",
      "DB_USERNAME": "your-username",
      "DB_PASSWORD": "your-password"
    }
  },
});
