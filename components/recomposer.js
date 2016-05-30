/**
 * Created by danrumney on 5/30/16.
 */
'use strict';

module.exports = function copier() {
  var inport = this.openInputPort('IN');
  var sizePort = this.openInputPort('SIZE');
  var outport = this.openOutputPort('OUT');

  var sizeIP = sizePort.receive();
  var lineSize = sizeIP.contents;
  this.dropIP(sizeIP);

  var wordBuffer = [];
  var bufferLength = 0;

  while (true) {
    var ip = inport.receive();
    if (ip === null) {
      outport.send(this.createIP(wordBuffer.join(" ")));
      break;
    }

    var word = ip.contents;

    if(bufferLength + 1 + word.length > lineSize) {
      var line = wordBuffer.join(" ");
      outport.send(this.createIP(line));
      wordBuffer = [];
      bufferLength = 0;
    }

    wordBuffer.push(word);
    bufferLength += 1 + word.length;

    this.dropIP(ip);
  }
};

