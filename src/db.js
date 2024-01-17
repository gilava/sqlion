import { initDatabasePool } from './init'

const DBWrap = function (database, opts, adapter = 'mysql') {
  if (!database) {
    throw new TypeError('Database argument must be provided！')
  }

  this.pool = initDatabasePool(adapter, database, opts || {})
  this.isTransaction = false

  this.connection = async function () {
    this.conn = await this.pool.getConnection()
  }

  this.execute = async function (sql) {
    if (!sql) {
      throw new TypeError(
        'Builder argument cannot be null or undefined！Must be provided in String type.'
      )
    }

    if (!this.conn) {
      await this.connection()
    }

    const [result] = await this.conn.query(sql).finally(async () => {
      if (!this.isTransaction) {
        await this.pool.releaseConnection(this.conn)
      }
    })

    return result
  }
}

export { DBWrap }
