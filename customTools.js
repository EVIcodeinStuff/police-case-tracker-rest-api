// Dependencies
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';


//Generate a unique ID using System Clock as seed to prevent Collision
function makeID(numCode){
    var dateSeed = new Date().getTime();
    var uuid = 'x'+numCode+'xxxwxxxxxxxxxxxxxxxxxxxx'.replace(/[xw]/g, function(character) {
        var randNum = (dateSeed + Math.random()*16)%16 | 0;
        dateSeed = Math.floor(dateSeed/16);
        return (character=='x' ? randNum : (randNum&0x3|0x8)).toString(16);
    });
    
    return uuid;
};

function encryptText(txt, key){
  var cipher = crypto.createCipher(algorithm, key)
  var crypted = cipher.update(txt,'utf8','hex')
  crypted += cipher.final('hex');

  return crypted;
}

function decryptText(txt, key){
  var decipher = crypto.createDecipher(algorithm, key)
  var dec = decipher.update(txt,'hex','utf8')
  dec += decipher.final('utf8');

  return dec;
}

function callBackWithTimeout (callback, timeout) {
  var go, timer;
  go = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      callback.apply(this, arguments);
    }
  };
  timer = setTimeout(go, timeout, "timeout");

  return run;
}

exports.callBackWithTimeout = callBackWithTimeout;
exports.makeID = makeID;
exports.encryptText = encryptText;
exports.decryptText = decryptText;
