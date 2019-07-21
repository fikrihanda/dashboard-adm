window._ = require('lodash')
window.moment = require('moment')
window.$ = require('jquery')
window.Popper = require('popper.js')
window.Copper = require('cropperjs')
window.pdfMake = require('pdfmake/build/pdfmake')

require('bootstrap')
require('jquery-cropper')

$.ajaxSetup({
  cache: false,
  dataType: 'json'
})

pdfMake.vfs = require('@/js/vfs_fonts').vfs
pdfMake.fonts = {
  OpenSans: {
    normal: 'open-sans-v16-latin-300.woff',
    italics: 'open-sans-v16-latin-300italic.woff',
    bold: 'open-sans-v16-latin-regular.woff',
    bolditalics: 'open-sans-v16-latin-italic.woff',
  },
  Roboto: {
    normal: 'roboto-mono-v6-latin-300.woff',
    italics: 'roboto-mono-v6-latin-300italic.woff',
    bold: 'roboto-mono-v6-latin-regular.woff',
    bolditalics: 'roboto-mono-v6-latin-italic.woff'
  }
}
