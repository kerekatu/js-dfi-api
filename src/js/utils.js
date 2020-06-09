const CREDENTIALS = 'F005936:JRbTlfWVMH0bm3n'

export const DEFAULT_SETTINGS = {
  method: 'GET',
  headers: {
    Authorization: 'Basic ' + btoa(CREDENTIALS)
  }
}
