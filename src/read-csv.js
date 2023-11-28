import { parse } from 'csv'
import fs from 'fs/promises'
import { Database } from './database.js';


const database = new Database()

async function writeRow(row) {
    console.log(row)
    await database.insert('tasks', { task: row[0], description: row[1] })
}


export function ReadCsv() {
    const parser = parse({
        delimiter: ':'
    });

    fs.readFile('./src/read.csv', 'utf8').then(data => {
        const teste = data.split('\r\n')
        const str = teste.map(row => row.split(','))

        str.map((row) => {
            if (!row.includes('task')) {
                writeRow(row)
            }
        })
    }).catch(() => console.log('erro'))

}