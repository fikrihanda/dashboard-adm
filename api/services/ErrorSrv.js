const flaverr = require('flaverr')

module.exports = function (codeOrOpts = {
  name: 'badRequest',
  message: 'Bad Request',
  code: 'E_BAD_REQUEST',
  raw: {id: 400}
}, err = new Error()) {
  return flaverr(codeOrOpts, err)
}
