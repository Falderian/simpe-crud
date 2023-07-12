import { IncomingMessage, ServerResponse } from 'http';

export const deleteResponse = (request: IncomingMessage, response: ServerResponse<IncomingMessage>, id?: number) => {
  switch (request.url) {
    // response for unexpected get requests
    default:
      response.statusCode = 400;
      response.write(`CANNOT POST ${request.url}`);
      response.end();
  }
};
