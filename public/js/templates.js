
var jade = (function(exports){
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  } 
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context); 

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno 
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

  return exports;

})({});
jade.templates = {};
jade.render = function(node, template, data) {
  var tmp = jade.templates[template](data);
  node.innerHTML = tmp;
};

jade.templates["activity"] = function(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
// iterate activities
;(function(){
  if ('number' == typeof activities.length) {
    for (var $index = 0, $$l = activities.length; $index < $$l; $index++) {
      var act = activities[$index];

 var objType = " objectType-" + (act.object.objectType ? act.object.objectType : 'none');
 var actorType = " actorType-" + (act.actor.objectType ? act.actor.objectType : 'none');
 var className = "verb-" + act.verb + objType+actorType;
buf.push('<li');
buf.push(attrs({ "class": (className) }, {"class":true}));
buf.push('><div');
buf.push(attrs({ "class": ('row') + ' ' + ('activity') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span1') + ' ' + ('actor') }, {}));
buf.push('>');
 var actor = act.actor;
 var actUrl = actor.url? actor.url: '#';
if (actor.image && actor.image.url) {
{
buf.push('<a');
buf.push(attrs({ 'href':("" + (actUrl) + ""), "class": ('actor') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':(actor.image.url), "class": ('img-rounded') + ' ' + ('avatar') }, {"src":true}));
buf.push('/></a>');
}
} else {
{
buf.push('<h2>:-)</h2>');
}
}
buf.push('</div><div');
buf.push(attrs({ "class": ('span6') + ' ' + ('action') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('row') + ' ' + ('title') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span5') }, {}));
buf.push('><strong>');
var __val__ = act.actor.displayName
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</strong>&nbsp;');
var __val__ = act.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></div><div');
buf.push(attrs({ "class": ('row') + ' ' + ('activity_object') }, {}));
buf.push('>');
 var object = act.object;
 var objUrl = object.url ? object.url : '#';
buf.push('<div');
buf.push(attrs({ "class": ('span5') }, {}));
buf.push('><br');
buf.push(attrs({  }, {}));
buf.push('/><blockquote>');
if (object.image && object.image.url) {
{
buf.push('<a');
buf.push(attrs({ 'href':("" + (objUrl) + "") }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':(object.image.url), "class": ('img-rounded') + ' ' + ('avatar') }, {"src":true}));
buf.push('/></a>');
}
}
if (object.displayName) {
{
buf.push('<strong');
buf.push(attrs({ "class": ('activity-displayName') }, {}));
buf.push('>');
var __val__ = object.displayName
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</strong>');
}
} else if (object.title) {
{
buf.push('<strong');
buf.push(attrs({ "class": ('activity-title') }, {}));
buf.push('>');
var __val__ = object.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</strong>');
}
}
if (object.content) {
{
buf.push('<div');
buf.push(attrs({ "class": ('activity-content') }, {}));
buf.push('>');
var __val__ = object.content
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
}
buf.push('</blockquote></div></div><div');
buf.push(attrs({ "class": ('row') + ' ' + ('details') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span5') }, {}));
buf.push('>');
 var timedItem = act;
buf.push('<div');
buf.push(attrs({ "class": ('timestamp') + ' ' + ('small') }, {}));
buf.push('>');
var __val__ = (timedItem.userFriendlyDate ? timedItem.userFriendlyDate : timedItem.published)
buf.push(escape(null == __val__ ? "" : __val__));
 if (timedItem.provider && timedItem.provider.icon) {
{
buf.push('<div');
buf.push(attrs({ "class": ('span1') }, {}));
buf.push('><Via></Via></div><div');
buf.push(attrs({ "class": ('span2') }, {}));
buf.push('><img');
buf.push(attrs({ 'src':(timedItem.provider.icon.url), "class": ('service') }, {"src":true}));
buf.push('/></div>');
}
}
buf.push('</div></div></div></div></div><div');
buf.push(attrs({ "class": ('row') + ' ' + ('actions') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span2') }, {}));
buf.push('><small><a');
buf.push(attrs({ 'href':("#"), "class": ('btn') + ' ' + ('btn-mini') + ' ' + ('btn-warning') + ' ' + ('like-button') }, {"href":true}));
buf.push('><i');
buf.push(attrs({ "class": ('icon-ok') + ' ' + ('icon-white') }, {}));
buf.push('></i><small>&nbsp; Like</small></a></small></div><div');
buf.push(attrs({ "class": ('span4') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('row') }, {}));
buf.push('><textarea');
buf.push(attrs({ "class": ('span4') + ' ' + ('comment-area') }, {}));
buf.push('></textarea></div><div');
buf.push(attrs({ "class": ('row') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span2') + ' ' + ('offset2') }, {}));
buf.push('><small><a');
buf.push(attrs({ 'href':("#"), "class": ('btn') + ' ' + ('btn-mini') + ' ' + ('btn-success') + ' ' + ('comment-button') }, {"href":true}));
buf.push('><i');
buf.push(attrs({ "class": ('icon-pencil') + ' ' + ('icon-white') }, {}));
buf.push('></i><small>&nbsp; Post</small></a></small></div></div></div></div><div');
buf.push(attrs({ "class": ('row') + ' ' + ('action_results') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span2') }, {}));
buf.push('>');
if (act.likes_count && act.likes_count > 0) {
{
buf.push('<small');
buf.push(attrs({ 'id':('like_count') }, {}));
buf.push('>' + escape((interp = act.likes_count) == null ? '' : interp) + '</small><small');
buf.push(attrs({ "class": ('rest') }, {}));
buf.push('>&nbsp; liked this</small>');
}
}
buf.push('</div>');
if (act.comments) {
{
buf.push('<div');
buf.push(attrs({ "class": ('span4') }, {}));
buf.push('><ul>');
for(var i=0; i < act.comments.length; i++) {
 var comment = comments[i];
{
buf.push('<li><div');
buf.push(attrs({ "class": ('row') + ' ' + ('comment') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span1') + ' ' + ('actor') }, {}));
buf.push('>');
 var actor = comment.actor;
 var actUrl = actor.url? actor.url: '#';
if (actor.image && actor.image.url) {
{
buf.push('<a');
buf.push(attrs({ 'href':("" + (actUrl) + ""), "class": ('actor') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':(actor.image.url), "class": ('img-rounded') + ' ' + ('avatar') }, {"src":true}));
buf.push('/></a>');
}
} else {
{
buf.push('<h2>:-)</h2>');
}
}
buf.push('</div><div');
buf.push(attrs({ "class": ('span6') + ' ' + ('action') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('row') + ' ' + ('title') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span5') }, {}));
buf.push('><strong>');
var __val__ = actor.displayName
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</strong>&nbsp;');
var __val__ = comment.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></div><div');
buf.push(attrs({ "class": ('row') + ' ' + ('activity_object') }, {}));
buf.push('>');
 var object = comment.object;
 var objUrl = object.url ? object.url : '#';
buf.push('<div');
buf.push(attrs({ "class": ('span5') }, {}));
buf.push('><br');
buf.push(attrs({  }, {}));
buf.push('/><blockquote>');
if (object.image && object.image.url) {
{
buf.push('<a');
buf.push(attrs({ 'href':("" + (objUrl) + "") }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':(object.image.url), "class": ('img-rounded') + ' ' + ('avatar') }, {"src":true}));
buf.push('/></a>');
}
}
if (object.displayName) {
{
buf.push('<strong');
buf.push(attrs({ "class": ('activity-displayName') }, {}));
buf.push('>');
var __val__ = object.displayName
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</strong>');
}
} else if (object.title) {
{
buf.push('<strong');
buf.push(attrs({ "class": ('activity-title') }, {}));
buf.push('>');
var __val__ = object.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</strong>');
}
}
if (object.content) {
{
buf.push('<div');
buf.push(attrs({ "class": ('activity-content') }, {}));
buf.push('>');
var __val__ = object.content
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
}
buf.push('</blockquote></div></div><div');
buf.push(attrs({ "class": ('row') + ' ' + ('details') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span5') }, {}));
buf.push('>');
 var timedItem = comment;
buf.push('<div');
buf.push(attrs({ "class": ('timestamp') + ' ' + ('small') }, {}));
buf.push('>');
var __val__ = (timedItem.userFriendlyDate ? timedItem.userFriendlyDate : timedItem.published)
buf.push(escape(null == __val__ ? "" : __val__));
 if (timedItem.provider && timedItem.provider.icon) {
{
buf.push('<div');
buf.push(attrs({ "class": ('span1') }, {}));
buf.push('><Via></Via></div><div');
buf.push(attrs({ "class": ('span2') }, {}));
buf.push('><img');
buf.push(attrs({ 'src':(timedItem.provider.icon.url), "class": ('service') }, {"src":true}));
buf.push('/></div>');
}
}
buf.push('</div></div></div></div></div></li>');
}
 }
buf.push('</ul></div>');
}
buf.push('</div>');
 }
buf.push('</li>');
    }
  } else {
    for (var $index in activities) {
      var act = activities[$index];

 var objType = " objectType-" + (act.object.objectType ? act.object.objectType : 'none');
 var actorType = " actorType-" + (act.actor.objectType ? act.actor.objectType : 'none');
 var className = "verb-" + act.verb + objType+actorType;
buf.push('<li');
buf.push(attrs({ "class": (className) }, {"class":true}));
buf.push('><div');
buf.push(attrs({ "class": ('row') + ' ' + ('activity') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span1') + ' ' + ('actor') }, {}));
buf.push('>');
 var actor = act.actor;
 var actUrl = actor.url? actor.url: '#';
if (actor.image && actor.image.url) {
{
buf.push('<a');
buf.push(attrs({ 'href':("" + (actUrl) + ""), "class": ('actor') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':(actor.image.url), "class": ('img-rounded') + ' ' + ('avatar') }, {"src":true}));
buf.push('/></a>');
}
} else {
{
buf.push('<h2>:-)</h2>');
}
}
buf.push('</div><div');
buf.push(attrs({ "class": ('span6') + ' ' + ('action') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('row') + ' ' + ('title') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span5') }, {}));
buf.push('><strong>');
var __val__ = act.actor.displayName
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</strong>&nbsp;');
var __val__ = act.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></div><div');
buf.push(attrs({ "class": ('row') + ' ' + ('activity_object') }, {}));
buf.push('>');
 var object = act.object;
 var objUrl = object.url ? object.url : '#';
buf.push('<div');
buf.push(attrs({ "class": ('span5') }, {}));
buf.push('><br');
buf.push(attrs({  }, {}));
buf.push('/><blockquote>');
if (object.image && object.image.url) {
{
buf.push('<a');
buf.push(attrs({ 'href':("" + (objUrl) + "") }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':(object.image.url), "class": ('img-rounded') + ' ' + ('avatar') }, {"src":true}));
buf.push('/></a>');
}
}
if (object.displayName) {
{
buf.push('<strong');
buf.push(attrs({ "class": ('activity-displayName') }, {}));
buf.push('>');
var __val__ = object.displayName
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</strong>');
}
} else if (object.title) {
{
buf.push('<strong');
buf.push(attrs({ "class": ('activity-title') }, {}));
buf.push('>');
var __val__ = object.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</strong>');
}
}
if (object.content) {
{
buf.push('<div');
buf.push(attrs({ "class": ('activity-content') }, {}));
buf.push('>');
var __val__ = object.content
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
}
buf.push('</blockquote></div></div><div');
buf.push(attrs({ "class": ('row') + ' ' + ('details') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span5') }, {}));
buf.push('>');
 var timedItem = act;
buf.push('<div');
buf.push(attrs({ "class": ('timestamp') + ' ' + ('small') }, {}));
buf.push('>');
var __val__ = (timedItem.userFriendlyDate ? timedItem.userFriendlyDate : timedItem.published)
buf.push(escape(null == __val__ ? "" : __val__));
 if (timedItem.provider && timedItem.provider.icon) {
{
buf.push('<div');
buf.push(attrs({ "class": ('span1') }, {}));
buf.push('><Via></Via></div><div');
buf.push(attrs({ "class": ('span2') }, {}));
buf.push('><img');
buf.push(attrs({ 'src':(timedItem.provider.icon.url), "class": ('service') }, {"src":true}));
buf.push('/></div>');
}
}
buf.push('</div></div></div></div></div><div');
buf.push(attrs({ "class": ('row') + ' ' + ('actions') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span2') }, {}));
buf.push('><small><a');
buf.push(attrs({ 'href':("#"), "class": ('btn') + ' ' + ('btn-mini') + ' ' + ('btn-warning') + ' ' + ('like-button') }, {"href":true}));
buf.push('><i');
buf.push(attrs({ "class": ('icon-ok') + ' ' + ('icon-white') }, {}));
buf.push('></i><small>&nbsp; Like</small></a></small></div><div');
buf.push(attrs({ "class": ('span4') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('row') }, {}));
buf.push('><textarea');
buf.push(attrs({ "class": ('span4') + ' ' + ('comment-area') }, {}));
buf.push('></textarea></div><div');
buf.push(attrs({ "class": ('row') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span2') + ' ' + ('offset2') }, {}));
buf.push('><small><a');
buf.push(attrs({ 'href':("#"), "class": ('btn') + ' ' + ('btn-mini') + ' ' + ('btn-success') + ' ' + ('comment-button') }, {"href":true}));
buf.push('><i');
buf.push(attrs({ "class": ('icon-pencil') + ' ' + ('icon-white') }, {}));
buf.push('></i><small>&nbsp; Post</small></a></small></div></div></div></div><div');
buf.push(attrs({ "class": ('row') + ' ' + ('action_results') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span2') }, {}));
buf.push('>');
if (act.likes_count && act.likes_count > 0) {
{
buf.push('<small');
buf.push(attrs({ 'id':('like_count') }, {}));
buf.push('>' + escape((interp = act.likes_count) == null ? '' : interp) + '</small><small');
buf.push(attrs({ "class": ('rest') }, {}));
buf.push('>&nbsp; liked this</small>');
}
}
buf.push('</div>');
if (act.comments) {
{
buf.push('<div');
buf.push(attrs({ "class": ('span4') }, {}));
buf.push('><ul>');
for(var i=0; i < act.comments.length; i++) {
 var comment = comments[i];
{
buf.push('<li><div');
buf.push(attrs({ "class": ('row') + ' ' + ('comment') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span1') + ' ' + ('actor') }, {}));
buf.push('>');
 var actor = comment.actor;
 var actUrl = actor.url? actor.url: '#';
if (actor.image && actor.image.url) {
{
buf.push('<a');
buf.push(attrs({ 'href':("" + (actUrl) + ""), "class": ('actor') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':(actor.image.url), "class": ('img-rounded') + ' ' + ('avatar') }, {"src":true}));
buf.push('/></a>');
}
} else {
{
buf.push('<h2>:-)</h2>');
}
}
buf.push('</div><div');
buf.push(attrs({ "class": ('span6') + ' ' + ('action') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('row') + ' ' + ('title') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span5') }, {}));
buf.push('><strong>');
var __val__ = actor.displayName
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</strong>&nbsp;');
var __val__ = comment.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></div><div');
buf.push(attrs({ "class": ('row') + ' ' + ('activity_object') }, {}));
buf.push('>');
 var object = comment.object;
 var objUrl = object.url ? object.url : '#';
buf.push('<div');
buf.push(attrs({ "class": ('span5') }, {}));
buf.push('><br');
buf.push(attrs({  }, {}));
buf.push('/><blockquote>');
if (object.image && object.image.url) {
{
buf.push('<a');
buf.push(attrs({ 'href':("" + (objUrl) + "") }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':(object.image.url), "class": ('img-rounded') + ' ' + ('avatar') }, {"src":true}));
buf.push('/></a>');
}
}
if (object.displayName) {
{
buf.push('<strong');
buf.push(attrs({ "class": ('activity-displayName') }, {}));
buf.push('>');
var __val__ = object.displayName
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</strong>');
}
} else if (object.title) {
{
buf.push('<strong');
buf.push(attrs({ "class": ('activity-title') }, {}));
buf.push('>');
var __val__ = object.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</strong>');
}
}
if (object.content) {
{
buf.push('<div');
buf.push(attrs({ "class": ('activity-content') }, {}));
buf.push('>');
var __val__ = object.content
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
}
buf.push('</blockquote></div></div><div');
buf.push(attrs({ "class": ('row') + ' ' + ('details') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span5') }, {}));
buf.push('>');
 var timedItem = comment;
buf.push('<div');
buf.push(attrs({ "class": ('timestamp') + ' ' + ('small') }, {}));
buf.push('>');
var __val__ = (timedItem.userFriendlyDate ? timedItem.userFriendlyDate : timedItem.published)
buf.push(escape(null == __val__ ? "" : __val__));
 if (timedItem.provider && timedItem.provider.icon) {
{
buf.push('<div');
buf.push(attrs({ "class": ('span1') }, {}));
buf.push('><Via></Via></div><div');
buf.push(attrs({ "class": ('span2') }, {}));
buf.push('><img');
buf.push(attrs({ 'src':(timedItem.provider.icon.url), "class": ('service') }, {"src":true}));
buf.push('/></div>');
}
}
buf.push('</div></div></div></div></div></li>');
}
 }
buf.push('</ul></div>');
}
buf.push('</div>');
 }
buf.push('</li>');
   }
  }
}).call(this);

}
return buf.join("");
}