import { Client } from "https://deno.land/x/postgres@v0.8.0/mod.ts";
//config
import { DATABASE, PASSWORD, TABLE, USERNAME } from "./config.ts";

const client = await new Client({
  hostname: "127.0.0.1",
  port: 5432,
  database: "deno",
  user: "usr_todo",
  password: "password",
});

await client.connect();
console.log("Postgresql conect...");

const run = async () => {
  try {
    // create database (if not created before)
    //await client.queryArray(`CREATE DATABASE ${DATABASE}`);
    //await client.queryObject(`CREATE USER ${USERNAME} WITH PASSWORD '${PASSWORD}';`)
    //await client.queryObject(`GRANT ALL PRIVILEGES ON DATABASE "${DATABASE}" TO ${USERNAME}`)

    // delete table if it exists before
    await client.queryObject(`DROP TABLE IF EXISTS ${TABLE.TODO}`);

    // create table
    await client.queryObject(
      `CREATE TABLE ${TABLE.TODO} (id serial PRIMARY KEY, todo VARCHAR (255) NOT NULL, isCompleted BOOLEAN NOT NULL DEFAULT FALSE);`,
    );

    // add new default item
  } catch (error) {
    console.error(error);
  }
};

run();

export default client;
