module.exports = function(grunt) {
    var comnCSS = require("comn_css"),
        less = require("less"),
        fileUtils = require("file_utils");

    grunt.registerMultiTask("comn_css", "Compiles less/css modules into one file", function() {
        var options = this.options(),
            done = this.async(),

            index = options.index || options.main || options.file,
            out = options.out,
            lessOptions = options.less != null ? options.less : true,

            str = comnCSS(index, options);

        if (lessOptions) {
            if (typeof(lessOptions) !== "object") {
                lessOptions = {};
            }

            less.render(str, lessOptions, function(err, data) {
                if (err) {
                    done(err);
                    return;
                }
                fileUtils.writeFileSync(out, data.css);
                done();
            });
        } else {
            fileUtils.writeFileSync(out, str);
            done();
        }
    });
};
