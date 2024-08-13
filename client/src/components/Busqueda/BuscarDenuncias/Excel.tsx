// Importamos de la librería xlsx
import { utils, writeFile } from 'xlsx';
import XLSX from 'xlsx';

// Obtenemos la víctima, victimario y tercero desde el Backend
import { getVictima, getVictimario, getTercero } from '../../../api/crud';
// Icono de tabla
import { TableCellsIcon } from '@heroicons/react/24/outline'
interface denuncia {
  denunciasAMostrar: any
}

function Excel({ denunciasAMostrar }: denuncia) {

  type DenunciasExcel = {
    id: string,
    fecha: string,
    mes: string,
    año: string,
    GIS: string,
    barrio: string,
    tipo_de_lugar: string,
    unidad_de_carga: string,
    municipio: string,
    jurisdiccion: string,
    cuadricula: string,
    isDivision: string,
    numero_de_expediente: string,
    is_expediente_completo: string,
    juzgado_interviniente: string,
    dependencia_derivada: string,
    violencia: string,
    modalidades: string,
    violencia_fisica: string,
    violencia_psicologica: string,
    violencia_sexual: string,
    violencia_economica_y_patrimonial: string,
    violencia_simbolica: string,
    violencia_politica: string,
    empleo_de_armas: string,
    arma_empleada: string,
    direccion: string,
    prohibicion_de_acercamiento: string,
    restitución_de_menor: string,
    exclusión_hogar: string,
    alimento_provisorio: string,
    derecho_comunicación: string,
    boton_antipanico: string,
    prohibicion_de_acercamiento_dispuesta: string,
    boton_antipanico_dispuesto: string,
    exclusion_de_hogar_dispuesta: string,
    solicitud_de_aprehension: string,
    expedientes_con_cautelar: string,
    ninguna: string,
    denunciado_por_terceros: string,
    observaciones: string,
    nombre_victima: string,
    apellido_victima: string,
    edad_victima: string,
    dni_victima: string,
    estado_civil_victima: string,
    ocupacion_victima: string,
    vinculo_con_agresor_victima: string,
    condicion_de_vulnerabilidad_victima: string,
    embarazo_victima: string,
    periodo_post_parto_victima: string,
    periodo_de_lactancia_victima: string,
    discapacidad_victima: string,
    enfermedad_cronica_victima: string,
    adulto_mayor_victima: string,
    menor_de_edad_victima: string,
    tratamiento_psicologico_victima: string,
    convivencia_victima: string,
    cantidad_de_denuncias_realizadas_por_la_victima: string,
    tiene_hijos: string,
    dependencia_economica: string,
    mayores_de_edad: string,
    menores_de_edad: string,
    menores_discapacitados: string,
    hijos_con_el_agresor: string,
    nombre_victimario: string,
    apellido_victimario: string,
    edad_victimario: string,
    dni_victimario: string,
    estado_civil_victimario: string,
    ocupacion_victimario: string,
    abuso_de_alcohol_victimario: string,
    antecedentes_toxicologicos_victimario: string,
    antecedentes_penales_victimario: string,
    antecedentes_contravencionales_victimario: string,
    entrenamiento_en_combate_victimario: string,
    cantidad_de_denuncias_realizadas_contra_el_victimario: string,
    tercero_nombre: string,
    tercero_apellido: string,
    tercero_dni: string,
    tercero_vinculo_con_victima: string,

  }
  let denuncias: Array<DenunciasExcel> = []
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // Haz un map que llene un arreglo con los datos de las denuncias
  denunciasAMostrar.map(async (denuncia: DenunciasExcel | any) => {
    // Obten victimas y victimarios con las llamadas al api, guardalos en una variable victima y victimario los datos
    const victima = await getVictima(denuncia.victima_ID);
    const victimario = await getVictimario(denuncia.victimario_ID);
    let tercero; 
    if(denuncia.denunciado_por_tercero){
      tercero = await getTercero(denuncia.tercero_ID);
      }
    // Pasarle los datos al array de denuncias para que luego pueda ser mostrado en el Excel
    denuncias.push({
      // A1
      id: denuncia?._id,
      // B1
      fecha: `${new Date(denuncia.fecha).getUTCDate().toString().padStart(2, '0')}/${(new Date(denuncia.fecha).getUTCMonth() + 1).toString().padStart(2, '0')}/${new Date(denuncia.fecha).getUTCFullYear()}`,
      // C1
      mes: meses[new Date(denuncia?.fecha).getMonth()],
      // D1
      año: new Date(denuncia?.fecha).getFullYear().toString(),
      // E1
      direccion: denuncia?.direccion,
      // F1
      GIS: denuncia?.GIS,
      // G1
      barrio: denuncia?.barrio,
      // H1
      tipo_de_lugar: denuncia?.tipo_de_lugar,
      // I1
      unidad_de_carga: denuncia?.unidad_de_carga,
      // J1
      municipio: denuncia?.municipio,
      // K1
      jurisdiccion: denuncia?.jurisdiccion_policial,
      // L1
      cuadricula: denuncia?.cuadricula,
      // M1
      isDivision: denuncia?.isDivision ? 'Sí' : 'No',
      // N1
      numero_de_expediente: denuncia?.numero_de_expediente,
      // O1
      is_expediente_completo: denuncia?.is_expediente_completo ? 'Sí' : 'No',
      // P1
      juzgado_interviniente: denuncia?.juzgado_interviniente + " " + denuncia?.juzgado_interviniente_numero,
      // Q1
      dependencia_derivada: denuncia?.dependencia_derivada,
      // R1
      violencia: denuncia?.violencia,
      // S1
      modalidades: denuncia?.modalidades,
      // T1
      violencia_fisica: denuncia?.tipo_de_violencia.Fisica ? "Sí" : "No",
      // U1
      violencia_psicologica: denuncia?.tipo_de_violencia.Psicologica ? "Sí" : "No",
      // V1
      violencia_sexual: denuncia?.tipo_de_violencia.Sexual ? "Sí" : "No",
      // W1
      violencia_economica_y_patrimonial: denuncia?.tipo_de_violencia.Economica_y_patrimonial ? "Sí" : "No",
      // X1
      violencia_simbolica: denuncia?.tipo_de_violencia.Simbolica ? "Sí" : "No",
      // Y1
      violencia_politica: denuncia?.tipo_de_violencia.Politica ? "Sí" : "No",
      // Z1
      empleo_de_armas: denuncia?.empleo_de_armas ? "Sí" : "No",
      // AA1
      arma_empleada: denuncia?.arma_empleada,
      // AB1
      prohibicion_de_acercamiento: denuncia?.medida.prohibicion_de_acercamiento ? "Sí" : "No",
      // AC1
      boton_antipanico: denuncia?.medida.boton_antipanico ? "Sí" : "No",
      // AD1
      restitución_de_menor: denuncia?.medida.restitucion_de_menor ? "Sí" : "No",
      // AE1
      exclusión_hogar: denuncia?.medida.exclusion_de_hogar ? "Sí" : "No",
      // AF1
      alimento_provisorio: denuncia?.medida.alimento_provisorio ? "Sí" : "No",
      // AG1
      derecho_comunicación: denuncia?.medida.derecho_comunicacion ? "Sí" : "No",
      // AH1
      prohibicion_de_acercamiento_dispuesta: denuncia?.medida_dispuesta.prohibicion_de_acercamiento ? "Sí" : "No",
      // AI1
      exclusion_de_hogar_dispuesta: denuncia?.medida_dispuesta.exclusion_de_hogar ? "Sí" : "No",
      // AJ1
      boton_antipanico_dispuesto: denuncia?.medida_dispuesta.boton_antipanico ? "Sí" : "No",
      // AK1
      solicitud_de_aprehension: denuncia?.solicitud_de_aprehension ? "Sí" : "No",
      // AL1
      expedientes_con_cautelar: denuncia?.expedientes_con_cautelar ? "Sí" : "No",
      // AM1
      ninguna: denuncia?.ninguna ? "Sí" : "No",
      denunciado_por_terceros: denuncia?.denunciado_por_tercero ? "Sí" : "No",
      // AN1
      observaciones: denuncia?.observaciones,
      // AO1
      nombre_victima: victima?.nombre,
      // AP1
      apellido_victima: victima?.apellido,
      // AQ1
      edad_victima: victima?.edad,
      // AR1
      dni_victima: victima?.DNI,
      // AS1
      estado_civil_victima: victima?.estado_civil,
      // AT1
      ocupacion_victima: victima?.ocupacion,
      // AU1
      vinculo_con_agresor_victima: denuncia?.relacion_victima_victimario,
      // AV1
      condicion_de_vulnerabilidad_victima: victima?.condicion_de_vulnerabilidad ? "Sí" : "No",
      // AW1
      embarazo_victima: victima?.condiciones_de_vulnerabilidad.embarazo ? "Sí" : "No",
      // AX1
      periodo_post_parto_victima: victima?.condiciones_de_vulnerabilidad.post_parto ? "Sí" : "No",
      // AY1
      periodo_de_lactancia_victima: victima?.condiciones_de_vulnerabilidad.lactancia ? "Sí" : "No",
      // AZ1
      discapacidad_victima: victima?.condiciones_de_vulnerabilidad.discapacidad ? "Sí" : "No",
      // BA1
      enfermedad_cronica_victima: victima?.condiciones_de_vulnerabilidad.enfermedad_cronica ? "Sí" : "No",
      // BB1
      adulto_mayor_victima: victima?.condiciones_de_vulnerabilidad.adulto_mayor ? "Sí" : "No",
      // BC1
      menor_de_edad_victima: victima?.condiciones_de_vulnerabilidad.menor_de_edad ? "Sí" : "No",
      // BD1
      tratamiento_psicologico_victima: victima?.condiciones_de_vulnerabilidad.tratamiento_psicologico ? "Sí" : "No",
      // BE1
      convivencia_victima: victima?.convivencia ? "Sí" : "No",
      // BF1
      cantidad_de_denuncias_realizadas_por_la_victima: victima?.denuncias_realizadas?.length,
      // BG1
      tiene_hijos: victima?.hijos.tiene_hijos ? "Sí" : "No",
      // BH1
      dependencia_economica: victima?.hijos.dependencia_economica ? "Sí" : "No",
      // BI1
      mayores_de_edad: victima?.hijos.mayores_de_edad ? "Sí" : "No",
      // BJ1
      menores_de_edad: victima?.hijos.menores_de_edad ? "Sí" : "No",
      // BK1
      menores_discapacitados: victima?.hijos.menores_discapacitados ? "Sí" : "No",
      // BL1
      hijos_con_el_agresor: denuncia?.hijos_victima_con_victimario,
      // BM1
      nombre_victimario: victimario?.nombre,
      // BN1
      apellido_victimario: victimario?.apellido,
      // BO1
      edad_victimario: victimario?.edad,
      // BP1
      dni_victimario: victimario?.DNI,
      // BQ1
      estado_civil_victimario: victimario?.estado_civil,
      // BR1
      ocupacion_victimario: victimario?.ocupacion,
      // BS1
      abuso_de_alcohol_victimario: victimario?.abuso_de_alcohol ? "Sí" : "No",
      // BT1
      antecedentes_toxicologicos_victimario: victimario?.antecedentes_toxicologicos ? "Sí" : "No",
      // BU1
      antecedentes_penales_victimario: victimario?.antecedentes_penales ? "Sí" : "No",
      // BV1
      antecedentes_contravencionales_victimario: victimario?.antecedentes_contravencionales ? "Sí" : "No",
      // BW1
      entrenamiento_en_combate_victimario: victimario?.entrenamiento_en_combate ? "Sí" : "No",
      // BX1
      cantidad_de_denuncias_realizadas_contra_el_victimario: victimario?.denuncias_en_contra?.length,
      // BY1
      tercero_nombre: tercero?.nombre ? tercero?.nombre : 'No hay tercero',
      // BZ1
      tercero_apellido: tercero?.apellido ? tercero?.apellido : 'No hay tercero',
      // CA1
      tercero_dni: tercero?.DNI ? tercero?.DNI : 'No hay tercero',
      // CB1
      tercero_vinculo_con_victima: denuncia?.vinculo_con_la_victima_tercero ? denuncia?.vinculo_con_la_victima_tercero : 'No hay tercero',
    });
  });

  const exportarDenuncias = () => {
    // Crear una hoja de cálculo a partir de los datos de las denuncias
    const hoja = XLSX.utils.json_to_sheet(denuncias);

    // Modificar celdas para que se vean mejor al visualizar los datos
    hoja['!cols'] = [
      { wch: 26 }, //id A1
      { wch: 10 }, // Fecha B1
      { wch: 6 },  // Mes C1
      { wch: 6 },  // Año D1
      { wch: 20 }, // Dirección E1
      { wch: 24 }, // GIS F1
      { wch: 12 }, // Barrio G1
      { wch: 18 }, // Unidad de carga H1
      { wch: 13 }, // Municipio I1
      { wch: 28 }, // Jurisdicción policial J1
      { wch: 14 }, // Cuadrícula K1
      { wch: 22 }, // Cargado en la división L1 
      { wch: 22 }, // Número de expediente M1
      { wch: 18 }, // Expediente completo N1
      { wch: 20 }, // Juzgado interviniente O1
      { wch: 18 }, // Dependencia derivada P1
      { wch: 20 }, // Violencia Q1
      { wch: 26 }, // Modalidades R1
      { wch: 13 }, // Violencia física S1
      { wch: 18 }, // Violencia psicológica T1
      { wch: 14 }, // Violencia sexual U1
      { wch: 30 }, // Violencia económica y patrimonial V1
      { wch: 17 }, // Violencia simbólica W1
      { wch: 14 }, // Violencia política X1
      { wch: 15 }, // Empleo de armas Y1
      { wch: 20 }, // Arma empleada Z1
      { wch: 26 }, // Prohibición de acercamiento AA1
      { wch: 22 }, // Restitución de menor AB1
      { wch: 20 }, // Exclusión del hogar AC1
      { wch: 18 }, // Alimento provisorio AD1
      { wch: 24 }, // Derecho a la comunicación AE1
      { wch: 16 }, // Botón antipánico AF1
      { wch: 34 }, // Prohibición de acercamiento dispuesta AG1
      { wch: 26 }, // Exclusión del hogar dispuesta AH1
      { wch: 26 }, // Botón antipánico dispuesto AI1
      { wch: 20 }, // Denunciado por terceros AJ1
      { wch: 40 }, // Observaciones AK1
      { wch: 20 }, // Nombre de la víctima AL1
      { wch: 20 }, // Apellido de la víctima AM1
      { wch: 20 }, // Edad de la víctima AN1
      { wch: 18 }, // DNI de la víctima AO1
      { wch: 24 }, // Estado civil de la víctima AP1
      { wch: 22 }, // Ocupación de la víctima AQ1
      { wch: 32 }, // Vínculo con el agresor de la víctima AR1
      { wch: 24 }, // Condición de vulnerabilidad de la víctima AS1
      { wch: 16 }, // Embarazo de la víctima AT1
      { wch: 24 }, // Post parto de la víctima AU1
      { wch: 24 }, // Lactancia de la víctima AV1
      { wch: 24 }, // Discapacidad de la víctima AW1
      { wch: 24 }, // Enfermedad crónica de la víctima AX1
      { wch: 20 }, // Adulto mayor de la víctima AY1
      { wch: 20 }, // Menor de edad de la víctima AZ1
      { wch: 30 }, // Tratamiento psicológico de la víctima BA1
      { wch: 22 }, // Convivencia de la víctima BB1
      { wch: 24 }, // Cantidad de denuncias previas BC1
      { wch: 12 }, // Tiene hijos BD1
      { wch: 20 }, // Dependencia económica BE1
      { wch: 17 }, // Mayores de edad BF1
      { wch: 20 }, // Menores de edad BG1
      { wch: 20 }, // Menores discapacitados BH1 
      { wch: 16 }, // Hijos con el agresor BI1
      { wch: 18 }, // Nombre del victimario BJ1
      { wch: 22 }, // Apellido del victimario BK1
      { wch: 20 }, // Edad del victimario BL1
      { wch: 28 }, // DNI del victimario BM1
      { wch: 30 }, // Estado civil del victimario BN1
      { wch: 28 }, // Ocupación del victimario BO1
      { wch: 36 }, // Abuso de alcohol del victimario BP1
      { wch: 36 }, // Antecedentes toxicológicos del victimario BQ1
      { wch: 26 }, // Antecedentes penales del victimario BR1
      { wch: 30 }, // Antecedentes contravencionales del victimario BS1
      { wch: 26 }, // Entrenamiento en combate del victimario BT1
      { wch: 24 }, // Notificación del victimario BU1
      { wch: 16 }, // Denuncias previas en contra BV1 
      { wch: 24 }, // Nombre del tercero BW1
      { wch: 24 }, // Apellido del tercero BX1
      { wch: 24 }, // DNI del tercero BY1
      { wch: 30 }, // Vínculo con la víctima del tercero BZ1
    ];
    hoja['A1'] = { v: 'ID', t: 's' };
    hoja['B1'] = { v: 'Fecha', t: 's' };
    hoja['C1'] = { v: 'Mes', t: 's' };
    hoja['D1'] = { v: 'Año', t: 's' };
    hoja['E1'] = { v: 'Dirección', t: 's' };
    hoja['F1'] = { v: 'GIS', t: 's' };
    hoja['G1'] = { v: 'Barrio', t: 's' };
    hoja['H1'] = { v: 'Tipo de lugar', t: 's' };
    hoja['H1'] = { v: 'Unidad de carga', t: 's' };
    hoja['I1'] = { v: 'Municipio', t: 's' };
    hoja['J1'] = { v: 'Jurisdicción policial', t: 's' };
    hoja['K1'] = { v: 'Cuadrícula', t: 's' };
    hoja['L1'] = { v: 'Cargado en la  división', t: 's' };
    hoja['M1'] = { v: 'Número de expediente', t: 's' };
    hoja['N1'] = { v: 'Expediente completo', t: 's' };
    hoja['O1'] = { v: 'Juzgado interviniente', t: 's' };
    hoja['P1'] = { v: 'Dependencia derivada', t: 's' };
    hoja['Q1'] = { v: 'Violencia', t: 's' };
    hoja['R1'] = { v: 'Modalidades', t: 's' };
    hoja['S1'] = { v: 'Violencia física', t: 's' };
    hoja['T1'] = { v: 'Violencia psicológica', t: 's' };
    hoja['U1'] = { v: 'Violencia sexual', t: 's' };
    hoja['V1'] = { v: 'Violencia económica y patrimonial', t: 's' };
    hoja['W1'] = { v: 'Violencia simbólica', t: 's' };
    hoja['X1'] = { v: 'Violencia política', t: 's' };
    hoja['Y1'] = { v: 'Empleo de armas', t: 's' };
    hoja['Z1'] = { v: 'Arma empleada', t: 's' };
    hoja['AA1'] = { v: 'Prohibición de acercamiento', t: 's' };
    hoja['AB1'] = { v: 'Restitución de menor', t: 's' };
    hoja['AC1'] = { v: 'Exclusión del hogar', t: 's' };
    hoja['AD1'] = { v: 'Alimento provisorio', t: 's' };
    hoja['AE1'] = { v: 'Derecho a la comunicación', t: 's' };
    hoja['AF1'] = { v: 'Botón antipánico', t: 's' };
    hoja['AG1'] = {v: 'Prohibición de acercamiento dispuesta', t: 's'};
    hoja['AH1'] = {v: 'Botón antipánico dispuesto', t: 's'};
    hoja['AI1'] = {v: 'Exclusión del hogar dispuesta', t: 's'};
    hoja['AJ1'] = {v: 'Solicitud de Aprehensión', t: 's'};
    hoja['AK1'] = {v: 'Expedientes c/cautelar', t: 's'};
    hoja['AL1'] = { v: 'Ninguna', t: 's' };
    hoja['AM1'] = { v: 'Denunciado por terceros', t: 's' };
    hoja['AN1'] = { v: 'Observaciones', t: 's' };
    hoja['AO1'] = { v: 'Nombre de la víctima', t: 's' };
    hoja['AP1'] = { v: 'Apellido de la víctima', t: 's' };
    hoja['AQ1'] = { v: 'Edad de la víctima', t: 's' };
    hoja['AR1'] = { v: 'DNI de la víctima', t: 's' };
    hoja['AS1'] = { v: 'Estado civil de la víctima', t: 's' };
    hoja['AT1'] = { v: 'Ocupación de la víctima', t: 's' };
    hoja['AU1'] = { v: 'Vínculo con el agresor de la víctima', t: 's' };
    hoja['AV1'] = { v: 'Condición de vulnerabilidad de la víctima', t: 's' };
    hoja['AW1'] = { v: 'Embarazo', t: 's' };
    hoja['AX1'] = { v: 'Post parto', t: 's' };
    hoja['AY1'] = { v: 'Lactancia', t: 's' };
    hoja['AZ1'] = { v: 'Discapacidad', t: 's' };
    hoja['BA1'] = { v: 'Enfermedad crónica', t: 's' };
    hoja['BB1'] = { v: 'Adulto mayor', t: 's' };
    hoja['BC1'] = { v: 'Menor de edad', t: 's' };
    hoja['BD1'] = { v: 'Tratamiento psicológico', t: 's' };
    hoja['BE1'] = { v: 'Convivencia de la víctima', t: 's' };
    hoja['BF1'] = { v: 'Cantidad de denuncias previas', t: 's' };
    hoja['BG1'] = { v: 'Tiene hijos', t: 's' };
    hoja['BH1'] = { v: 'Dependencia económica', t: 's' };
    hoja['BI1'] = { v: 'Mayores de edad', t: 's' };
    hoja['BJ1'] = { v: 'Menores de edad', t: 's' };
    hoja['BK1'] = { v: 'Menores discapacitados', t: 's' };
    hoja['BL1'] = { v: 'Hijos con el agresor', t: 's' };
    hoja['BM1'] = { v: 'Nombre del victimario', t: 's' };
    hoja['BN1'] = { v: 'Apellido del victimario', t: 's' };
    hoja['BO1'] = { v: 'Edad del victimario', t: 's' };
    hoja['BP1'] = { v: 'DNI del victimario', t: 's' };
    hoja['BQ1'] = { v: 'Estado civil del victimario', t: 's' };
    hoja['BR1'] = { v: 'Ocupación del victimario', t: 's' };
    hoja['BS1'] = { v: 'Abuso de alcohol del victimario', t: 's' };
    hoja['BT1'] = { v: 'Antecedentes toxicológicos del victimario', t: 's' };
    hoja['BU1'] = { v: 'Antecedentes penales del victimario', t: 's' };
    hoja['BV1'] = { v: 'Antecedentes contravencionales del victimario', t: 's' };
    hoja['BW1'] = { v: 'Entrenamiento en combate del victimario', t: 's' };
    hoja['BX1'] = { v: 'Denuncias previas en contra', t: 's' };
    hoja['BY1'] = { v: 'Nombre del tercero', t: 's' };
    hoja['BZ1'] = { v: 'Apellido del tercero', t: 's' };
    hoja['CA1'] = { v: 'DNI del tercero', t: 's' };
    hoja['CB1'] = { v: 'Vínculo del tercero con la víctima', t: 's' };
    
    // Crear un libro de trabajo y agregar la hoja de cálculo
    const libro = utils.book_new();
    utils.book_append_sheet(libro, hoja, 'Denuncias');
    // Escribir el libro de trabajo a un archivo Excel
    writeFile(libro, 'denuncias.xlsx');
  };

  return (
    <button className="flex flex-row items-center justify-center bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10" onClick={exportarDenuncias}><TableCellsIcon className='h-6 w-6' /> Generar Excel</button>
  );
}

export default Excel;