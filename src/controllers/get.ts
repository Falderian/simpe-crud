import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../users';

export const getResponse = (request: IncomingMessage, response: ServerResponse<IncomingMessage>, id?: number) => {
  if (id) {
    const findedUser = users.find((user) => user.userId === id);
    if (findedUser) {
      response.statusCode = 200;
      response.write(JSON.stringify(findedUser));
      response.end();
    } else {
      response.statusCode = 404;
      response.write('User with id ' + id + ' not found');
      response.end();
    }
    return;
  }
  switch (request.url) {
    case '/api/users':
      response.statusCode = 200;
      response.write(JSON.stringify(users));
      response.end();
      break;
    case '/api/users/':
      console.log('id');
      break;
    default:
      response.statusCode = 400;
      response.write(`CANNOT GET ${request.url}`);
      response.end();
  }
};
