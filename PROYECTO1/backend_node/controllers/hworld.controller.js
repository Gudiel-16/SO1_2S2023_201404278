
const hello_world = async (req, res) => {
    res.status(200).send("Hello World - NODE")
};

module.exports = { hello_world };