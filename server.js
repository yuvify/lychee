const fastify = require("fastify")();

fastify.register(require("@fastify/static"), {
    root: require("path").join(__dirname, "public"),
});

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err;
    console.log(`Server is running at ${address}`);
});
