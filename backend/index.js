const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const { PORT } = require("./config");
const schema = require("./schema");
const root = require("./resolvers");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
