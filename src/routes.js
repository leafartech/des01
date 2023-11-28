import { Database } from './database.js'
import { ReadCsv } from './read-csv.js'

const database = new Database()

export const Routes = [
    {
        method: 'GET',
        path: '/tasks/csv',
        async handler(req, res) {
            const data = await database.select('tasks')

            ReadCsv()

            return res.end(JSON.stringify(data))
        }       
    },
    {
        method: 'GET',
        path: '/tasks',
        async handler(req, res) {
            const data = await database.select('tasks')

            return res.end(JSON.stringify(data))
        }       
    },
    {
        method: 'POST',
        path: '/tasks',
        async handler(req, res) {
            const { task, description } = req.body

            await database.insert('tasks', { task, description })

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: '/tasks',
        async handler(req, res) {
            const { task, description } = req.body
            const { query } = req
                
            await database.update('tasks', { task, description }, query)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: '/tasks',
        async handler(req, res) {
            const { query } = req

            await database.delete('tasks', query)

            return res.writeHead(202).end()
        }
    }
]