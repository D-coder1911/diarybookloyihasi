export class BaseException extends Error {
  constructor(message, status, errorCode = null) {
    super(message);
    this.isException = true;
    this.status = status;
    this.errorCode = errorCode; 
    Error.captureStackTrace(this, this.constructor); 
  }
}
