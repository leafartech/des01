export async function json(req, res) {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers))
    } catch(e) {
        req.body = null
    }

    res.setHeader("Content-type", "application/json")
}