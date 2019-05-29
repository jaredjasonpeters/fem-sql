import { getDb } from '../db/utils';
import { sql } from '../sql-string';

/**
 * Columns to select in the `getAllSuppliers` query
 */
const ALL_SUPPLIERS_COLUMNS = ['Id', 'ContactName', 'CompanyName'];

/**
 * Retrieve a collection of all Supplier records from the database
 * @return {Promise<Supplier[]>}
 */
export async function getAllSuppliers() {
  const db = await getDb();
  let productList = sql`string_agg(p.productname, ', ')`;
  return await db.all(sql`
SELECT ${ALL_SUPPLIERS_COLUMNS.map(x => `s.${x}`).join(',')}, 
${productList ? `${productList}` : ''} AS productlist
FROM Supplier as s
LEFT JOIN Product as p
ON s.id = p.supplierid
GROUP BY s.id
`);
}

/**
 * Retrieve an individual Supplier record from the database, by id
 * @param {string|number} id Supplier id
 * @return {Promise<Supplier>} the supplier
 */
export async function getSupplier(id) {
  const db = await getDb();
  return await db.get(
    sql`
SELECT *
FROM Supplier
WHERE id = $1`,
    id
  );
}
