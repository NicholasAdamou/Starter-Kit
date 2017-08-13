'use-strict';

var config = require('./config.js')();

var src = config.root + config.src;
var dest = config.root + config.dist;

module.exports = {
	to: {
		src: src,
        dist: dest,
		pug: {
			in: src +  config.views + '*.pug',
			out: dest
		},
		sass: {
			in: src + config.sass,
			out: dest + config.css
		},
		js: {
			in: src + config.js.dir + config.js.name,
			out: dest + 'assets/' + config.js.dir
		},
		images: {
			in: src + config.images + '*.*',
			out: dest + config.images
        },
       	vendors: {
       		sass: src + config.vendors + '/sass/*.*',
   			js: src + config.vendors + '/js/*.*'
       	},
		favicons: {
			in: src + config.favicons + '/*.*',
			out: dest + config.favicons
		}
	}
};