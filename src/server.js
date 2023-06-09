import http from 'node:http';

const users = [];

const server = http.createServer((req, res) => {

  const { method, url } = req;

  if (method === 'GET' && url === '/users') {
    return res.setHeader('Content-type', 'application/json').end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'Carlos',
      email: 'carlos.av.amorim@gmail.com'
    })

    return res.status(201).json(users)
  }

  return res.writeHead(404).end('');
});

server.listen(3333)
