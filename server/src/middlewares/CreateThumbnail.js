const sharp = require('sharp');
const path = require('path');
module.exports = function(req, res, next) {
  if(!req.file) return next();

  const thumbnailName = `thumbnail-${req.file.filename}`;
  
  sharp(path.resolve(__dirname, '..', '..', 'uploads', req.file.filename))
    .resize(100, 100, {
      fit: 'inside',
    })
    .toFile(path.resolve(__dirname, '..', '..', 'uploads', thumbnailName));

  res.locals.thumbnailName = thumbnailName;
  
  return next();

}