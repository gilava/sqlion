/* eslint-disable no-useless-catch */

import { MySqlAdapter } from './adapter'

const cached = new Map()

const getAdapterPool = (type, database, opts) => {
  if (type === 'mysql') {
    return MySqlAdapter.createMySqlPool(database, opts)
  }
}

const getPoolInstance = (adapter, database, opts) => {
  if (cached.has(database)) {
    return cached.get(database)
  } else {
    const adapterPool = getAdapterPool(adapter, database, opts || {})
    cached.set(database, adapterPool)

    return cached.get(database)
  }
}

const initDatabasePool = (adapter = 'mysql', db, opts) => {
  if (!db) {
    throw new TypeError('Database argument must be provided！')
  }

  try {
    const pool = getPoolInstance(adapter, db, opts || {})

    return pool
  } catch (err) {
    throw err
  }
}

export { initDatabasePool }
