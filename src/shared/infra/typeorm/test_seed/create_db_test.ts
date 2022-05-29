import { createConnection } from "typeorm";

async function create() {
    const connection = await createConnection();
    
    await connection.query('DROP DATABASE IF EXISTS interview_test;');
    await connection.query('CREATE DATABASE interview_test;');

    await connection.close();
}

create().then(() => console.log("Database interview_test created!"));
