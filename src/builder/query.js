import { getCommand } from '../action/command'
import { joinConditions } from '../helper/functions'

const QueryBuilder = function () {
  const sql = {
    table(table) {
      this._table = table
      return this
    },
    columns(columns) {
      this._columns = columns
      return this
    },
    sets(sets) {
      this._sets = sets
      return this
    },
    conditions(conditions) {
      this._conditions = joinConditions(conditions)
      return this
    },
    limit(limit) {
      this._limit = limit
      return this
    },
    build(type) {
      return getCommand(type, {
        table: this._table,
        columns: this._columns,
        sets: this._sets,
        conditions: this._conditions,
        limit: this._limit
      })
    }
  }

  return sql
}

export { QueryBuilder }
