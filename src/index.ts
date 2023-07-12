import { createServer } from 'http';
import { getResponse } from './controllers/get';
import { postResponse } from './controllers/post';
import { putResponse } from './controllers/put';
import { deleteResponse } from './controllers/delete';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

const server = createServer((request, response) => {
  const id = Number(request.url?.split('/')[3]);
  switch (request.method) {
    case 'GET':
      getResponse(request, response, id);
      break;
    case 'POST':
      postResponse(request, response);
      break;
    case 'PUT':
      putResponse(request, response, id);
      break;
    case 'DELETE':
      deleteResponse(request, response, id);
      break;
    default:
      // Send response for requests with no other response
      response.statusCode = 400;
      response.write('No Response');
      response.end();
  }
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
