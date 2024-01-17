const DBTransactionDecorator = function (dbwrap) {
  if (!dbwrap) {
    throw new TypeError('DBWrap argument must be provided and cannot be null or undefined！')
  }

  dbwrap.beginTransaction = async function () {
    await this.connection()
    await this.conn.beginTransaction()

    this.isTransaction = true
  }

  dbwrap.commit = async function () {
    await this.conn.commit()
  }

  dbwrap.rollback = async function () {
    await this.conn.rollback()
  }
  dbwrap.release = async function () {
    await this.pool.releaseConnection(this.conn)
  }

  return dbwrap
}

export { DBTransactionDecorator }
