const COMMAND = {
  SELECT: 'SELECT',
  INSERT: 'INSERT',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

const COMPARATOR = {
  EQ: '=',
  GT: '>',
  LT: '<',
  GTE: '>=',
  LTE: '<=',
  NEQ: '<>',
  IS: 'IS',
  ISNOT: 'IS NOT'
}

const OPERAND = {
  AND: 'AND',
  OR: 'OR'
}

export { COMMAND, COMPARATOR, OPERAND }
