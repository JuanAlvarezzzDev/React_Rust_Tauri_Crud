import React from "react";

interface ValidationErrorsProps {
  errors: { constraints?: Record<string, string> }[];
}

export const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors }) => (
  <div>
    <h4>Errores de Validación:</h4>
    {errors.map((error, index) => (
      <div key={index}>
        {error.constraints ? Object.values(error.constraints).join(", ") : ""}
      </div>
    ))}
  </div>
);
