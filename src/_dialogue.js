var inquirer = require('inquirer');
var chalk = require('chalk');
var join = require("path").join;
var filterCols = require('./_filterCols');

var okCool = function() {
  console.log('\n\n    ' + chalk.blue('ok cool.') + '\n\n')
}
var nice = function() {
  console.log('\n\n    ' + chalk.blue('nice.') + '\n\n')
}

var whichTable = (tables, cb) => {
  if (!tables || tables.length === 0) {
    console.log(chalk.yellow('\n\n   no html tables found on page!'))
    console.log('\n sorry.')
    process.exit()
  }
  //assume it, if only one
  if (tables.length <= 1) {
    return cb(tables[0])
  }
  //ask otherwise
  return inquirer
    .prompt([{
      type: 'list',
      name: 'table',
      message: 'Which table to parse?',
      choices: tables.map((t) => t.desc)
    }])
    .then(answers => {
      nice()
      var table = tables.find(t => t.desc === answers.table)
      return cb(table)
    });
}

var whichUrl = (cb) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'url',
        message: "What's the webpage url?",
        default: "https://en.wikipedia.org/wiki/List_of_operas_by_Mozart"
      },
    ])
    .then(answers => {
      okCool()
      cb(answers.url)
    });
}


function expandPath(path) {
  var homedir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  if (!path) return path;
  if (path === '~') return homedir;
  if (path.slice(0, 2) !== '~/') return path;
  return join(homedir, path.slice(2));
}

var whichFile = (cb) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'path',
        message: "Where to?",
        default: "~/table-data.json"
      },
    ])
    .then(answers => {
      var path = expandPath(answers.path)
      cb(path)
    });
}

var whichColumns = (table, cb) => {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'which columns to include?',
        name: 'columns',
        choices: table.headers.map(c => {
          return {
            name: c,
            checked: true
          }
        }),
        validate: function(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one column.';
          }
          return true;
        }
      }
    ])
    .then(answers => {
      table = filterCols(table, answers.columns)
      cb(table)
    });
}

module.exports = {
  whichTable: whichTable,
  whichUrl: whichUrl,
  whichFile: whichFile,
  whichColumns: whichColumns
}
