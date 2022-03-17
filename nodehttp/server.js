const http = require('http');

const todos = [
  { id: 1, text: 'todo one' },
  { id: 2, text: 'todo two' },
  { id: 3, text: 'todo three' },
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
        success: false,
        data: null,
        error: null,
      };

      if (method === 'GET' && url === '/todos') {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === 'POST' && url === '/todos') {
        const { id, text } = JSON.parse(body);

        // Validation
        if (!id || !text) {
          status = 400;
          response.error = 'Please add id and text';
        } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
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

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* STATUS CODE */
// 1.xx Info

// 2.xx success
// 200 success
// 201 created      create
// 204 No Content   delete

// 3.xx redirection
// 304 not modified

// 4.xx Client error
// 400 bad request
// 401 unauthorized
// 404 not found

// 5.xx server error
// 500 internal server error

// developer.mozilla.org/en-us/docs/web/http/status
