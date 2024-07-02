// Datos que se mostrarán en la tabla de denuncias
type Row = {
    numero_de_expediente: string;
    fecha: string;
    estado: string;
    createdAt: string;
    nombre_victima: string;
    DNI_victima: string;
    direccion_victima: string;
    telefono_victima: string;
    ocupacion_victima: string;
}

/* 
--------------------------------------------------------------------------------------------------------
    CAMPOS
    name: Nombre de la columna
    selector: Campo que se mostrará en la columna, debe ir en el formato (row:Row) => row.nombre_campo
    sortable: Si se puede ordenar la columna
    style: Estilos de la columna
----------------------------------------------------------------------------------------------------------
*/

export const columns = [
    {
        // Número de expediente de la denuncia
        name: 'Número de Expediente',
        selector: (row:Row) => row.numero_de_expediente,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Fecha en la que se cargó la denuncia, puede diferir de la fecha de la denuncia
        name: 'Fecha carga',
        selector: (row:Row) => row.createdAt,
        sortable: true,
        format: (row:Row) => `${new Date(row.createdAt).getUTCDate().toString().padStart(2, '0')}/${(new Date(row.createdAt).getUTCMonth() + 1).toString().padStart(2, '0')}/${new Date(row.createdAt).getUTCFullYear()}`,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Nombre de la víctima
        name: 'Estado',
        selector: (row:Row) => row.estado,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Nombre de la víctima
        name: 'Víctima',
        selector: (row:Row) => row.nombre_victima,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Municipio dónde sucedió el hecho
        name: 'DNI',
        selector: (row:Row) => row.DNI_victima,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Dirección dónde sucedió el hecho
        name: 'Dirección',
        selector: (row:Row) => row.direccion_victima,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Jurisdicción policial a la que pertenece la denuncia
        name: 'Teléfono víctima',
        selector: (row:Row) => row.telefono_victima,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Tipo de violencia
        name: 'Ocupación víctima',
        selector: (row:Row) => row.ocupacion_victima,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    
];