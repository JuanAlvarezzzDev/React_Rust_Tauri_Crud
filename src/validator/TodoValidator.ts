import {IsEnum, IsString, Length } from "class-validator";
import { TodoStatus } from "../models/TodoStatus";
import { ValidateData } from "./ValidateData";

export class TodoValidator{
    @IsString({ message: "¡Ups! La descripción debe ser un texto." })
    @Length(10, 50, { message: "La descripción debe tener entre 10 y 50 caracteres. ¡No te olvides!" })
    description!: string;

    @IsEnum(TodoStatus, { message: "El estado debe ser 'Incomplete' o 'Complete'." })
    status!: TodoStatus;

    async init(object: object) {
        const validator = new ValidateData();
        return validator.init(object, TodoValidator);
      }
}

