const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const {
	notFoundHandler,
	forbiddenHandler,
	unAuthorizedHandler,
	badRequestHandler,
	genericHandler,
} = require("./src/helpers/errorHandling");
//----------------------
const server = express();
require("dotenv").config();

const port = process.env.PORT || 3001;
server.use(express.json());
server.use(cors());
server.use("/api", routes);

//---------------------

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(forbiddenHandler);
server.use(unAuthorizedHandler);
server.use(genericHandler);
server.listen(port, () => {
	console.log("Server is running on port:", port);
});
