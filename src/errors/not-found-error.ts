import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./custom-api-error";

export class NotFoundError extends CustomApiError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}