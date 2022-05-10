const inquirer = require("inquirer");
const fs = require("fs");

var employeeData = []

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
    },
  ]
    
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
    if (answers.nextEmployee === 'Yes') {
      employeeData.push(answers)
      return askEmployeePrompts()
    }
    else {
      employeeData.push(answers)
      writeHTML()
    }
  })
}

function getAnswers() {
  return inquirer.prompt(initPrompts).then((answers) => {
    if (answers.nextEmployee === 'Yes') {
      employeeData.push(answers)
      return askEmployeePrompts()
    }
    else {
      employeeData.push(answers)
      writeHTML()
    }
  })
}

function writeHTML() {
  const html = generateHTML(employeeData)
  const filename = `index.html`;
  fs.writeFile(filename, html, (err) =>
    err ? console.log(err) : console.log(`Successfully created HTML file '${filename}'!`))
  })
}

getAnswers()


  .then((data) => {
    console.log(data);
    const readme = generateHTML(data)
    const filename = `index.html`;
    fs.writeFile(filename, html, (err) =>
      err ? console.log(err) : console.log(`Successfully created HTML file '${filename}'!`))
    })

  function generateHTML(data) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <title>Team Viewer</title>
    </head>
    <body>
        <div class="jumbotron jumbotron-fluid" style="background-color: red;">
            <div class="container">
                <h1 class="text-center" style="color: white;">My Team</h1>
            </div>
        </div>
        
    </body>
    </html>`
    }

    function generateCard(data) {
      return `
      <div class="row" style="margin-top: 20px">
        <div class="mx-auto">
          <div class="card bg-light" style="width: 30rem; margin-bottom: 20px;">
            <div class="card-header" style="background-color: blue;">
              <h2 class="card-text text-center" style="margin-top: 20px; color: white;" id="Name">Employee's Name</h2>
              <h4 class="card-text text-center" style="margin-bottom: 20px; color: white" id="Position">Employee's Position</h3>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item" id="ID">ID: </li>
                <li class="list-group-item" id="Email">Email: </li>
                <li class="list-group-item" id="Special">Office Num/Github/School: </li>
              </ul>
            </div>
          </div>
        </div>
      </div>`
    }