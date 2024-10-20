import {ApolloServer, gql} from 'apollo-server'
import {typeDefs} from './schema'
import { Query , Mutation} from './resolvers'
import { PrismaClient, Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

const resolvers = {
   Query,
   Mutation
}

const prisma = new PrismaClient() ;

export interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
}

const server = new ApolloServer({
     typeDefs,
     resolvers,
     context: {
        prisma
     }
})

server.listen().then(({url}) => {
    console.log(`Server ready on ${url}`)
})