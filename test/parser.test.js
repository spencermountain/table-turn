var test = require('tape')
var parse = require('../src/02-parse')

test('th-basic:', function(t) {
  let html = `
 <div>
	 <table style="width:100%">
	  <tr>
	    <th>Firstname</th>
	    <th>Lastname</th>
	    <th>Age</th>
	  </tr>
	  <tr>
	    <td>Jill</td>
	    <td>Smith</td>
	    <td>50</td>
	  </tr>
	  <tr>
	    <td>Eve</td>
	    <td>Jackson</td>
	    <td>94</td>
	  </tr>
	</table>
 </div>
	 `
  let obj = parse(html)[0]
  t.equal(obj.headers.join(','), 'Firstname,Lastname,Age')
  t.end()
})


test('thead', function(t) {
  let html = `
 <div>
	 <table>
	   <thead>
	   <tr>
	      <th>Month</th>
	      <th>Savings</th>
	   </tr>
	   </thead>
	   <tfoot>
	   <tr>
	       <td>Sum</td>
	       <td>$180</td>
	   </tr>
	   </tfoot>
	   <tbody>
	   <tr>
	      <td>January</td>
	      <td>$100</td>
	   </tr>
	   <tr>
	       <td>February</td>
	       <td>$80</td>
	   </tr>
	   </tbody>
	 </table>
 </div>
	 `
  let obj = parse(html)[0]
  t.equal(obj.headers.join(','), 'Month,Savings')
  t.end()
})
