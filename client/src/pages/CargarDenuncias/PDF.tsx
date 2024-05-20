import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface PDFProps {
    datos: any;
    user: any
}

function PDF({ datos, user }: PDFProps) {

    const userDivisionZona = user.unidad.split(",")

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#ffffff'
        },
        section: {
            margin: 5,
            padding: 5,
            flexDirection: 'row',
        },
        sectionCenter: {
            margin: 5,
            padding: 5,
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 12
        },
        images: {
            width: 40,
            height: 40
        },
        textBold: {
            fontWeight: 'bold',
        }

    });

    // Create Document Component
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image src="Escudo_de_la_Provincia_del_Chaco.svg.png" style={styles.images} /> asdsa s
                    <View style={styles.sectionCenter}>
                        <Text style={styles.textBold}>POLICIA DE LA PROVINCIA DEL CHACO</Text>
                        <Text>DIVISION VIOLENCIA FAMILIAR Y DE GENERO</Text>
                        <Text>{userDivisionZona[0].toUpperCase()}</Text>
                        <Text>{userDivisionZona[1]}, Chaco</Text>
                    </View>
                    <Image src="Escudo_Policia_Chaco_Transparente.png" style={styles.images} /> asdsa s
                </View>
                <View style={styles.section}>
                    <Text>Expediente #2</Text>
                </View>
            </Page>
        </Document>
    )

}
export default PDF;