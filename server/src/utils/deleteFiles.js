const fs = require('fs');
const path = require('path');

module.exports = function(files) {
  files.map((filename) => {
    file = path.resolve(__dirname, '..', '..', 'uploads', filename);
    
    if(fs.lstatSync(file).isFile()) {
      fs.unlinkSync(file);
    } else {
      console.log('not a file');
    }
  })

  return;
}