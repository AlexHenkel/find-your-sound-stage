import "reflect-metadata";
import * as path from "path";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { StudioResolver } from "./resolvers";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [StudioResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(4000);

  // eslint-disable-next-line no-console
  console.log(`Server is running, GraphQL available at ${url}`);
}

bootstrap();
