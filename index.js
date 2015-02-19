var pretty = require('pretty-hrtime')
var through = require('through2')
var gutil = require('gulp-util')

module.exports = duration

function duration(name) {
  var start  = process.hrtime()
  var stream = through.obj({
    objectMode: true
  })

  stream.start = resetStart

  name = name || 'gulp-duration'
  name = '' + name + ': '

  return stream.once('end', function() {
    var time = pretty(process.hrtime(start))

    gutil.log(name + gutil.colors.magenta(time))
  })

  function resetStart() {
    start = process.hrtime()
  }
}
