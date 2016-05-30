'use strict';

module.exports = function copier() {
  var inport = this.openInputPort('IN');
  var outport = this.openOutputPort('OUT');
  while (true) {
    var ip = inport.receive();
    if (ip === null) {
      break;
    }

    var words = ip.contents.split(' ');
    words.forEach(function(word) {
      var wordIP = this.createIP(word);
      outport.send(wordIP);
    }.bind(this));
    this.dropIP(ip);
  }
};
