export default () => ({
    database: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        synchronize: process.env.DATABASE_SYNCHRONIZE
    }
})