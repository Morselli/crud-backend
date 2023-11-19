import { AppDataSource } from "../../../database/data-source";
import { User} from "../../../database/entities/User";

export const UserRepository = AppDataSource.getRepository(User)

