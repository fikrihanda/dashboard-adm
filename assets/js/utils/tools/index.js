const files = require.context('.', false, /\.js$/)
const tools = {}

files.keys().forEach(function (fileName) {
  if (fileName === './index.js') return
  tools[fileName.replace(/(\.\/|\.js)/g, '')] = files(fileName).default
})

export default tools
