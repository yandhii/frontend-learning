const CryptoJS = require("crypto-js");
const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const ec = new EC('secp256k1');

const getTimestamp = () => new Date().getTime();

class Block{
    constructor(index, timestamp, transactions,prevHash='', nonce=0){
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.nonce = nonce;
        this.hash = this.calculateHash();
    }

    get header(){
        return JSON.stringify({
            index: this.index,
            timestamp: this.timestamp,
            transactions: this.transactions,
            prevHash:this.prevHash,
            nonce : this.nonce,
            hash: this.hash
        })
    }

    calculateHash(){
        let hashJson = this.header;
        delete hashJson.hash;
        return SHA256(this.header).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.coinbaseReward = 100;
    }

    /**
     * getter function : query latest block
     */
    get latestBlock(){
        return this.chain[this.chain.length - 1];
    }

    /**
     * Create a fixed genesis block
     * @returns 
     */
    createGenesisBlock(){
        let genesisBlock = new Block(0,1686736088334,"Genesis Block");
        return genesisBlock;
    }

    /**
     * Miner mine a new block by collect transactions from transaction pool
     * @param {string} minerAddr 
     */
    mineBlock(minerAddr){
        let coinbaseTx = new Transaction(null, minerAddr, this.coinbaseReward);
        this.pendingTransactions.push(coinbaseTx);

        let newBlock = new Block(this.latestBlock.index+1, getTimestamp(), this.pendingTransactions,this.latestBlock.hash);
        while(newBlock.hash.substring(0,this.difficulty) !== '0'.repeat(this.difficulty)){
            ++newBlock.nonce;
            newBlock.hash = newBlock.calculateHash();
        }

        this.chain.push(newBlock);
        this.pendingTransactions = [];
    }

    /**
     * Check if chain is valid
     * @returns 
     */
    isChainValid(){
        const checkValidityOf = {
            isIndexValid: (curBlock, prevBlock) => curBlock.index === prevBlock.index + 1,
            isHashValid: (curBlock, prevBlock) => curBlock.prevHash === prevBlock.hash,
            isTimestampValid: (curBlock, prevBlock) => curBlock.timestamp >= prevBlock.timestamp 
        }
        
        // check if genesis block is valid
        const realGenesisBlock = this.createGenesisBlock();
        if(realGenesisBlock !== this.chain[0]){
            return false;
        }

        // check other blocks
        for(let i=1; i < this.chain.length; i++){
            const curBlock = this.chain[i];
            const prevBlock = this.chain[i-1];
            if(!Object.values(checkValidityOf).every(checkValidity => checkValidity(curBlock, prevBlock))){
                return false;
            }
        }

        return true;
    }

    /**
     * Iterate over the chain and check balance
     */
    getBalanceOfAddress(addr){
        let balance = 0;
        for(const block of this.chain){
            for(const tx of block.transactions){
                if(tx.from === addr){
                    balance -= tx.amount;
                }

                if(tx.to === addr){
                    balance += tx.amount;
                }
            }
        }
        return balance;
    }
    
    /**
     * Add new valid transaction to transaction pool in the chain
     * @param {Transaction} transaction 
     */
    addTransaction(transaction){
        // prevent from or to be null
        if(!transaction.from || !transaction.to){
            throw new Error('Transaction must include from and to address');
        }
        
        if(!transaction.isSigValid()){
            throw new Error('Cannot add invalid transaction to chain');
        }

        if(transaction.amount <= 0){
            throw new Error("Transaction amount should > 0");
        }

        const fromWalletBalance = this.getBalanceOfAddress(transaction.from);
        if (fromWalletBalance < transaction.amount){
            throw new Error("Insufficient balance");
        }

        // prevent double-spending attack
        const pendingTxForWallet = this.pendingTransactions.filter(tx => tx.from === transaction.from);
        if(pendingTxForWallet.length > 0){
            const pendingAmount = pendingTxForWallet.map(tx => tx.amount).reduce((prevAmount, curAmount) => prevAmount + curAmount);
            const totalAmount = pendingAmount + transaction.amount;
            if(totalAmount > fromWalletBalance){
                throw new Error('Pending transactions for this wallet is higher than its balance.');
            }
        }
        
        this.pendingTransactions.push(transaction);
    }
}

class Transaction{
    constructor(from, to, amount){
        this.from = from;
        this.to = to;
        this.amount = amount;
    }

    calculateHash(){
        return SHA256(
            JSON.stringify({
                from: this.from,
                to : this.to,
                amount : this.amount
            })
        ).toString();
    }

    signTransaction(privateKey){
        if(privateKey.getPublic("hex") !== this.from){
            throw new Error("You cannot sign other wallet's transaction");
        }

        const hashTx = this.calculateHash();
        const sig = privateKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    /**
     * check if signature is valid
     * @param {string} fromAddr 
     * @returns 
     */
    isSigValid(fromAddr){
        if(fromAddr == null){
            return true;
        }

        if(!this.signature || this.signature.length === 0){
            throw new Error("No signature in this transaction");
        }

        const publicKey = ec.keyFromPublic(fromAddr, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

const main = () =>{
    const myPrivateKey = ec.keyFromPrivate("12513b4efbca3a95eca60e1fa911728d233936370729ae866e21f8ea747115b0", "hex");
    const myWalletAddr = myPrivateKey.getPublic('hex');
    
    // create blockchain instance
    const jsChain = new BlockChain();
    jsChain.mineBlock(myWalletAddr);

    // Make a transaction
    const tx1 = new Transaction(myWalletAddr, 'public key of recipient', 60);
    // tx2 with not successfully add to transaction pool, because 60 + 50 > 100
    const tx2 = new Transaction(myWalletAddr, "pub", 50);

    // sign transaction
    tx1.signTransaction(myPrivateKey);
    tx2.signTransaction(myPrivateKey);

    // add transaction to transaction pool
    jsChain.addTransaction(tx1);
    jsChain.addTransaction(tx2);

    // Miner collect the transactions
    jsChain.mineBlock(myWalletAddr);
    
    console.log(jsChain.chain)
    console.log('Balance of yandhii is', jsChain.getBalanceOfAddress(myWalletAddr));
}

main();
