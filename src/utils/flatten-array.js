/*!
 * arr-flatten <https://github.com/jonschlinkert/arr-flatten>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */


export default function flattenArray (arr, res=[]) {
  var i = 0, cur;
  var len = arr.length;
  for (; i < len; i++) {
    cur = arr[i];
    Array.isArray(cur) ? flattenArray(cur, res) : res.push(cur);
  }
  return res;
}
