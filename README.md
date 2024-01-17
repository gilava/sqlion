# sqlion 🦁

Tools for manage connection pool, transaction and construct sql statement, currently support MySQL only.

## Installation

```js
npm install --save-dev sqlion
```

## Supported Database

✅ MySQL\
❌ Postgres

## Instance

- QueryBuilder
- DBWrap
- DBTransaction

### QueryBuilder

- Construct sql statement

#### Methods

- .table()
- .columns()
- .sets()
- .conditions()
- .limit()
- .build()

**Example:**

```js
import { QueryBuilder, SQL } from 'sqlion'

// Basic select statment
// Output: SELECT col1,col2,col3 FROM myTable
const sql = new QueryBuilder()
  .table('myTable')
  .columns(['col1', 'col2', 'col3'])
  .build(SQL.COMMAND.SELECT)

// Select with condition and limit
// Output: SELECT col1,col2,col3 FROM myTable WHERE (col1 = 'val1' AND col2 > 'val2' AND col3 < 'val3' AND col4 >= 'val4') AND (col5 <= 'val5' OR col6 <> 'val6' OR col7 IS val7 OR col8 IS NOT val8) LIMIT 5
const sql = new QueryBuilder()
  .table('myTable')
  .columns(['col1', 'col2', 'col3'])
  .conditions({
    AND: [
      { EQ: { col1: 'val1' } },
      { GT: { col2: 'val2' } },
      { LT: { col3: 'val3' } },
      { GTE: { col4: 'val4' } }
    ],
    OR: [
      { LTE: { col5: 'val5' } },
      { NEQ: { col6: 'val6' } },
      { IS: { col7: 'val7' } },
      { ISNOT: { col8: 'val8' } }
    ]
  })
  .limit(5)
  .build(SQL.COMMAND.SELECT)

//Insert
//Output: INSERT INTO myTable (col1,col2,col3) VALUES ('val1','val2','val3')
const sql = new QueryBuilder()
  .table('myTable')
  .sets({
    col1: 'val1',
    col2: 'val2',
    col3: 'val3'
  })
  .build(SQL.COMMAND.INSERT)

//Update
//Output: UPDATE myTable SET col1='val1',col2='val2',col3='val3' WHERE (col4 = 'val4')
const sql = new QueryBuilder()
  .table('myTable')
  .sets({
    col1: 'val1',
    col2: 'val2',
    col3: 'val3'
  })
  .conditions({
    AND: [{ EQ: { col4: 'val4' } }]
  })
  .build(SQL.COMMAND.UPDATE)

//DELETE
//Output: DELETE FROM myTable WHERE (col1 = 'val1')
const sql = new QueryBuilder()
  .table('myTable')
  .conditions({
    AND: [{ EQ: { col1: 'val1' } }]
  })
  .build(SQL.COMMAND.DELETE)
```

### DBWrap

- Init connection pool and hold database instance

#### Constructors

- database
- opts
- adapter ( default: mysql )

### Methods

- .pool()
- .connection()
- .execute()

#### Examples

```js
import { DBWrap, QueryBuilder, SQL } from 'sqlion'

const database = process.env.database

const opts = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password
}

// init connection pool
const db = new DBWrap(database, opts)

const demo = async () => {
  try {
    // construct sql statement by QueryBuilder
    const sql = new QueryBuilder()
      .table('myTable')
      .columns(['col1', 'col2', 'col3'])
      .build(SQL.COMMAND.SELECT)

    // do query
    const result = await db.execute(sql)

    return result
  } catch (error) {
    throw error
  }
}
```

### DBTransactionDecorator

- Introduce transaction in DBWrap

#### Constructors

- dbWrap

#### Methods

- .beginTransaction()
- .execute()
- .commit()
- .rollback()
- .release()

```js
import { DBWrap, DBTransactionDecorator, QueryBuilder, SQL } from 'sqlion'

const database = process.env.database

const opts = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password
}

// init connection pool
const db = new DBWrap(database, opts)

// create DBTransactionDecorator instance by passing DBWrap instance as argument
const trx = new DBTransactionDecorator(db)
await trx.beginTransaction()

const demo = async () => {
  try {
    // construct sql statement by QueryBuilder
    const sql = new QueryBuilder()
      .table('myTable')
      .columns(['col1', 'col2', 'col3'])
      .build(SQL.COMMAND.SELECT)

    // do query
    const result = await trx.execute(sql)

    await trx.commit()

    return result
  } catch (error) {
    await trx.rollback()
    throw error
  } finally {
    await trx.release()
  }
}
```
