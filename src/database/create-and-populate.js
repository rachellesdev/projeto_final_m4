import sqlite3 from 'sqlite3'
sqlite3.verbose()
import { dirname } from'path'
import { fileURLToPath } from 'url'
const filePath = dirname(fileURLToPath(import.meta.url)) + '/database.db'
const db = new sqlite3.Database(filePath);

const RESTAURANTE_SCHEMA = `
CREATE TABLE IF NOT EXISTS "RESTAURANTE" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "cardapio" varchar(64),
    "bebida" varchar(64),
    "cliente" varchar(64)
  );`;

const ADD_RESTAURANTE_DATA = `
INSERT INTO RESTAURANTE (id, cardapio, bebida, cliente)
VALUES 
    (1, 'strogonoff de carne', 'suco de laranja', 'Luana da Silva'),
    (2, 'bife a parmegiana', 'coca-cola', 'Juma'),
    (3, 'feijoada', 'água', 'Demi Lovato')
`

function criaTabelaRestaurante() {
    db.run(RESTAURANTE_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de restaurante");
    })
}


function populaTabelaRestaurante() {
    db.run(ADD_RESTAURANTE_DATA, (error)=> {
       if (error) console.log("Erro ao popular tabela de restaurante");
    })
}

db.serialize( ()=> {
    criaTabelaRestaurante();
    populaTabelaRestaurante();
})