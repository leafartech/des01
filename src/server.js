import http from 'http'
import { json } from './middleware/json.js'
import { Routes } from './routes.js'

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const routes = Routes

    const route = routes.find((route) => {
        let [urlPath, queryParams] = url.split('?')
        req.query = queryParams?.split('=')[1]

        if (route.method === method && route.path === urlPath) {
            return route
        }
    })

    if (route) {
        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)