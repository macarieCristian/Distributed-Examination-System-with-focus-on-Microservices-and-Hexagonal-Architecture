import {ExceptionCode} from "./enum/exception-code.enum";

export class ExceptionValueObject {
    constructor(public code: ExceptionCode, public message: string) {
    }
}
