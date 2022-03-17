const http = require('http');

const todos = [
  { id: 1, text: 'todo one' },
  { id: 2, text: 'todo two' },
  { id: 3, text: 'todo three' },
];

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Powerd-By': 'Node.js',
  });

  res.end(JSON.stringify({ success: true, data: todos }));
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
