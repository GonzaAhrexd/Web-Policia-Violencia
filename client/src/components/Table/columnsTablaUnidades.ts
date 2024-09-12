// Datos que se mostrarán en la tabla de denuncias
type Row = {
    _id: string;
    nombre: string;
    value: string;

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

export const columnsUnidades = [
    {
        // Número de expediente de la denuncia
        name: 'ID',
        selector: (row:Row) => row._id,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Número de expediente de la denuncia
        name: 'Nombre',
        selector: (row:Row) => row.nombre,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Fecha en la que se realizó la denuncia
        name: 'Valor',
        selector: (row:Row) => row.value,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
];