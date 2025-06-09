import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { useState } from 'react';


type PDFProps = {
    datos: any;
    user: any;
    ampliacion?: boolean;
}



function PDF({ datos, user, ampliacion }: PDFProps) {

    const userDivisionZona = user.unidad.split(",")

    const [isDivision,] = useState(!(userDivisionZona.length > 1));

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    // Obtener día, mes y año por separado
    const dividirDivision = userDivisionZona[0].split(" ");
    const municipio = dividirDivision[1]?.toUpperCase() ? dividirDivision[1]?.toUpperCase() : dividirDivision[0]?.toUpperCase() === "METROPOLITANA" ? "RESISTENCIA" : dividirDivision[0]?.toUpperCase()


    type division = {
        division: string,
        direccion: string,
        telefono: string
    }
    // Direcciones de las divisiones
    const direccionDivisiones: division[] = [
        { division: "Metropolitana", direccion: "Avenida Alvear Nº 126", telefono: "362461832" },
        { division: "La Leonesa", direccion: "Santiago del Estero y Entre Ríos", telefono: "3624644562" },
        { division: "Lapachito", direccion: "25 de Mayo S/N", telefono: "3624605783" },
        { division: "Roque Saenz Peña", direccion: "Calle 7e/12 y 14", telefono: "3644431835" },
        { division: "Villa Ángela", direccion: "Echeverría N° 35", telefono: "3735 431438" },
        { division: "General San Martín", direccion: "Esq. Maipú y Urquiza", telefono: "3725422202" },
        { division: "Charata", direccion: "9 de Julio N° 575", telefono: "3624222322" },
        { division: "Juan José Castelli", direccion: "Av. Perón N° 470", telefono: "3624702665" }
    ]

    const espacioEnBlanco = (cantidad) => {
        let espacios = ""
        for (let i = 0; i < cantidad; i++) {
            espacios += "\u00A0"
        }
        return espacios
    }

    // Según userDivisionZona[0], quiero obtener de direccionDivisiones
    const direccionDivision: division[] = direccionDivisiones.filter((division) => division.division === userDivisionZona[0])
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
            marginBottom: 10,
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
            marginBottom: 10,
            fontSize: 12,
            textAlign: 'justify',
            flexWrap: 'wrap', 
                width: '100%', // Asegúrate de que el contenedor use el ancho disponible

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
            width: "1.17cm",
            height: "1.70cm"
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
        objetoText: {
            margin: 5,
            padding: 5,
            flexGrow: 1,
            fontSize: 12,
            fontWeight: 'bold',
            textIndent: 40,
        },
        longText: {
            // textIndent: 200,
            fontWeight: 'bold',
            fontSize: 10,
            textAlign: 'justify',
            lineHeight: 1.5, // Aumenta el espacio entre líneas
        },
        boldText: {
            fontFamily: 'Times-Bold',
            fontSize: 12,
            fontWeight: 'bold',
            textDecoration: 'underline',
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
            fontSize: 11,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
        },
        sectionSignatureEndText: {
            display: 'flex',
            fontSize: 11,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginRight: 10
        },
        sectionSignatureEndSecretario: {
            display: 'flex',
            fontSize: 11,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 80,
            marginLeft: 30
        },
        signaturesNameAndJerarquia: {
            fontFamily: 'Times-Bold',
            fontSize: 11,
            fontWeight: 'bold',
        },
        signaturesEndEnd: {
            fontFamily: 'Times-Bold',
            fontSize: 11,
            fontWeight: 'bold',
            textDecoration: 'underline',
        },
        footer: {
            marginTop: 5,
        },
        objeto: {
            marginLeft: 40,
            fontWeight: 'bold',
        },
        parrafoConSangria: {
            marginLeft: 40,
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        sangria: {
            width: 20, // simula sangría visual de 20 pts
        },
        textoNormal: {
            flex: 1,
        },
        parrafoNormal: {
            marginLeft: 40,
            marginTop: 10,
        },
        headerText: {
            fontSize: 10,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 5,
        },
        headerText2: {
            fontSize: 11,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 5,
        },
        textBoldHeader: {
            fontWeight: 'bold',
            fontSize: 14
        }

    });




    const Header = () => {

        return (
            <View style={styles.header}>
                <Image src="EscudoProvinciaDelChaco.png" style={styles.images} />
                <View style={styles.sectionCenter}>
                    <Text style={styles.textBoldHeader}>POLICIA DE LA PROVINCIA DEL CHACO

                    </Text>
                    {isDivision ?
                        <>
                            <Text style={styles.headerText2}>DPTO. VIOLENCIA FAMILIAR Y DE GÉNERO</Text>
                            <Text style={styles.headerText}>DIVISION VIOLENCIA FAMILIAR Y DE GENERO {direccionDivision[0].division.toUpperCase()}</Text>
                        </>
                        :
                        <>
                            <Text style={styles.headerText2}>{datos.supervision}</Text>
                            <Text style={styles.headerText}>COMISARÍA {userDivisionZona[1].toUpperCase()}</Text>
                        </>
                    }
                </View>
                <Image src="Escudo_Policia_Chaco_Transparente.png" style={styles.images} />
            </View>
        )
    }

    const Footer = () => {
        return (
            <View minPresenceAhead={150} wrap={false}>
                <View style={styles.sectionSignatureEndContainer}>
                    <View style={styles.sectionSignatureEndText}>
                        <Text style={styles.signaturesNameAndJerarquia}>{datos.nombre_completo_instructor || datos.instructor.nombre_completo_instructor}</Text>
                        <Text style={styles.signaturesNameAndJerarquia}>{datos.jerarquia_instructor || datos.instructor.jerarquia_instructor}</Text>
                        <Text style={styles.boldText}>-INSTRUCTOR-</Text>
                    </View>
                </View>
            </View>
        );
    };

    /*
    Cumplo en dirigirme a Ud., llevando a su conocimiento que en la fecha, se hizo presente  la ciudadana CABRAL ROSA MARINA de 43 años, Empleada, ddo Bº Juan Bautista Alberdi Mz 13 Pc 14- Resistencia. DNI Nº29.925.077.,Quien radico denuncia dando que cuenta:

    */
    // Create Document Component
    if (!ampliacion) {

        return (
            <Document>
                <Page style={styles.page}>
                    <Header />
                    <View style={styles.section}>
                        <View style={styles.sectionRight}>

                            <Text style={styles.sectionRight}>{municipio}, {new Date(datos.fecha).getUTCDate()} de {meses[new Date(datos.fecha).getUTCMonth() - 1]} de {new Date(datos.fecha).getUTCFullYear()}</Text>
                        </View>
                        <Text style={styles.headerText2}>-RADIOGRAMA-</Text>
                        <Text style={styles.text}>**********************************************************************************************************</Text>
                        <Text style={styles.headerText}>{datos.destinatario}</Text>
                        <Text style={styles.text}>**********************************************************************************************************</Text>
                        <Text style={styles.text}>{datos.nro_nota_preventivo}</Text>
                         <Text style={styles.text}>{espacioEnBlanco(68)} 
                            Cumple en dirigirme a Ud., llevando a su conocimiento que en la fecha, se hizo presente {datos.nombre_victima} {datos.apellido_victima} de {datos.edad_victima} años, {datos.ocupacion_victima}, domiciliado {datos.direccion_victima}, DNI {datos.DNI_victima}, quien radicó denuncia dando cuenta:
                            {datos.observaciones}. Efectuando consulta con {datos.consultado_preventivo} , dispuso : {datos.resolucion_preventivo} .
                        </Text>                        
                        <Text style={styles.text}>{espacioEnBlanco(68)} 
                            Por ello SOLICITO: {datos.solicita}
                        </Text> 


                    </View>
                    <Footer />
                </Page>
            </Document>
        )
    } else {
        return (
            <Document>
                <Page style={styles.page}>
                    <Header />
                    <View style={styles.section}>
                        <View style={styles.sectionRight}>

                            <Text style={styles.sectionRight}>{municipio}, {new Date(datos.fecha).getUTCDate()} de {meses[new Date(datos.fecha).getUTCMonth()]} de {new Date(datos.fecha).getUTCFullYear()}</Text>

                        </View>
                            <Text style={styles.headerText2}>-RADIOGRAMA-</Text>
                        <Text style={styles.text}>**********************************************************************************************************</Text>
                        <Text style={styles.headerText}>{datos.destinatario}</Text>
                        <Text style={styles.text}>**********************************************************************************************************</Text>
                        <Text style={styles.text}>{datos.nro_nota_preventivo}</Text>
                        <Text style={styles.text}>{espacioEnBlanco(75)}Ampliando anterior {datos.nro_nota_preventivo} , causa {datos.objeto} , expediente {datos.numero_de_expediente} que damnifica a {datos.apellido_victima} {datos.nombre_victima} {`(${datos.edad_victima})`}, domiciliado {datos.direccion_victima}, DNI {datos.DNI_victima}. Cumplo en dirigirme a usted, llevando a su conocimiento que en fecha {new Date(datos.fecha).getUTCDate()} de {meses[new Date(datos.fecha).getUTCMonth()]} de {new Date(datos.fecha).getUTCFullYear()} se amplió sumario de Policía Judicial por el delito de mención en rubro en virtud a las siguientes circunstancias: . 
                            {datos.observaciones}. Efectuando consulta con {datos.consultado_preventivo}, dispuso: {datos.resolucion_preventivo}.
                        </Text>
        
                        
                        <Text style={styles.text}>{espacioEnBlanco(68)} 
                            Por ello SOLICITO: {datos.solicita}

                        </Text> 


                    </View>
                    <Footer />
                </Page>
            </Document>
        )
    }
}



export default PDF;