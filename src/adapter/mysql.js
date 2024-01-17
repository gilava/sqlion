/* eslint-disable no-useless-catch */

import * as mysql from 'mysql2/promise'

const COMPULSORY_KEYS = ['host', 'user', 'password']

const DEFAULTS_OPTIONS = {
  port: 3306,
  host: '127.0.0.1',
  user: 'root',
  password: '',
  connectionLimit: 10
}

const createMySqlPool = (database, opts) => {
  if (!database) {
    throw new TypeError('Database argument must be provided！')
  }

  const isValidOptions = Object.keys(opts).every((key) => {
    return COMPULSORY_KEYS.includes(key)
  })

  if (!isValidOptions) {
    throw new TypeError(
      'Create MySql Pool argument must be an object and include host, user, password properties！'
    )
  }

  try {
    const options = {
      ...DEFAULTS_OPTIONS,
      ...opts
    }

    const pool = mysql.createPool({
      database,
      ...options
    })

    return pool
  } catch (err) {
    throw err
  }
}

export { createMySqlPool }
