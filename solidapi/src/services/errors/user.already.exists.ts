class UserAlreadyExists extends Error {
  constructor() {
    super('E-mail/User already exists')
  }
}