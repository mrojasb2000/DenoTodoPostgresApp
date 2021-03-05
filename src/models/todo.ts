import client from "../db/client.ts";
// config
import { TABLE } from "../db/config.ts";
// interface
import Todo from "../interfaces/Todo.ts";

export default {
  /**
     * Takes in the id params & checks if the todo item exists
     * in the database
     * @param id
     * @returns boolean to tell if an entry of todo exists in table
     */
  doesExistById: async ({ id }: Todo) => {
   const result = await client.queryObject<{id: number, count: number}>(
      `SELECT COUNT(*) FROM ${TABLE.TODO} WHERE id = ${id}`
   )
   console.log(Number(result.rows[0].count))
   return result.rows.length > 0 && result.rows[0].count 
  }, 
  /**
     * Will return all the entries in the todo column
     * @returns array of todos
     */
  getAll: async () => {
      const {rows} = await client.queryObject(`SELECT * FROM ${TABLE.TODO}`)
      return rows
  },
  /**
     * Takes in the id params & returns the todo item found
     * againt it.
     * @param id
     * @returns object of todo item
     */
   getById: async ({ id }: Todo) => {
     const {rows} = await client.queryObject<{id: number}>(
        `SELECT * FROM ${TABLE.TODO} WHERE id = ${id}`
     )
     return rows
   }, 
  /**
     * Adds a new todo item to todo table
     * @param todo
     * @param isCompleted
     */
   add: async ({ todo, isCompleted }: Todo) => {
      const result = await client.queryObject(
        `INSERT INTO ${TABLE.TODO} (todo, isCompleted) VALUES($1, $2)`,
        todo,
        isCompleted
     )
  },  
  /**
     * Updates the content of a single todo item
     * @param id
     * @param todo
     * @param isCompleted
     * @returns integer (count of effect rows)
     */
  /* updateById: async ({ id, todo, isCompleted }: Todo) => {
     const result = await client.queryObject(
        `UPDATE ${TABLE.TODO} SEt todo = ?, isCompleted = ? WHERE id = ?`,
        [
           todo,
           isCompleted,
           id,
        ],
     )
     // return count of rows updated
     return result.rows.length
  }, */
  /**
     * Deletes a todo by ID
     * @param id
     * @returns integer (count of effect rows)
     */
 /*  deleteById: async ({ id }: Todo) => {
     const result = await client.queryObject(
        `DELETE FROM ${TABLE.TODO} WHERE id = ?`,
        [id],
     )
     // return count of rows affected
     return result.rows.length
  }, */
};
