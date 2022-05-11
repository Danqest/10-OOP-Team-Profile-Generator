// import packages and classes
const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require('./lib/manager')
const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')

// initialize array that will hold employee data entered as classes
var employeeData = []

// function containing initial prompt chain for the manager's data, ends with prompt to add employees or write HTML
function askInitPrompts() {
  const initPrompts = [
      {
        type: "list",
        name: "initManager",
        message: "This command-line application will be used to build a team roster and an accompanying HTML page displaying the team members' information. It must be started with the team Manager's information first. Would you like to enter the Manager's information?",
        choices: ['Yes', 'No']
      },
      {
        type: "input",
        name: "employeeName",
        message: "What is the Manager's name?",
        when(answers) {
          return answers.initManager === 'Yes'
        }
      },
      {
        type: "input",
        name: "employeeID",
        message: "What is the Manager's ID?",
        when(answers) {
          return answers.initManager === 'Yes'
        }
      },
      {
        type: "input",
        name: "employeeEmail",
        message: "What is the Manager's email address?",
        when(answers) {
          return answers.initManager === 'Yes'
        }
      },
      {
        type: "input",
        name: "employeeOfficeNum",
        message: "What is the Manager's office number?",
        when(answers) {
          return answers.initManager === 'Yes'
        }
      },
      {
        type: "list",
        name: "nextEmployee",
        message: "Would you like to add an additional team member?",
        choices: ['Yes', 'No - Finish & Generate HTML'],
        when(answers) {
          return answers.initManager === 'Yes'
        }
      }
    ]

    return inquirer.prompt(initPrompts).then((answers) => {
      // adds entered data to manager class which is appended to employee data array. choice to run function to start prompting employee data or write HTML
      const manager = new Manager(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.employeeOfficeNum)
      employeeData.push(manager)
      if (answers.nextEmployee === 'Yes') {
        return askEmployeePrompts()
      }
      else {
        writeHTML()
      }
    })   
}

// function containing prompt chain for the employee's data, ends with prompt to add employees again or write HTML
function askEmployeePrompts() {
  const employeePrompts = [
    {
      type: "list",
      name: "employeeType",
      message: "What kind of additional team member do you want to add?",
      choices: ['Engineer', 'Intern'],
    },
    {
      type: "input",
      name: "employeeName",
      message(answers) {
        return `What is the ${answers.employeeType}'s name?`
      }, 
    },
    {
      type: "input",
      name: "employeeID",
      message(answers) {
        return `What is the ${answers.employeeType}'s ID?`
      }, 
    },
    {
      type: "input",
      name: "employeeEmail",
      message(answers) {
        return `What is the ${answers.employeeType}'s email?`
      }, 
    },
    {
      type: "input",
      name: "employeeGithub",
      message(answers) {
        return `What is the ${answers.employeeType}'s Github username?`
      }, 
      when(answers) {
        return (answers.employeeType === 'Engineer')
      }
    },
    {
      type: "input",
      name: "employeeSchool",
      message(answers) {
        return `What is the ${answers.employeeType}'s school name?`
      }, 
      when(answers) {
        return (answers.employeeType === 'Intern')
      }
    },
    {
      type: "list",
      name: "nextEmployee",
      message: "Would you like to add an additional team member?",
      choices: ['Yes', 'No - Finish & Generate HTML'],
    }
  ]
  // adds employee data to data array as a class depending on employee type
  return inquirer.prompt(employeePrompts).then((answers) => {
    if (answers.employeeType === 'Engineer') {
      const engineer = new Engineer(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.employeeGithub)
      employeeData.push(engineer)
    }
    if (answers.employeeType === 'Intern') {
      const intern = new Intern(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.employeeSchool)
      employeeData.push(intern)
    }
    // asks prompts again
    if (answers.nextEmployee === 'Yes') {
      return askEmployeePrompts()
    }
    // if no more employees to add, write HTML
    else {
      console.log(employeeData)
      writeHTML()
    }
  })
}

// initial chunk of HTML code
function generateHTML() {
return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Team Viewer</title>
</head>
<body>
    <div class="jumbotron jumbotron-fluid" style="background-color: red;" id='jumbotron'>
        <div class="container">
            <h1 class="text-center" style="color: white;">My Team</h1>
        </div>
    </div>
    
`
}

// HTML code for each card that will display the employee data
function generateCard(name, position, id, email, special) {
return `
<div class="row" style="margin-top: 20px">
  <div class="mx-auto">
    <div class="card bg-light" style="width: 30rem; margin-bottom: 20px;">
      <div class="card-header" style="background-color: blue;">
        <h2 class="card-text text-center" style="margin-top: 20px; color: white;" id="Name">${name}</h2>
        <h4 class="card-text text-center" style="margin-bottom: 20px; color: white" id="Position">${position}</h3>
      </div>
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item" id="ID">ID: ${id}</li>
          <li class="list-group-item" id="Email">Email: ${email}</li>
          <li class="list-group-item" id="Special">${special}</li>
        </ul>
      </div>
    </div>
  </div>
</div>`
}

// function to actually write the HTML. begins with the initial chunk and appends (concats) card HTML based on length of the employee data array
function writeHTML() {
  var begHTML = generateHTML()
  const filename = `./dist/index.html`;
  
  for (let i = 0; i < employeeData.length; i++) {
    if (employeeData[i].getRole() === "Manager") {
      var name = employeeData[i].name
      var position = employeeData[i].getRole()
      var id = employeeData[i].id
      var email = (`<a href="mailto:`+employeeData[i].email+`" target="_blank">`+employeeData[i].email+`</a>`)
      var special = ("Office Number: " + employeeData[i].officeNumber)
      begHTML = begHTML.concat(generateCard(name, position, id, email, special))
    }
    if (employeeData[i].getRole() === "Engineer") {
      var name = employeeData[i].name
      var position = employeeData[i].getRole()
      var id = employeeData[i].id
      var email = (`<a href="mailto:`+employeeData[i].email+`" target="_blank">`+employeeData[i].email+`</a>`)
      var special = (`Github: <a href="https://github.com/`+employeeData[i].github+`" target="_blank">`+employeeData[i].github+`</a>`) 
      begHTML = begHTML.concat(generateCard(name, position, id, email, special))

    }
    if (employeeData[i].getRole() === "Intern") {
      var name = employeeData[i].name
      var position = employeeData[i].getRole()
      var id = employeeData[i].id
      var email = (`<a href="mailto:`+employeeData[i].email+`" target="_blank">`+employeeData[i].email+`</a>`)
      var special = ("School: " + employeeData[i].school)
      begHTML = begHTML.concat(generateCard(name, position, id, email, special))

    }
  }
  // ending HTML code
  const endHTML = `</body></html>`
  html = (begHTML + endHTML)
  // write the entire HTML file
  fs.writeFile(filename, html, (err) =>
    err ? console.log(err) : console.log(`Successfully created HTML file '${filename}'!`)
  )
}

// function to begin asking prompts
function getAnswers() {
  return askInitPrompts()
}

// invoke function to begin prompts
getAnswers()