var request = require('superagent');

//
var getHtml = function(url, cb) {
  request
    .get(url)
    .end((err, res) => {
      if (err) {
        console.log(err)
        process.exit(1)
      }
      cb(res.text)
    })
};
module.exports = getHtml
