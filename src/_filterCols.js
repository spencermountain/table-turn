
//remove unwanted columns from the data
const filterCols = function(table, columns) {
  //put it in an object
  columns = columns.reduce((h, str) => {
    h[str] = true
    return h;
  }, {});

  //grab just these columns
  let newData = []
  table.data.forEach((row) => {
    let arr = row.filter((a, i) => {
      let title = table.headers[i]
      return columns[title] === true
    })
    newData.push(arr)
  })
  table.data = newData
  return table
}
module.exports = filterCols
