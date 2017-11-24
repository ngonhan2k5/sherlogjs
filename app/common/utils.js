var _         = require('underscore')
  , constants = require('./constants');

_.str = require('underscore.string');

/**
 * Responds a binary file (image)
 *
 * @param   res   obj
 * @return  void
 */
exports.respondPixel = function(res) {
  var buffer = new Buffer(35);
  buffer.write('R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64');
  res.send(buffer, {'Content-Type': 'image/gif'}, 200);
};

/**
 * Checks whether the request's host is whitelisted
 *
 * @param   whitelist   array
 * @param   host        string
 * @return  boolean
 */
exports.isHostAuthorized = function(whitelist, host) {
  return _.indexOf(whitelist, host);
};

/**
 * Converts tracking data to string and adds comma after each pair
 *
 * @param   obj      obj
 * @return  string
 */
exports.stringify = function(obj) {
  if (typeof obj !== 'object') return obj;
  var stringify = _.map(obj, function (value, key) {
    // _event key is only used when a string is passed on client's push method
    if(key==='_event') return _.str.capitalize(value)+'';
    if(typeof value === 'object') {
      value = JSON.stringify(obj, undefined, 4);
    }
    return _.str.capitalize(key)+': '+value;
  });
  return _.str.toSentence(stringify, ', ', ', ');
};

/**
 * Escapes forbidden characters.
 *
 * @param   str         string
 * @return  string
 */
exports.escape = function(str) {
  return String(str).replace(/&/g, '&amp;')
                     .replace(/"/g, '&quot;')
                     .replace(/'/g, '&#39;')
                     .replace(/</g, '&lt;')
                     .replace(/>/g, '&gt;');
};

/**
 * Renders error page.
 *
 * @param   res         obj
 * @return  void
 */
exports.errorPage = function(res) {
  res.render('error');
};


exports.getHostName = function (url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}
