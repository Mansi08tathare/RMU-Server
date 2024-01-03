import { Injectable } from "@nestjs/common";
@Injectable()
export class CommonService {
  constructor(
  ) { }

  successMessage(data, message, code) {
    return {
      data,
      message: message,
      statusCode: code
    }
  }

  errorMessage(message, code, error?) {
    return {
      message: message,
      statusCode: code,
    }
  }
}