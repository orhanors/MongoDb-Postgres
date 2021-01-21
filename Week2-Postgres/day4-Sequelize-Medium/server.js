const express = require("express");
const cors = require("cors");
const server = express();
const db = require("./src/db");
const services = require("./src/services");
const {
	notFoundHandler,
	badRequestHandler,
	forbiddenHandler,
	unAuthorizedHandler,
	genericHandler,
} = require("./src/helpers/errorHandling");

require("dotenv").config();

const port = process.env.PORT || 5000;

server.use(express.json());
server.use(cors());
server.use("/api", services);

//***************** */
server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(forbiddenHandler);
server.use(unAuthorizedHandler);
server.use(genericHandler);

db.sequelize.sync({ force: false }).then((result) => {
	server.listen(port, () => {
		console.log("Server is running on PORT:", port);
	});
});
