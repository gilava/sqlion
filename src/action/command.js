import {
  printSelectClause,
  printUpdateClause,
  printInsertClause,
  printDeleteClause,
  printWhereClause,
  printLimitClause,
  printSql
} from '../helper/functions'
import { isValidArray } from '../helper/array'
import { hasIntersectionValues } from '../helper/object'
import { COMMAND } from '../constant'

const getCommand = (type, payload = {}) => {
  if (!isValidArray(hasIntersectionValues(COMMAND, type))) {
    type = 'SELECT'
  }

  let { table, columns, conditions, limit, sets } = payload

  const selectCommand = () => {
    if (!isValidArray(columns)) {
      columns = '*'
    }

    return [
      printSelectClause(table, columns),
      printWhereClause(conditions),
      printLimitClause(limit)
    ]
  }

  const insertCommand = () => {
    return [printInsertClause(table, sets)]
  }

  const updateCommand = () => {
    return [printUpdateClause(table, sets), printWhereClause(conditions)]
  }

  const deleteCommand = () => {
    return [printDeleteClause(table), printWhereClause(conditions)]
  }

  const operator = {
    SELECT: selectCommand,
    INSERT: insertCommand,
    UPDATE: updateCommand,
    DELETE: deleteCommand
  }

  return printSql(operator[type]())
}

export { getCommand }
