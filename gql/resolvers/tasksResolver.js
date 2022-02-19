import { QUANTITY_PER_PAGE } from '../constants'
export default {
  Query: {
    getTasks: async (obj, args, context, info) => {
      if (args.id) {
        try {
          const res = await context.esClient.get({
            index: process.env.ELASTIC_SEARCH_INDEX,
            id: args.id,
            refresh: true
          })
          return {
            total: 1,
            tasks: [Object.assign(res._source, {id: args.id})]
          }
        } catch(e) {
          if (!e.meta.body.found) {
            return {
              total: 0,
              tasks: []
            }
          }
          console.error(e)
        }
      } else {
        try {
          const field = Object.keys(args)[0]
          const res = context.tasksParser((await context.esClient.search({
            index: process.env.ELASTIC_SEARCH_INDEX,
            from: args.page,
            size: QUANTITY_PER_PAGE,
            body: {
              query: {
                query_string: {
                  query: args[field] + '*',
                  default_field: field
                }
              }
            }
          })))
          return {
            total: res.total,
            tasks: res.data
          }
        } catch(e) {
          console.error(e)
          return {
            message: 'Server Error'
          }
        }
      }
    } 
  },
  Mutation: {
    addTask: async (obj, args, context, info) => {
      try {
        await context.esClient.index({
          index: process.env.ELASTIC_SEARCH_INDEX,
          body: {
            name: args.name,
            description: args.description
          },
          refresh: true,
        })
        return {
          message: 'OK',
        }        
      } catch(e) {
        console.error(e)
        return {
          message: 'Server Error'
        }
      }
    },
    removeTask: async (obj, args, context, info) => {
      try {
        await context.esClient.delete({ id: args.id, index: process.env.ELASTIC_SEARCH_INDEX })
        return { message: 'OK' }
      } catch(e) {
        console.error(e)
        return {
          message: 'Server Error'
        }
      }
    }
  }
}