var $ = require('cheerio')
var chalk = require('chalk')
//
var trim = (str) => {
  str = str.replace(/[\n\t]/g, '')
  return str.replace(/^\s+|\s+$/g, '')
}

//opinionated cleanup for popular websites
var cleanup = (el) => {
  el.remove('.nv-view')
  el.remove('.nv-edit')
  el.remove('.nv-talk')
  return el
}

var parse = (rows) => {
  var arr = []
  rows.each((i, r) => {
    var row = $(r).find('td').map((o, col) => {
      return trim($(col).text())
    }).toArray()
    arr.push(row)
  })
  arr = arr.filter((a) => a.length > 0)
  return arr
}

var tables = function(html) {
  html = $.load(html)
  return html('table').map(function(i, el) {
    el = $(el)
    el = cleanup(el)
    var table = {
      desc: '',
      data: []
    }
    //get rows
    var rows = el.find('tr')
    table.data = parse(rows)

    //get headers
    var headers = el.find('th').map((_, h) => {
      return trim($(h).text())
    }).toArray()
    var desc = headers.slice(0, 4).join(', ')
    if (desc) {
      desc = `(${desc})`
    }
    table.desc = chalk.blue(` ${rows.length} rows - `) + chalk.yellow(`${desc}`)

    return table
  }).toArray()
}
module.exports = tables
