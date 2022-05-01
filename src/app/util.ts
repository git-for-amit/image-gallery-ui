import { environment } from "src/environments/environment"
export class Util {
    public static baseUrl: string = `http://${environment.host}:${environment.port}/`
}