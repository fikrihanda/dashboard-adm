window._ = require('lodash')
window.moment = require('moment')
window.$ = require('jquery')
window.Popper = require('popper.js')
window.Copper = require('cropperjs')

require('bootstrap')
require('jquery-cropper')

$.ajaxSetup({
  cache: false,
  dataType: 'json'
})
