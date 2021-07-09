const loading = (req, res, next) => {
    console.log("Loading...");
    next()
}
module.exports = loading;