# 10-OOP-Team-Profile-Generator

This project is an exercise in using the Inquirer and Jest packages to respectively build an HTML page using prompts and to develop tests and run them on numerous classes.

Upon using the "node index.js" command, the project requires the entry of data into a series of prompts to first gather information for a Managing team member followed by writing that data to a respective class. The user is then prompted to either add team members or to create the HTML file. If the user selects to add more team members, they have the option of selecting Engineer or Intern team members, each of which have some unique prompts such as requiring Github usernames or School names and is added to a similarly named class. The prompt will continue to allow new team members to be added until the user selects to finish and create the HTML file which is written to the "./dist" folder. The HTML file will display cards with the Manager's and team members' input information.

The user also has the option to test the functionality of the built classes using "npm test".

A walkthrough video can be located at: https://drive.google.com/file/d/1PCgl4r6LFv064hIkwemHQJGAZWmripmO/view

![example-screenshot](https://github.com/Danqest/10-OOP-Team-Profile-Generator/blob/main/assets/images/screenshot-team.png)