
const response = (res, code, msg, data) => {
    res.status(code).send({ status: code, msg, data });
};

module.exports = { response };