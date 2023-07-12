import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../users';

export const postResponse = (request: IncomingMessage, response: ServerResponse<IncomingMessage>) => {
  switch (request.url) {
    case '/api/users':
      request.on('data', (chunk) => {
        const userId = users[users.length - 1]?.userId + 1 || 0;
        const { username, age, hobbies } = JSON.parse(chunk.toString());

        if (!username) {
          response.statusCode = 400;
          response.write('username field is required');
          response.end();
          return;
        }

        users.push({ userId, username, age, hobbies });
        response.statusCode = 201;
        response.write('User has been created succesfulyy');
        response.end();
      });
      console.log(users);
      break;
    default:
      response.statusCode = 400;
      response.write(`CANNOT POST ${request.url}`);
      response.end();
  }
};
