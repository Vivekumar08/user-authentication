class GeneralError extends Error {
    constructor(message) {
      super();
      this.message = message;
    }
  
    getCode() {
      if (this instanceof BadRequest) {
        return 400;
      }
      if (this instanceof NotFound) {
        return 404;
      }
      if (this instanceof Unauthorized) {
        return 401;
      }
      if (this instanceof ApplicationError) {
        return 400;
      }
      if (this instanceof InsufficientAccessError) {
        return 403;
      }
      return 400;
    }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Unauthorized extends GeneralError {}
class ApplicationError extends GeneralError {}
class InsufficientAccessError extends GeneralError {}

const useErrorHandler = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: "error",
      message: err.message.code == 11000 ? `${Object.keys(err.message.keyValue)} : Value already exists` : err.message,
    });
  }
  console.log("code here",err);
  // console.log("code here", JSON.stringify(req));

  if(err.writeErrors) {
    console.log("🚀 ~ file: error-handler.js:45 ~ useErrorHandler ~ writeErrors:", err.writeErrors)
    var errorMessage = ""
    for (let value of err.writeErrors) {
      const startIndex = value?.errmsg?.indexOf('"');

    // Find the position of the closing quote
      const endIndex = value?.errmsg?.lastIndexOf('"');

    // Extract the error message substring
     errorMessage = errorMessage.concat(value.errmsg.substring(startIndex, endIndex + 1));
     console.log("errorMessage is ", errorMessage);
    }

    const collectionStart = err.writeErrors[0].errmsg.indexOf('unthread-dev.');

    const collectionEnd = err.writeErrors[0].errmsg.indexOf('index');

    var collectionName = err.writeErrors[0].errmsg.substring(collectionStart + 13, collectionEnd);

    console.log("errorMessage is ", errorMessage);
  }

  return res.status(400).json({
      status: "error",
      message: err.code == 11000 ? `${err?.writeErrors  ? errorMessage.replace(/"([^"]+)"(?=(\"|$))/g, '$1, ') : err.keyValue[Object.keys(err.keyValue)]}` + ` ${collectionName ? collectionName : ""}` + " already exists" : err.message,
  });
};

module.exports = {
    GeneralError,
    BadRequest,
    NotFound,
    Unauthorized,
    ApplicationError,
    InsufficientAccessError,
    useErrorHandler,
};

process.on("uncaughtException", (err) => {
    console.log(err);
});

process.on("unhandledRejection", (err) => {
    console.log(err);
});
