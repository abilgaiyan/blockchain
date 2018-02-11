const Block = require('./block');

class Blockchain {
   constructor(){
       this.chain = [Block.genesis()];
   }

   addBlock(data){
      const block = Block.mineBlock(this.chain[this.chain.length -1], data);
      this.chain.push(block);
      return block;
   }

   isValidChain(chain){
       if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
        console.log('genesis block', false);   
        return false;
       }
        
         
       for(let i =1; i < chain.length ; i++){
           const block = chain[i];
           const lastBlock = chain[i-1];
           if(block.lastHash !== lastBlock.hash || 
               block.hash !== Block.blockHash(block) ){
                 //  console.log(block.hash);
                //   console.log(Block.blockHash(block))
                   
                 //  console.log(block.toString());
                //   console.log(lastBlock.toString());
                   return false;
               }
               
       }  

       console.log(true);
       return true;
   }
   
   replaceChain(newChain){
       if (newChain.length <= this.chain.length){
           console.log('The received chain is not longer than current chain');
           return;
       }
       else if(!this.isValidChain(newChain)){
           console.log('The received chain is not valid');
           return;
       }

       console.log('Replacing new chain with the current chain');
       this.chain = newChain;
   }
}

module.exports = Blockchain;