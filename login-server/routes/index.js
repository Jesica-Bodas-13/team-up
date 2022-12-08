// const path = require('path');
const loginRoutes = require("./loginRoutes");
const constructorMethod = (app) => {
    app.use('/login', loginRoutes);
    
    app.use("*", (req, res) => {
        res.status(404).json({
            Error : "404 NOT FOUND"
        })
    })
};

module.exports = constructorMethod;