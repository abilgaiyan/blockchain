const Block = require('./block');

// const block = new Block('foo','bar','zoo','baz');

// console.log(block.toString());
// console.log(Block.genesis().toString());
// console.log(Block.mineBlock(Block.genesis().hash, ))

const fooBlock = Block.mineBlock(Block.genesis(),'foo');
console.log(fooBlock.toString());