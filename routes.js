const fs = require('fs')

function requestHandler(req, res) {

    const url = req.url
    const method = req.method

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<h1> HELLO USER </h1>')
        res.write('<form action="/message" method="POST"><input type="text" name="message"> <button type="submit"> Send</button></form>')
        return res.end()
    }

    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
            const message = parsedBody.split('=')[1];
            fs.writeFile("message.txt", message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<h1> HELLO WORLD </h1>')
    res.end()
}

module.exports = requestHandler