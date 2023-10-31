export const logInfo = <T>(...params: Array<T>): void => {
  console.log(...params)
}

export const logError = <T>(...params: Array<T>): void => {
  console.error(...params)
}
