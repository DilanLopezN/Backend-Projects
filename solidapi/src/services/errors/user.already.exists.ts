export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail/User already exists')
  }
}