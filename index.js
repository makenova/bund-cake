module.exports = function(app) {

    var fs = require('fs')
      , md5 = require('md5')
      , async = require('async')
      , uglify = require('uglify-js')
      , cache = {}
      , totalFile = []


    /* Route needed for storing the javascript */
    app.get('/assets/bundle/:bundle.js', function(req, res, next) {
        var bundle = req.params.bundle
        res.send(cache[bundle])
    })


    /* Returns a hash of all the names of the JS files */
    var makeHash = function(filePaths) {
        var names = ''
        for(var i = 0; i < filePaths.length; i++)
            names += filePaths[i]
        return md5.digest_s(names)
    }


    /* Concat a bunch of strings together, bruh */
    var concatFiles = function(fileStrings) {
        var allFiles = ''
        for(var i = 0; i < fileStrings.length; i++)
            allFiles += (fileStrings[i] + '\r\n')
        return allFiles
    }


    return {
        js: function() {
            var files = arguments
              , hash = makeHash(files)
              , script = "<script type='text/javascript' src='/assets/bundle/" + hash + ".js'></script>"

            if(cache[hash]) {
                return script
            }

            async.concatSeries(files, fs.readFile, function(error, result) {
                if(error) {
                    console.log('There was an error somewhere.')
                    console.log('ERROR:: ' + error)
                } else {
                    totalFile = uglify.minify(concatFiles(result), {fromString:true}).code
                    cache[hash] = totalFile
                }
            })

            return script
        }
    }
}