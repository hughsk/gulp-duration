var pretty = require('pretty-hrtime')
var through = require('through2')
var chalk = require('chalk')

module.exports = duration

var prefix = '[' + chalk.green('gulp') + '] '

function duration(name, logfn) {
  var start  = process.hrtime()
  var stream = through.obj({
    objectMode: true
  })

  stream.start = resetStart

  name = name || 'gulp-duration'
  name = '' + name + ': '

  return stream.once('end', function() {
    var time = pretty(process.hrtime(start))

    log(logfn, name + chalk.magenta(time))
  })

  function resetStart() {
    start = process.hrtime()
  }

  function log(logfn, str) {
    str = prefix + str
    logfn ? logfn(str) : console.log(str)
  }
}
