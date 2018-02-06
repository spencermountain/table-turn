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
  el.remove('.reference')
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

var findLongest = function(el) {
  let chosen = el.find('tr').first()
  el.find('tr').each((i, e) => {
    e = $(e)
    if (e.find('th').length > chosen.find('th').length) {
      chosen = e
    }
  })
  return chosen
}

var getHeaders = function(el) {
  if (el.find('thead').length) {
    el = el.find('thead')
  }
  //first tr of the header, if it's there
  if (el.find('tr').length) {
    el = findLongest(el)
  }
  //use th, if available
  let arr = el.find('th')
  if (arr.length === 0) {
    arr = el.find('td')
  }
  //make it an array
  return arr.map((_, h) => {
    return trim($(h).text())
  }).toArray()
}

var tables = function(html) {
  html = $.load(html)
  return html('table').map(function(i, el) {
    el = $(el)
    el = cleanup(el)
    var table = {
      desc: '',
      headers: [],
      data: []
    }
    //get rows
    var rows = el.find('tr')
    table.data = parse(rows)

    //get headers
    table.headers = getHeaders(el)

    var desc = table.headers.slice(0, 3).join(', ')
    if (desc) {
      desc = `(${desc})`
    }
    table.desc = chalk.blue(` ${rows.length} rows - `) + chalk.yellow(`${desc}`)

    return table
  }).toArray()
}
module.exports = tables
