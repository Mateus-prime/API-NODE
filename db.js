import 'dotenv/config'
//aqui ele faz o arquivo . env vai ler todas as variaveis doambiente
import postgres from "postgres"

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=`;

export const sql = postgres(URL, {ssl: 'require' });


console.log(URL);