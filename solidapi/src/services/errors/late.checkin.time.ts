export class LateCheckinError extends Error {
  constructor() {
    super('Exceded checkin time.');
  }
}