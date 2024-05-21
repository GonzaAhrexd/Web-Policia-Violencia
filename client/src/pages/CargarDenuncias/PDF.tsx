import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface PDFProps {
    datos: any;
    user: any
}

function PDF({ datos, user }: PDFProps) {

    const userDivisionZona = user.unidad.split(",")
    const fecha:Date = new Date()
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    console.log(fecha)
    // Obtener día, mes y año por separado
    const dia = fecha.getDate()
    const mes = meses[fecha.getMonth()]
    const año = fecha.getFullYear()
    const horaActual = fecha.getHours().toString().padStart(2, '0') + ":" + fecha.getMinutes().toString().padStart(2, '0')

    console.log(dia, mes, año)


    const styles = StyleSheet.create({
        page: {
            padding: 30,
        },
        section: {
            margin: 10,
            padding: 10,
            fontSize: 12,
        },
        header: {
            fontSize: 14,
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent: 'center',
            marginBottom: 20,
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 30,
            paddingRight: 30,
        },
        subheader: {
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
        },
        text: {
            margin: 10,
            fontSize: 12,
            textAlign: 'justify',
        },
        signature: {
            marginTop: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        signatureSection: {
            width: '30%',
            textAlign: 'center',
        },
        sectionCenter: {
            margin: 5,
            padding: 5,
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 11
        },
        images: {
            width: 40,
            height: 40
        },
        textBold: {
            fontWeight: 'bold',
            fontSize: 16
        },
        sectionRight: {
            margin: 5,
            padding: 5,
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'flex-end',
            fontSize: 12,
            fontWeight: 'bold',
        },
        longText: {
            fontWeight: 'bold',
            fontSize: 10,
            textAlign: 'justify',
            
        },
        boldText: {
            fontFamily: 'Times-Bold',
            fontSize: 12,
            fontWeight: 'bold',
        },
        sectionSignatureEnd: {
            display: 'flex',
            fontSize: 12,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
        },
        sectionSignatureEndContainer: {
            display: 'flex',
            fontSize: 12,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
        },
        sectionSignatureEndText: {
            display: 'flex',
            fontSize: 12,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            marginTop: 20,
        }
    });

    console.log(datos)
    // Create Document Component
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.header}>
                    <Image src="Escudo_de_la_Provincia_del_Chaco.svg.png" style={styles.images} />
                    <View style={styles.sectionCenter}>

                        <Text style={styles.textBold}>POLICIA DE LA PROVINCIA DEL</Text>
                        <Text style={styles.textBold}>CHACO</Text>

                        <Text>DIVISION VIOLENCIA FAMILIAR Y DE GENERO</Text>
                        <Text>{userDivisionZona[0].toUpperCase()}</Text>
                        {/* Editar según dónde se realiza la denuncia */}
                        <Text>Avenida Alvear Nº 126 - {userDivisionZona[1]} - Chaco; Tel. 4761832</Text>
                    </View>
                    <Image src="Escudo_Policia_Chaco_Transparente.png" style={styles.images} />
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionRight}>
                        <Text>Expediente Nº 130/--E/2024</Text>
                    </View>
                    <Text style={styles.subheader}>- DENUNCIA -</Text>
                    <Text style={styles.text}>{datos.nombre_victima} {datos.apellido_victima} S/ DENUNCIA:--------------------------------------------------------/</Text>
                    <Text style={styles.longText}>
                        En la Division Violencia Familiar Y De Genero {userDivisionZona[0]}, con asiento en la ciudad de {userDivisionZona[1]}, {userDivisionZona[1] == "Resistencia" ? "capital de la" : ""} Provincia del
                        Chaco, a los {dia} del mes de {mes} del año {año}, siendo la hora {horaActual} comparece a despacho la persona de mención en el título,
                        quien interrogado por sus datos personales de identidad DIJO: Llamarse como consta en el titulo, Ser de nacionalidad: {datos.nacionalidad},
                        de {datos.edad} años de edad, Estado civil {datos.estado_civil_victima}, ocupación: {datos.ocupacion_victima}, {datos.SabeLeerYEscribir ? "con " : "sin "} instrucción, domiciliada {datos.direccion_victima} -, Teléfono Celular Nº {datos.telefono_victima},
                        Identidad que acredita con Juramento de Ley, aduciendo tener DNI Nº {datos.dni_victima} Quien es notificado del contenido del Artículo 245°
                        (FALSO DENUNCIANTE) del Código Penal de la Nación Argentina; el contenido del Art. 84º del Código Procesal Penal de la
                        Provincia del Chaco, donde en sus partes dice<Text style={styles.boldText}>  “...LA VICTIMA DEL DELITO TENDRA DERECHO A SER INFORMADA
                        ACERCA DE LAS FACULTADES QUE PUEDA EJERCER EN EL PROCESO-ARTICULO 8 Y 25, DE LAS
                        RESOLUCIONES QUE SE DICTEN SOBRE LA SITUACION DEL IMPUTADO Y CUANDO FUERE MENOR O
                        INCAPAZ SE AUTORIZARA A QUE DURANTE LOS ACTOS PROCESALES SEA ACOMPAÑADA POR PERSONA DE
                        SU CONFIANZA, SIEMPRE QUE ELLO NO PERJUDIQUEN LA DEFENSA DEL IMPUTADO O LOS RESULTADOS
                        DE LA INVESTIGACIÓN..."</Text>y Ley Nacional Nº 26.485, (Ley de Protección Integral para prevenir sancionar y erradicar la
                        violencia contra las mujeres en los ámbitos en que desarrolla sus relaciones interpersonales) y los términos de la Ley Provincial Nº
                        836-N (Ley de Violencia Familiar). Abierto el acto y cedida que le fuere la palabra y en uso de la misma <Text style={styles.boldText}>DENUNCIA:</Text> {datos.observaciones} Seguidamente se le hace saber que existe la Línea 137, ubicado en Calle Mitre N° 171 –Ciudad-,
                        donde se brinda asesoramiento legal y asistencia psicológica las 24 horas del dia de manera GRATUITA, y la Línea 102 ubicado en
                        Avenida Sarmiento N° 1675-Ciudad. <Text style={styles.boldText}>PREGUNTADO:</Text> “…Si desea ser asistida por dicho organismo. <Text style={styles.boldText}>RESPONDE:</Text> “{datos.AsistidaPorDichoOrganismo ? "SÍ" : "NO"}
                        <Text style={styles.boldText}>PREGUNTADO:</Text> Si desea ser examinada por el medico policial en turno…”. <Text style={styles.boldText}>RESPONDE:</Text>{datos.ExaminadaMedicoPolicial ? "SÍ" : "NO"}. <Text style={styles.boldText}>PREGUNTADO:</Text> “…Si desea
                        accionar penalmente por el delito que diera lugar…”. <Text style={styles.boldText}>RESPONDE:</Text> {datos.AccionarPenalmente ? "SÍ" : "NO"}. <Text style={styles.boldText}>PREGUNTADO:</Text> Si desea agregar, quitar o enmendar
                        algo a lo expuesto precedentemente….” <Text style={styles.boldText}>RESPONDE:</Text> Que {datos.AgregarQuitarOEnmendarAlgo} . Se le hace entrega de una copia de esta denuncia y se le notifica
                        que deberá presentarse ante el Juzgado del Menor y de La familia, sito en calle French Nº166- Rcia, al segundo día hábil, para los
                        trámites pertinentes. Con lo que no siendo para más, finaliza el acto, previa íntegra lectura efectuada por la compareciente y para
                        constancia legal de su conformidad firma al pie ante Mí y secretaria.
                    </Text>

                </View>
                <Text>_____________________________________________________</Text>
                <View style={styles.sectionSignatureEnd}>
                        <Text>Firma Denunciante</Text>
                        <Text>Aclaración</Text>
                        <Text>DNI</Text>                 
                </View>
                <View style={styles.sectionSignatureEndContainer}>   
                <View style={styles.sectionSignatureEndText}>
                        <Text>{datos.nombre_completo_secretario}</Text>
                        <Text>{datos.jerarquia_secretario} {datos.plaza_secretario}</Text>
                        <Text>SECRETARIO</Text>
                    </View>
                    <View style={styles.sectionSignatureEndText}>
                    <Text>{datos.nombre_completo_instructor}</Text>
                        <Text>{datos.jerarquia_instructor} </Text>
                        <Text>INSTRUCTOR</Text>
                    </View>
                    </View>
            </Page>
        </Document>
    )

}
export default PDF;