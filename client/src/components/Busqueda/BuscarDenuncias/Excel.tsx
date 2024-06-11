import React from 'react';
import { utils, writeFile } from 'xlsx';
import XLSX from 'xlsx';
import { useState } from 'react';

import { getVictima, getVictimario, getTercero } from '../../../api/crud';
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
    medida_solicitada_por_victima: string,
    medida_dispuesta_por_autoridad_judicial: string,
    direccion: string,
    prohibicion_de_acercamiento: string,
    restitución_de_menor: string,
    exclusión_hogar: string,
    alimento_provisorio: string,
    derecho_comunicación: string,
    boton_antipanico: string,
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
    notificacion_victimario: string,
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
      console.log("HERE")
      tercero = await getTercero(denuncia.tercero_ID);
      }

    denuncias.push({
      id: denuncia?._id,
      fecha: `${new Date(denuncia.fecha).getUTCDate().toString().padStart(2, '0')}/${(new Date(denuncia.fecha).getUTCMonth() + 1).toString().padStart(2, '0')}/${new Date(denuncia.fecha).getUTCFullYear()}`,
      mes: meses[new Date(denuncia?.fecha).getMonth()],
      año: new Date(denuncia?.fecha).getFullYear().toString(),
      direccion: denuncia?.direccion,
      GIS: denuncia?.GIS,
      barrio: denuncia?.barrio,
      unidad_de_carga: denuncia?.unidad_de_carga,
      municipio: denuncia?.municipio,
      jurisdiccion: denuncia?.jurisdiccion_policial,
      cuadricula: denuncia?.cuadricula,
      isDivision: denuncia?.isDivision ? 'Sí' : 'No',
      numero_de_expediente: denuncia?.numero_de_expediente,
      is_expediente_completo: denuncia?.is_expediente_completo ? 'Sí' : 'No',
      juzgado_interviniente: denuncia?.juzgado_interviniente,
      dependencia_derivada: denuncia?.dependencia_derivada,
      violencia: denuncia?.violencia,
      modalidades: denuncia?.modalidades,
      violencia_fisica: denuncia?.tipo_de_violencia.Fisica ? "Sí" : "No",
      violencia_psicologica: denuncia?.tipo_de_violencia.Psicologica ? "Sí" : "No",
      violencia_sexual: denuncia?.tipo_de_violencia.Sexual ? "Sí" : "No",
      violencia_economica_y_patrimonial: denuncia?.tipo_de_violencia.Economica_y_patrimonial ? "Sí" : "No",
      violencia_simbolica: denuncia?.tipo_de_violencia.Simbolica ? "Sí" : "No",
      violencia_politica: denuncia?.tipo_de_violencia.Politica ? "Sí" : "No",
      empleo_de_armas: denuncia?.empleo_de_armas ? "Sí" : "No",
      arma_empleada: denuncia?.arma_empleada,
      medida_solicitada_por_victima: denuncia?.medida_solicitada_por_victima ? "Sí" : "No",
      medida_dispuesta_por_autoridad_judicial: denuncia?.medida_dispuesta_por_autoridad_judicial ? "Sí" : "No",
      prohibicion_de_acercamiento: denuncia?.medida.prohibicion_de_acercamiento ? "Sí" : "No",
      restitución_de_menor: denuncia?.medida.restitucion_de_menor ? "Sí" : "No",
      exclusión_hogar: denuncia?.medida.exclusion_de_hogar ? "Sí" : "No",
      alimento_provisorio: denuncia?.medida.alimento_provisorio ? "Sí" : "No",
      derecho_comunicación: denuncia?.medida.derecho_comunicacion ? "Sí" : "No",
      boton_antipanico: denuncia?.medida.boton_antipanico ? "Sí" : "No",
      denunciado_por_terceros: denuncia?.denunciado_por_tercero ? "Sí" : "No",
      observaciones: denuncia?.observaciones,
      nombre_victima: victima?.nombre,
      apellido_victima: victima?.apellido,
      edad_victima: victima?.edad,
      dni_victima: victima?.DNI,
      estado_civil_victima: victima?.estado_civil,
      ocupacion_victima: victima?.ocupacion,
      vinculo_con_agresor_victima: victima?.vinculo_con_agresor,
      condicion_de_vulnerabilidad_victima: victima?.condicion_de_vulnerabilidad,
      convivencia_victima: victima?.convivencia ? "Sí" : "No",
      cantidad_de_denuncias_realizadas_por_la_victima: victima?.cantidad_de_denuncias_previas,
      tiene_hijos: victima?.hijos.tiene_hijos ? "Sí" : "No",
      dependencia_economica: victima?.hijos.dependencia_economica ? "Sí" : "No",
      mayores_de_edad: victima?.hijos.mayores_de_edad ? "Sí" : "No",
      menores_de_edad: victima?.hijos.menores_de_edad ? "Sí" : "No",
      menores_discapacitados: victima?.hijos.menores_discapacitados ? "Sí" : "No",
      hijos_con_el_agresor: victima?.hijos.hijos_con_el_agresor,
      nombre_victimario: victimario?.nombre,
      apellido_victimario: victimario?.apellido,
      edad_victimario: victimario?.edad,
      dni_victimario: victimario?.DNI,
      estado_civil_victimario: victimario?.estado_civil,
      ocupacion_victimario: victimario?.ocupacion,
      abuso_de_alcohol_victimario: victimario?.abuso_de_alcohol ? "Sí" : "No",
      antecedentes_toxicologicos_victimario: victimario?.antecedentes_toxicologicos ? "Sí" : "No",
      antecedentes_penales_victimario: victimario?.antecedentes_penales ? "Sí" : "No",
      antecedentes_contravencionales_victimario: victimario?.antecedentes_contravencionales ? "Sí" : "No",
      entrenamiento_en_combate_victimario: victimario?.entrenamiento_en_combate ? "Sí" : "No",
      notificacion_victimario: victimario?.notificacion,
      cantidad_de_denuncias_realizadas_contra_el_victimario: victimario?.cantidad_de_denuncias_previas,
      tercero_nombre: tercero?.nombre ? tercero?.nombre : 'No hay tercero',
      tercero_apellido: tercero?.apellido ? tercero?.apellido : 'No hay tercero',
      tercero_dni: tercero?.DNI ? tercero?.DNI : 'No hay tercero',
      tercero_vinculo_con_victima: tercero?.vinculo_con_victima ? tercero?.vinculo_con_victima : 'No hay tercero',
    
    });
  });



  const exportarDenuncias = () => {
    // Crear una hoja de cálculo a partir de los datos de las denuncias
    const hoja = XLSX.utils.json_to_sheet(denuncias);
    //   ID        Fecha        Mes        Año      Dirección    GIS         Barrio     Unidad     Municipio  Jurisd.   Cuadri     En div    Num exp    exp compl  juzg in    dep deriv 
    hoja['!cols'] = [{ wch: 26 }, { wch: 10 }, { wch: 6 }, { wch: 6 }, { wch: 20 }, { wch: 24 }, { wch: 12 }, { wch: 18 }, { wch: 13 }, { wch: 28 }, { wch: 14 }, { wch: 22 }, { wch: 22 }, { wch: 18 }, { wch: 20 }, { wch: 18 }, { wch: 20 }, { wch: 36 }, { wch: 13 }, { wch: 18 }, { wch: 14 }, { wch: 30 }, { wch: 17 }, { wch: 14 }, { wch: 15 }, { wch: 20 }, { wch: 28 }, { wch: 34 }, { wch: 24 }, { wch: 18 }, { wch: 17 }, { wch: 17 }, { wch: 23 }, { wch: 14 }, { wch: 20 }, { wch: 40 }, { wch: 20 }, { wch: 20 }, { wch: 16 }, { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 30 }, { wch: 35 }, { wch: 22 }, { wch: 25 }, { wch: 10 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 17 }, { wch: 20 }, { wch: 20 }, { wch: 16 }, { wch: 15 }, { wch: 22 }, { wch: 20 }, { wch: 26 }, { wch: 35 }, { wch: 30 }, { wch: 40 }, { wch: 35 }, { wch: 22 }, { wch: 25 }, {wch: 20}, {wch: 20}, {wch: 13}, {wch: 28}];
    hoja['A1'] = { v: 'ID', t: 's' };
    hoja['B1'] = { v: 'Fecha', t: 's' };
    hoja['C1'] = { v: 'Mes', t: 's' };
    hoja['D1'] = { v: 'Año', t: 's' };
    hoja['E1'] = { v: 'Dirección', t: 's' };
    hoja['F1'] = { v: 'GIS', t: 's' };
    hoja['G1'] = { v: 'Barrio', t: 's' };
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
    hoja['AA1'] = { v: 'Medida solicitada por la víctima', t: 's' };
    hoja['AB1'] = { v: 'Medida dispuesta por autoridad judicial', t: 's' };
    hoja['AC1'] = { v: 'Prohibición de acercamiento', t: 's' };
    hoja['AD1'] = { v: 'Restitución de menor', t: 's' };
    hoja['AE1'] = { v: 'Exclusión del hogar', t: 's' };
    hoja['AF1'] = { v: 'Alimento provisorio', t: 's' };
    hoja['AG1'] = { v: 'Derecho a la comunicación', t: 's' };
    hoja['AH1'] = { v: 'Botón antipánico', t: 's' };
    hoja['AI1'] = { v: 'Denunciado por terceros', t: 's' };
    hoja['AJ1'] = { v: 'Observaciones', t: 's' };
    hoja['AK1'] = { v: 'Nombre de la víctima', t: 's' };
    hoja['AL1'] = { v: 'Apellido de la víctima', t: 's' };
    hoja['AM1'] = { v: 'Edad de la víctima', t: 's' };
    hoja['AN1'] = { v: 'DNI de la víctima', t: 's' };
    hoja['AO1'] = { v: 'Estado civil de la víctima', t: 's' };
    hoja['AP1'] = { v: 'Ocupación de la víctima', t: 's' };
    hoja['AQ1'] = { v: 'Vínculo con el agresor de la víctima', t: 's' };
    hoja['AR1'] = { v: 'Condición de vulnerabilidad de la víctima', t: 's' };
    hoja['AS1'] = { v: 'Convivencia de la víctima', t: 's' };
    hoja['AT1'] = { v: 'Cantidad de denuncias previas', t: 's' };
    hoja['AU1'] = { v: 'Tiene hijos', t: 's' };
    hoja['AV1'] = { v: 'Dependencia económica', t: 's' };
    hoja['AW1'] = { v: 'Mayores de edad', t: 's' };
    hoja['AX1'] = { v: 'Menores de edad', t: 's' };
    hoja['AY1'] = { v: 'Menores discapacitados', t: 's' };
    hoja['AZ1'] = { v: 'Hijos con el agresor', t: 's' };
    hoja['BA1'] = { v: 'Nombre del victimario', t: 's' };
    hoja['BB1'] = { v: 'Apellido del victimario', t: 's' };
    hoja['BC1'] = { v: 'Edad del victimario', t: 's' };
    hoja['BD1'] = { v: 'DNI del victimario', t: 's' };
    hoja['BE1'] = { v: 'Estado civil del victimario', t: 's' };
    hoja['BF1'] = { v: 'Ocupación del victimario', t: 's' };
    hoja['BG1'] = { v: 'Abuso de alcohol del victimario', t: 's' };
    hoja['BH1'] = { v: 'Antecedentes toxicológicos del victimario', t: 's' };
    hoja['BI1'] = { v: 'Antecedentes penales del victimario', t: 's' };
    hoja['BJ1'] = { v: 'Antecedentes contravencionales del victimario', t: 's' };
    hoja['BK1'] = { v: 'Entrenamiento en combate del victimario', t: 's' };
    hoja['BL1'] = { v: 'Notificación del victimario', t: 's' };
    hoja['BM1'] = { v: 'Denuncias previas en contra', t: 's' };
    hoja['BN1'] = { v: 'Nombre del tercero', t: 's' };
    hoja['BO1'] = { v: 'Apellido del tercero', t: 's' };
    hoja['BP1'] = { v: 'DNI del tercero', t: 's' };
    hoja['BQ1'] = { v: 'Vínculo con la víctima del tercero', t: 's' };
    // Crear un libro de trabajo y agregar la hoja de cálculo
    const libro = utils.book_new();
    utils.book_append_sheet(libro, hoja, 'Denuncias');

    // Escribir el libro de trabajo a un archivo Excel
    writeFile(libro, 'denuncias.xlsx');


    
  };

  return (
    <button className="flex flex-row items-center justify-center bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-3/10" onClick={exportarDenuncias}><TableCellsIcon className='h-6 w-6' /> Generar Excel</button>
  );
}

export default Excel;