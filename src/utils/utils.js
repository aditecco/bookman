
/* ---------------------------------
utils
--------------------------------- */

export function log(message, method = `log`) {
  return console[`${method}`](message);
}
