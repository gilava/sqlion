const isValidArray = (param) => {
  return Array.isArray(param) && !!param.length
}

export { isValidArray }
