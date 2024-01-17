const hasIntersectionValues = (object, ...params) => {
  if (!isValidObject(object)) {
    return []
  }

  return Object.values(object).filter((v) => {
    return params.includes(v)
  })
}

const isValidObject = (object) => {
  if (!object) {
    return false
  }
  return object.constructor === Object && !!Object.keys(object).length
}

export { hasIntersectionValues }
