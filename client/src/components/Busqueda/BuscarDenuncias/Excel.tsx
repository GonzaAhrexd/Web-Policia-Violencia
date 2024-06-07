import React from 'react';
import { utils, writeFile } from 'xlsx';
import   'xlsx-style'; // Importar SheetJS-style

import { useState } from 'react';

import { getVictima, getVictimario } from '../../../api/crud';

interface denuncia {
  denunciasAMostrar: any
}

function Excel({denunciasAMostrar}: denuncia ){

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
    medida_solicitada_por_victima:string,
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


  }
  let denuncias:Array<DenunciasExcel> = []
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // Haz un map que llene un arreglo con los datos de las denuncias
    denunciasAMostrar.map(async (denuncia:DenunciasExcel | any) => {
      // Obten victimas y victimarios con las llamadas al api, guardalos en una variable victima y victimario los datos
      const victima = await getVictima(denuncia.victima_ID);
      const victimario = await getVictimario(denuncia.victimario_ID);


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
      medida_dispuesta_por_autoridad_judicial: denuncia?.medida_dispuesta_por_autoridad_judicial,
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
      tiene_hijos: victima?.hijos.tiene_hijos ? "Sí" : "No" ,
      dependencia_economica: victima?.hijos.dependencia_economica ? "Sí" : "No" ,
      mayores_de_edad: victima?.hijos.mayores_de_edad ? "Sí" : "No" ,
      menores_de_edad: victima?.hijos.menores_de_edad ? "Sí" : "No" ,
      menores_discapacitados: victima?.hijos.menores_discapacitados ? "Sí" : "No" ,
      hijos_con_el_agresor: victima?.hijos.hijos_con_el_agresor,
      nombre_victimario: victimario?.nombre,
      apellido_victimario: victimario?.apellido,
      edad_victimario: victimario?.edad,
      dni_victimario: victimario?.DNI,
      estado_civil_victimario: victimario?.estado_civil,
      ocupacion_victimario: victimario?.ocupacion,
      abuso_de_alcohol_victimario: victimario?.abuso_de_alcohol  ? "Sí" : "No" ,
      antecedentes_toxicologicos_victimario: victimario?.antecedentes_toxicologicos ? "Sí" : "No" ,
      antecedentes_penales_victimario: victimario?.antecedentes_penales ? "Sí" : "No" ,
      antecedentes_contravencionales_victimario: victimario?.antecedentes_contravencionales ? "Sí" : "No" ,
     entrenamiento_en_combate_victimario: victimario?.entrenamiento_en_combate ? "Sí" : "No" ,
      notificacion_victimario: victimario?.notificacion,
      cantidad_de_denuncias_realizadas_contra_el_victimario: victimario?.cantidad_de_denuncias_previas
    });
  });



  const exportarDenuncias = () => {
    // Crear una hoja de cálculo a partir de los datos de las denuncias
    const hoja = utils.json_to_sheet(denuncias);

    hoja['!cols'] = [{ wch: 26 }];
    hoja['A1'].s = {									// set the style for target cell
      font: {
        name: 'ID Testing',
        sz: 24,
        bold: true,
        color: { rgb: "FFFFAA00" }
      },
    };

    // Crear un libro de trabajo y agregar la hoja de cálculo
    const libro = utils.book_new();
    utils.book_append_sheet(libro, hoja, 'Denuncias');

    // Escribir el libro de trabajo a un archivo Excel
    writeFile(libro, 'denuncias.xlsx');
  };

  return (
    <div>
      <button onClick={exportarDenuncias}>Exportar denuncias</button>
    </div>
  );
}

export default Excel;