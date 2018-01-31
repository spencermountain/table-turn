#!/usr/bin/env node
var fs = require('fs')
var getHtml = require('./01-fetch')
var parseTables = require('./02-parse')
var open = require('open')
var chalk = require('chalk')
var dialog = require('./_dialogue')
var whichUrl = dialog.whichUrl
var whichTable = dialog.whichTable
var whichFile = dialog.whichFile
var whichColumns = dialog.whichColumns

console.log('\n\n     ' + chalk.red('Parse a html-table into json:') + '\n\n')

//allow cli argument, or show dialog
const getUrl = function(cb) {
  let url = process.argv[2]
  if (url) {
    cb(url)
  } else {
    whichUrl(cb)
  }
}

getUrl((url) => {
  getHtml(url, (html) => {
    var tables = parseTables(html)
    whichTable(tables, (table) => {
      whichColumns(table, (table) => {
        whichFile((file) => {
          fs.writeFileSync(file, JSON.stringify(table.data, null, 2))
          console.log('done!')
          open(file)
        })
      })
    })
  })
})
