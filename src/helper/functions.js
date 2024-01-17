import * as SQL from '../constant'

const joinConditions = (conditions) => {
  const ret = Object.keys(conditions).map((operator) => {
    // eslint-disable-next-line array-callback-return
    const conditionsArray = conditions[operator].reduce((acc, cur) => {
      for (const [comparator, obj] of Object.entries(cur)) {
        // eslint-disable-next-line no-unreachable-loop
        for (const [key, value] of Object.entries(obj)) {
          if (comparator.toUpperCase() === 'IS' || comparator.toUpperCase() === 'ISNOT') {
            return [...acc, key + ' ' + SQL.COMPARATOR[comparator.toUpperCase()] + ' ' + value]
          }
          return [...acc, `${key} ${SQL.COMPARATOR[comparator.toUpperCase()]} '${value}'`]
        }
      }
    }, [])
    return '(' + conditionsArray.join(` ${SQL.OPERAND[operator.toUpperCase()]} `) + ')'
  })
  return ret.join(' AND ')
}

const joinSets = (sets) => {
  const array = Object.entries(sets).reduce((acc, cur) => {
    return [...acc, `${cur[0]}='${cur[1]}'`]
  }, [])

  return array.join(',')
}

const toString = (array) => {
  return array.reduce((acc, cur) => {
    return [...acc, `'${cur}'`]
  }, [])
}

const printSelectClause = (table, columns) => {
  return `SELECT ${columns} FROM ${table}`
}

const printDeleteClause = (table) => {
  return `DELETE FROM ${table}`
}

const printUpdateClause = (table, sets) => {
  return `UPDATE ${table} SET ${joinSets(sets)}`
}

const printInsertClause = (table, sets) => {
  return `INSERT INTO ${table} (${Object.keys(sets)}) VALUES (${toString(Object.values(sets))})`
}

const printWhereClause = (conditions) => {
  return `${conditions ? `WHERE ${conditions}` : ''}`
}

const printLimitClause = (limit) => {
  return `${limit ? `LIMIT ${limit}` : ''}`
}

const printSql = (sqls, delimiter = ' ') => {
  return sqls.join(delimiter)
}

export {
  joinConditions,
  joinSets,
  toString,
  printSelectClause,
  printDeleteClause,
  printUpdateClause,
  printInsertClause,
  printWhereClause,
  printLimitClause,
  printSql
}
