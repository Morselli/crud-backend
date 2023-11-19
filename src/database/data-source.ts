import 'reflect-metadata'
import { DataSource } from "typeorm";
import { DB_CONFIG } from '../helpers/constants';
import { User } from "./entities/User";
import { UsersTable1666457593444 } from "./migration/1666457593444-UsersTable";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: DB_CONFIG.port,
    username: DB_CONFIG.username,
    password: DB_CONFIG.password,
    database: DB_CONFIG.database,
    logging: true,
    synchronize: true,
    entities: [User],
    migrations: [UsersTable1666457593444],
})

