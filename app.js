/**
 * Created by danrumney on 5/30/16.
 */
var fbp = require('jsfbp');

var network = new fbp.Network();

var reader = network.defProc('./components/reader', 'READER');
var writer = network.defProc('./components/writer', 'WRITER');
var decomposer = network.defProc(require('./components/decomposer'), 'DECOMPOSER');
var recomposer = network.defProc(require('./components/recomposer'), 'RECOMPOSER');

network.initialize(reader, 'FILE', 'input.txt');
network.initialize(writer, 'FILE', 'output.txt');
network.initialize(recomposer, 'SIZE', 80);

network.connect(reader,'OUT',decomposer, 'IN');
network.connect(decomposer,'OUT',recomposer, 'IN');
network.connect(recomposer,'OUT',writer, 'IN');

var fiberRuntime = new fbp.FiberRuntime();
network.run(fiberRuntime, {trace: false});

