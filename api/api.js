const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
module.exports = (app) => {
  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet('1wc8EGVzLGqeePqZkfjkFTz6Rewk8F5cOVxN8888gXtY');
  let sheet;

  const updateNodeCounts = (callback) =>
  {
    async.series([
      function getInfoAndWorksheets(step) {
        doc.getInfo(function (err, info) {
          if (err) console.log('error!', err);
          sheet = info.worksheets[0];
          step();
        });
      }
      ,
      function workingWithRows(step) {
        sheet.getRows({
          offset: 0,
          limit: 20,
          orderby: 'col2'
        }, function (err, rows) {
          if (err) console.log('error!', err);
          // console.log(rows[0]);
          callback(rows[0]);
          step();
        });
      }
    ], function (err) {
      if (err) {
        console.log('Error: ' + err);
      }
    });
  }
  app.get('/nodecounts', (req, res) => {
    const callback = (data) => {
      if (data._xml) {delete data._xml}
      if (data.id) {delete data.id}
      if (data._links) {delete data._links}
      res.json(data)
    }
    updateNodeCounts(callback);
  });
}