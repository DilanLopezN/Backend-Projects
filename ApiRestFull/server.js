import http from 'node:http' // <-- modulo interno do node diferenciado pelo node:

// criação do servidor

const users = []
const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    // retorna array de users em formato json
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John doe',
      email: 'john.doe@gmail.com'
    })
    return res.writeHead(201).end('Usuario listado')
  }

  return res.writeHead(404).end('Not Found')
})
server.listen(3333, () => {
  console.log('Server running')
})
