import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../users';

export const putResponse = (request: IncomingMessage, response: ServerResponse<IncomingMessage>, id?: number) => {
  if (id) {
    const findedUser = users.find((user) => user.userId === id);
    if (findedUser) {
      request.on('data', (chunk) => {
        const newUsername = JSON.parse(chunk.toString()).username;
        findedUser.username = newUsername;
      });
      response.statusCode = 200;
      response.write('User has been updated succesfully');
      response.end();
    } else {
      response.statusCode = 404;
      response.write('User with id ' + id + ' not found');
      response.end();
    }
    return;
  }
  switch (request.url) {
    // response for unexpected get requests
    default:
      response.statusCode = 400;
      response.write(`CANNOT PUT ${request.url}`);
      response.end();
  }
};
