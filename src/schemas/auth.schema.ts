import { z } from 'zod'

export const registerSchema = z.object({
    nombre: z.string({
        required_error: 'El nombre es requerido',
    }).min(0).max(64),
    apellido: z.string({
        required_error: 'El apellido es requerido',
    }).min(0).max(64),
    nombre_de_usuario: z.string({
        required_error: 'El nombre de usuario es requerido',
    }).min(3).max(255),
    pass: z.string({
        required_error: 'La contraseña es requerida',
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres',
    }).max(64),
    telefono: z.string({
        required_error: 'El teléfono es requerido',
    }).min(10, {
        message: 'Los números de teléfono deben tener 10 caracteres',
    }).max(10),
    credencial: z.string({
        required_error: 'La credencial es requerida',
    }).min(0).max(64),
    unidad: z.string({
        required_error: 'La unidad es requerida',
    }).min(0).max(64),
    jerarquia: z.string({
        required_error: 'La jerarquía es requerida',
    }).min(0).max(64),
    plaza: z.string({
        required_error: 'La plaza es requerida',
    }).min(0).max(64),
    zona: z.string({
        required_error: 'La zona es requerida',
    }).min(0).max(64),



})

export const loginSchema = z.object({
    nombre_de_usuario: z.string({
        required_error: 'El nombre de usuario es requerido',
    }),
    pass: z.string({
        required_error: 'La contraseña es requerida',
    }),
})