const inquirer = require("inquirer");
const fs = require("fs");

inquirer
  .prompt([
    {
        type: "input",
        name: "projectTitle",
        message: "What is the project title?",
      },