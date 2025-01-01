const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const seed = async () => {
    try {
        // Sample users
        await pool.query(`
            INSERT INTO users (name, role, doctor_number)
            VALUES
            ('Dr. Smith', 'Doctor', 'DOC123'),
            ('Nurse James', 'Nurse', NULL),
            ('Secretary Jane', 'Secretary', NULL);
        `);

        // Sample patients
        await pool.query(`
            INSERT INTO patients (name, doctor_id)
            VALUES
            ('John Doe', 1),
            ('Jane Roe', 1);
        `);

        // Sample tasks
        await pool.query(`
            INSERT INTO todos (title, description, deadline, assigned_to)
            VALUES
            ('Review patient file', 'Check John Doe\'s latest test results', '2025-01-10', '{1,2}');
        `);

        console.log("Database seeded successfully!");
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        pool.end();
    }
};

seed();

