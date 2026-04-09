require('dotenv').config();

const config = {
    POSTGRES_URL: process.env.POSTGRES_URL,
    JWT_SECRET: process.env.JWT_SECRET,
}

export default config;