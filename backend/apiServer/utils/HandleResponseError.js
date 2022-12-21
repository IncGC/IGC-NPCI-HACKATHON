// if there is error in user input (req.body)
class RequestInputError extends Error{
    constructor({ code = 400, message }) {
        super(message);
        this.name = "RequestInputError";
        this.code = code
      }
}

// if resourcce or object alredy exists
class ObjectExistsError extends Error{
    constructor({code = 409, message }) {
        super(message);
        this.name = "ObjectExistsError";
        this.code = code
      }
}

// if resourcce not found
class ResourceNotFoundError extends Error{
    constructor({code = 404, message }) {
        super(message);
        this.name = "ResourceNotFoundError";
        this.code = code
      }
}

// syntax is correct but cannot process the request
class CustomError extends Error{
    constructor({ code = 422, message }){
        super(message)
        this.name = "CustomError"
        this.code = code
    }
}

exports.HandleResponseError = function(err, res){
    if(err instanceof RequestInputError){
        return res.status(err.code).json({ errors: [{ msg: err.message }] })
    }
    if(err instanceof CustomError){
        return res.status(err.code).json({ errors: [{ msg: err.message }] })
    }
    if(err instanceof ObjectExistsError){
        return res.status(err.code).json({ errors: [{ msg: err.message }] })
    }
    if(err instanceof ResourceNotFoundError){
        return res.status(err.code).json({ errors: [{ msg: err.message }] })
    }
    console.log(err)
    res.status(500).json({ errors: [{ msg: "Internal server error" }] })
}

exports.RequestInputError = RequestInputError
exports.ObjectExistsError = ObjectExistsError
exports.ResourceNotFoundError = ResourceNotFoundError
exports.CustomError = CustomError

exports.API_ENDPOINT_NOT_FOUND_ERR = 'Api Endpoint does not found';
exports.SERVER_ERR = "Something went wrong";
exports.AUTH_HEADER_MISSING_ERR= "auth header is missing";
exports.AUTH_TOKEN_MISSING_ERR="auth token is missing";
exports.JWT_DECODE_ERR = "Incorrect token";
exports.USER_NOT_FOUND_ERR="User not found";
exports.ACCESS_DENIED_ERR= "Access deny for normal user";
exports.PHONE_ALREADY_EXISTS_ERR="One user with this phone number is already exist please login"

class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;
  