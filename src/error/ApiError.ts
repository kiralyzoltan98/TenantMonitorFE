export class ApiError extends Error {
  status: number;
  response?: Response; // Keep the original response if needed

  constructor(message: string, status: number, response?: Response) {
      super(message);
      this.name = "ApiError";
      this.status = status;
      this.response = response;
      // Ensure correct prototype chain for instanceof checks
      Object.setPrototypeOf(this, ApiError.prototype);
  }
}