import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'
import usuarios from '../models/usuarios'

// Valida los datos ingresados al registrar un usuario
export const registerSchema = z.object({
    // Define a nombre como un string requerido con un máximo de 64 caracteres
    nombre: z.string({
        required_error: 'El nombre es requerido',
    }).min(0).max(64),
    // Define a apellido como un string requerido con un máximo de 64 caracteres
    apellido: z.string({
        required_error: 'El apellido es requerido',
    }).min(0).max(64),
    // Define al nombre de usuario como un string requerido con un máximo de 255 caracteres
    nombre_de_usuario: z.string({
        required_error: 'El nombre de usuario es requerido',
    }).min(3).max(255),
    // Define a la contraseña como un string requerido con un mínimo de 6 caracteres y un máximo de 64
    pass: z.string({
        required_error: 'La contraseña es requerida',
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres',
    }).max(64),
    // Define al teléfono como un string requerido con un mínimo de 10 caracteres
    telefono: z.string({
        required_error: 'El teléfono es requerido',
    }).min(10, {
        message: 'Los números de teléfono deben tener 10 caracteres',
    }).max(10),
    // Define al correo como un string requerido con un máximo de 255 caracteres
    credencial: z.string({
        required_error: 'La credencial es requerida',
    }).min(0).max(64),
    // Define la unidad como un string requerido con un máximo de 64 caracteres
    unidad: z.string({
        required_error: 'La unidad es requerida',
    }).min(0).max(64),
    // Define la jerarquía como un string requerido con un máximo de 64 caracteres
    jerarquia: z.string({
        required_error: 'La jerarquía es requerida',
    }).min(0).max(64),
    // Define la plaza como un string requerido con un máximo de 64 caracteres
    plaza: z.string({
        required_error: 'La plaza es requerida',
    }).min(0).max(64),
    // Define la zona como un string requerido con un máximo de 64 caracteres
    zona: z.string({
        required_error: 'La zona es requerida',
    }).min(0).max(64),
})

// Valida los datos ingresados al iniciar sesión
export const loginSchema = z.object({
    // Define al nombre de usuario como un string requerido
    nombre_de_usuario: z.string({
        required_error: 'El nombre de usuario es requerido',
    }),
    // Define a la contraseña como un string requerido
    pass: z.string({
        required_error: 'La contraseña es requerida',
    }),
})

