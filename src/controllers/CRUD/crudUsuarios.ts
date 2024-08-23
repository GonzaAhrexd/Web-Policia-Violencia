import usuarios from '../../models/usuarios';

export const getUsuarios = async (req, res) => {
    try {
        const { nombre_de_usuario, nombre, apellido, rol} = req.params
        interface Query {
            nombre_de_usuario?: RegExp;
            nombre?: RegExp;
            apellido?: string;
            rol?: string;
        }
        const query: Query = {};

        function normalizarLetras(caracter:string) {
            if (caracter === 's' || caracter === 'z') return '[sz]';
            if (caracter === 'i' || caracter === 'y') return '[iy]';
            if ( caracter === 'k' || caracter === 'q') return '[kq]';
            if ( caracter === 'v' || caracter === 'b') return '[vb]';
            if ( caracter === 'g' || caracter === 'j') return '[gj]';
            if (caracter === 'á' || caracter === 'a') return '[áa]';
            if (caracter === 'é' || caracter === 'e') return '[ée]';
            if (caracter === 'í' || caracter === 'i') return '[íi]';
            if (caracter === 'ó' || caracter === 'o') return '[óo]';
            if (caracter === 'ú' || caracter === 'u') return '[úu]';
            if (caracter === 'ü') return '[üu]';
            return caracter;
        }
    
        function construirExpresionRegular(cadena) {
            if (cadena !== 'no_ingresado') {
                // Convertir la cadena a minúsculas
                const cadena_lower = cadena.toLowerCase();
                // Separar los nombres/apellidos y eliminar espacios en blanco adicionales
                const partes = cadena_lower.trim().split(/\s+/);
                // Crear la expresión regular
                const regexPattern = partes
                    .map(part => part.split('').map(normalizarLetras).join(''))
                    .join('.*');
                // Crear expresión regular para buscar todas las combinaciones de nombres/apellidos
                const regexCombinaciones = partes
                    .map(part => `(?=.*${part.split('').map(normalizarLetras).join('')})`)
                    .join('');
                console.log("Expresión regular de combinaciones:", regexCombinaciones);
                // Devolver la expresión regular
                return new RegExp(regexCombinaciones, 'i');
            } else {
                // Si no se ha ingresado el nombre/apellido, devolver null
                return null;
            }
        }        

        if (nombre_de_usuario !== 'no_ingresado') {
            // @ts-ignore
            query.nombre_de_usuario = new RegExp(construirExpresionRegular(nombre_de_usuario));
        }
        if (nombre !== 'no_ingresado') {
            // @ts-ignore
            query.nombre = new RegExp(construirExpresionRegular(nombre));
        }
        if (apellido !== 'no_ingresado') {
            // @ts-ignore
            query.apellido = new RegExp(construirExpresionRegular(apellido));
        }
        if (rol !== 'no_ingresado') {
            //Haz que se eliminen . si que se ingresan en el dni
            query.rol = rol;
        }
        // Obtener las denuncias
        try {
            const usuariosABuscar = await usuarios.find(query);
            res.json(usuariosABuscar);
        } catch (error) {
            // Error al obtener las denuncias
            res.status(500).json({ message: 'Hubo un error al obtener las víctimas.' });
        }


        // res.json(usuario)
    } catch (error) {
        console.log(error)
    }
}
