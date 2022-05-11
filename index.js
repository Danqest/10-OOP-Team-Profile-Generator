const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require('./lib/manager')
const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')

var employeeData = []

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
      const manager = new Manager(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.employeeOfficeNum)
      employeeData.push(manager)
      console.log(employeeData)
      if (answers.nextEmployee === 'Yes') {
        // employeeData.push(answers)
        return askEmployeePrompts()
      }
      else {
        // employeeData.push(answers)
        console.log(employeeData)
        writeHTML()
      }
    })
    
}
    
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
  
  return inquirer.prompt(employeePrompts).then((answers) => {
    if (answers.employeeType === 'Engineer') {
      const engineer = new Engineer(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.employeeGithub)
      employeeData.push(engineer)
    }
    if (answers.employeeType === 'Intern') {
      const intern = new Intern(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.employeeSchool)
      employeeData.push(intern)
    }
    if (answers.nextEmployee === 'Yes') {
      // employeeData.push(answers)
      console.log(employeeData)
      return askEmployeePrompts()
    }
    else {
      // employeeData.push(answers)
      console.log(employeeData)
      writeHTML()
    }
  })
}

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

function generateCard(name, position, id, email, special) {
return `
<div style="margin-top: 20px">
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

// function endHTML() {
// return 
// }

function writeHTML() {
  var begHTML = generateHTML()
  const filename = `index.html`;
  
  for (let i = 0; i < employeeData.length; i++) {
    if (employeeData[i].getRole() === "Manager") {
      var name = employeeData[i].name
      var position = employeeData[i].getRole()
      var id = employeeData[i].id
      var email = employeeData[i].email
      var special = ("Office Number: " + employeeData[i].officeNumber)
      begHTML = begHTML.concat(generateCard(name, position, id, email, special))
    }
    if (employeeData[i].getRole() === "Engineer") {
      var name = employeeData[i].name
      var position = employeeData[i].getRole()
      var id = employeeData[i].id
      var email = employeeData[i].email
      var special = ("Github: " + employeeData[i].github)
      begHTML = begHTML.concat(generateCard(name, position, id, email, special))

    }
    if (employeeData[i].getRole() === "Intern") {
      var name = employeeData[i].name
      var position = employeeData[i].getRole()
      var id = employeeData[i].id
      var email = employeeData[i].email
      var special = ("School: " + employeeData[i].school)
      begHTML = begHTML.concat(generateCard(name, position, id, email, special))

    }
  }
  const endHTML = `</body></html>`
  html = (begHTML + endHTML)
  fs.writeFile(filename, html, (err) =>
    err ? console.log(err) : console.log(`Successfully created HTML file '${filename}'!`)
  )
}

function getAnswers() {
  return askInitPrompts()
}

// function to begin prompts
getAnswers()