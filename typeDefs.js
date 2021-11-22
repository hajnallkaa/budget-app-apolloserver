const {gql} = require('apollo-server-express');

const typeDefs = gql`
    

    type Transaction {
        id:ID
        category: String
        type: String
        value: Int
        date: String
    }

    type Date {
        x: Int
        y: Int
    }

    type Query {
        getAllTransactions: [Transaction]
        getTransaction(id: ID): Transaction
        getTransactionsByCategory(category: String): [Transaction]
        getBalance(category: String): Int
        getDaysofIncome: [Date]
        getDaysofExpense: [Date]
        getMoney: Int
    }


    input TransactionInput {
        category: String
        type: String
        value: Int
        date: String
    }

    type Mutation {
        createTransaction(transaction: TransactionInput): Transaction
        deleteTransaction(id: ID) : String
        updateTransaction(id: ID, transaction:TransactionInput): Transaction
        
    }
`

module.exports = typeDefs;