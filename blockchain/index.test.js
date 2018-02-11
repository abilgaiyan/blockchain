const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () =>{
    let bc, bc2;
    beforeEach(() =>{
       bc = new Blockchain();
       bc2 = new Blockchain();
    });

    it('start with genesis block', () =>{
       expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('add a new block', ()=>{
      const data ='foo';
      bc.addBlock(data);
      expect(bc.chain[bc.chain.length -1].data).toEqual(data);

    });

    it('validate the valid chain',() =>{
       bc2.addBlock('foo');
       expect(bc.isValidChain(bc2.chain)).toBe(true);           
    });

    it('invalidate a chain with corrupt genesis block', () =>{
       bc2.chain[0].data ='bad data';
       expect(bc.isValidChain(bc2.chain)).toBe(false);    
    });

    it('invalidate the corrupt chain', ()=>{
      bc2.addBlock('foo');
      bc2.chain[1] = 'Not foo';
      expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replace the chain with valid chain', ()=>{
      bc2.addBlock('good');
      bc.replaceChain(bc2.chain);
      
      expect(bc.chain).toEqual(bc2.chain);

    });

    it('does not replace the chain if chain is less than equal to current change', ()=>{
       bc.addBlock('foo');
       bc.replaceChain(bc2.chain);
       expect(bc.chain).not.toEqual(bc2.chain);
    });
})