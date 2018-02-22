import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import config from './config';
import schema from './schema';

export function run() {
  const app = express();

  // bodyParser is needed just for POST.
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));

  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      query: `{

    }
  `
    })
  );

  app.get('/', (req, res) => {
    res.end(`Hello World!\n`);
  });

  app.listen(config.PORT, () => {
    console.log(`Basic app listening on port ${config.PORT}`);
  });

  return app;
}
