const Transaction = require("./models/Transactions.model.js");


const resolvers = {
    Query: { 

        getAllTransactions: async() => {
            return await Transaction.find();
            
        },

        getTransaction: async (_parent, {id}, _context, _info) => {
            return await Transaction.findById(id);
        },

        getTransactionsByCategory: async (_parent, _args, _context, _info) => {
            const {category} = _args;
            let output = [];
            return await (await Transaction.find()).filter((a) => a.category == category).map(item => {
                const typeofitem = item.type
                const quantity = item.value;
                return {type: typeofitem, value: quantity};
            }).sort((a, b) => parseFloat(a.x) - parseFloat(b.x)).reduce(function(acc, val){
                const o = acc.filter(function(obj){
                    return obj.type==val.type;
                }).pop() || {type:val.type, value:0};    
                o.value += val.value;
                acc.push(o);
                return acc;
            },[]).filter(function(itm, i, a) {
                return i == a.indexOf(itm);
            });
        
        },


    getMoney: async() => {
           const reducer = (accumulator, curr) => accumulator + curr;
        return await (await Transaction.find()).map(i => {
            return (i.category === 'Expense' ? i.value * -1 : i.value)
        }).reduce(reducer)
            
         
    },
    getDaysofIncome : async() => {
            return await( await Transaction.find()).filter((a) => a.category == "Income").map(item => {
                const dateList = item.date.split('-');
                const day = Number(dateList[dateList.length-1]);
                const quantity = item.value;
                return {x: day, y: quantity};
            }).sort((a, b) => parseFloat(a.x) - parseFloat(b.x)).reduce(function(acc, val){
                const o = acc.filter(function(obj){
                    return obj.x==val.x;
                }).pop() || {x:val.x, y:0};    
                o.y += val.y;
                acc.push(o);
                return acc;
            },[]).filter(function(itm, i, a) {
                return i == a.indexOf(itm);
            });
        
        },

    getDaysofExpense : async() => {
            return await( await Transaction.find()).filter((a) => a.category == "Expense").map(item => {
                const dateList = item.date.split('-');
                const day = Number(dateList[dateList.length-1]);
                const quantity = item.value;
                return {x: day, y: quantity};
            }).sort((a, b) => parseFloat(a.x) - parseFloat(b.x)).reduce(function(acc, val){
                const o = acc.filter(function(obj){
                    return obj.x==val.x;
                }).pop() || {x:val.x, y:0};
                o.y += val.y;
                acc.push(o);
                return acc;
            },[]).filter(function(itm, i, a) {
                return i == a.indexOf(itm);
            });
        }


    },

    Mutation: {
        createTransaction : async (parent, args, context, info) => {
            const {category, type, value, date} = args.transaction;
            const transaction = new Transaction({category, type, value, date})
            await transaction.save()
            return transaction;   
        },   

        deleteTransaction: async(parent, args, context, info) => {
            const {id} = args
            await Transaction.findByIdAndDelete(id)
            return "Ok, post delete"
        },

       

        updateTransaction : async(parent, args, context, info) => {
            const {id} = args
            const {category, type, value, date} = args.transaction;
            const transaction = await Transaction.findByIdAndUpdate(id, {category, type, value, date},{new: true})
            return transaction
        }
        
    }
};

module.exports = resolvers;