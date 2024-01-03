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

  errorMessage(data,message, code ) {
    return {
      data,
      message: message,
      statusCode: code,
    }
  }
}