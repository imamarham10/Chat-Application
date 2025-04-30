import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const config = {
    PORT: process.env.PORT || 3000,
}

export default config;