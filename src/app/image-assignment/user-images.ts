import { DBUser } from "../list-users/db-users";
import { Image } from "./image";

export interface UserImages {
    userList: DBUser [],
    imageList: Image []
}