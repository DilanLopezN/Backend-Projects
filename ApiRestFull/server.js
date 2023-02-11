import http from 'node:http' // <-- modulo interno do node diferenciado pelo node:

// criação do servidor

const users = []
const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res.end('Usuario listado')
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John doe',
      email: 'john.doe@gmail.com'
    })
    return res.end('Usuario listado')
  }

  return res.end('Hello world')
})
server.listen(3333, () => {
  console.log('Server running')
})
