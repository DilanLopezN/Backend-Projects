import http from 'node:http' // <-- modulo interno do node diferenciado pelo node:

// criação do servidor
const server = http.createServer((req, res) => {
  return res.end('Hello world')
})
server.listen(3333, () => {
  console.log('Server running')
})
