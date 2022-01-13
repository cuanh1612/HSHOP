exports.erroHandler = (err, req, res, next) => {
    err.statusCode =err.statusCode || 500
    err.message = err.message || "Internam server error"

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            sucess: "false",
            message: err.message,
            error: err,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        //Handle cassterror when wrong mongoose Oject ID error
        if(err.name == 'CastError'){
            err.message = `Resource not found. Ivalid: ${err.path}`
            err.statusCode = 400
        }

        //Handling Mongoose validation Error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message)[0]
            err.message = message
        }

        //Hand Mongoose duplicate key errors
        if(err.code === 11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            err.statusCode = 400
            err.message = message
        }

        //Handling wrong JWT error
        if(err.name === 'JsonWebTokenError'){
            const message = `JSON Web Token is invalid. Try Again!!!`
            err.statusCode = 400
            err.message = message
        }

        //Handling Expored JWT error
        if(err.name === 'TokenExpiredError'){
            const message = `JSON Web Token is invalid. Try Again!!!`
            err.statusCode = 400
            err.message = message
        }

        res.status(err.statusCode).json({
            sucess: "false",
            message: err.message,
        })
    }
}