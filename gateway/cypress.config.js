const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      DB_USERNAME: "your-username",
      DB_PASSWORD: "your-password",
    },
  },
});
