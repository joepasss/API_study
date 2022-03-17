const { read, stat } = require('fs');
const http = require('http');

const todos = [
  {
    id: 1,
    text: 'Todo one',
  },
  {
    id: 2,
    text: 'Todo Two',
  },
  {
    id: 3,
    text: 'Todo Three',
  },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  let body = [];

  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();

      let status = 404;
      const response = {
        succsess: false,
        data: null,
        error: null,
      };

      if (method === 'GET' && url === '/todos') {
        status = 200;
        response.succsess = true;
        response.data = todos;
      } else if (method === 'POST' && url === '/todos') {
        const { id, text } = JSON.parse(body);

        if (!id || !text) {
          status = 400;
          response.error = 'please add id and text';
        } else {
          todos.push({ id, text });
          status = 201;
          response.succsess = true;
          response.data = todos;
        }
      }

      res.writeHead(status, {
        'Content-Type': 'application/json',
        'X-Powerd-By': 'Node.js',
      });

      res.end(JSON.stringify(response));
    });
});

const PORT = 5000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
