const filestack = require('filestack-js');

const apikey = 'A76GDi3qSRQC4bBHDlf9Mz';

const client = filestack.init(apikey);
const token = {};

const onProgress = (evt) => {
  console.log('Progress: ' + evt.totalPercent);
};

client.upload(__dirname + '/path/to/file', { onProgress }, {}, token)
  .then(res => {
    console.log('success: ', res)
  })
  .catch(err => {
    console.log(err)
});