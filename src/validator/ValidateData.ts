import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

// Clase base para validación
export class ValidateData {
  // Método para validar un objeto de tipo T
  async init<T extends object>(object: T, model: new () => T): Promise<ValidationError[]> {
    // Convertir el objeto a una instancia del modelo
    const dataInstance = plainToInstance(model, object);
    // Realizar la validación
    return validate(dataInstance);
  }
}
