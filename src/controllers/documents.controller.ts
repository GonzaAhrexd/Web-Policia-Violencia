const { Document, Packer, Paragraph, TextRun } = require('docx');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const fs = require('fs');
const path = require('path');

export const generateWord = async (req, res) => {

    const { nombre_victima, apellido_victima, edad_victima, dni_victima, estado_civil_victima, ocupacion_victima, nacionalidad_victima, direccion_victima, telefono_victima, SabeLeerYEscribir, observaciones, AsistidaPorDichoOrganismo, ExaminadaMedicoPolicial, AccionarPenalmente, AgregarQuitarOEnmendarAlgo, nombre_completo_secretario, jerarquia_secretario, plaza_secretario, nombre_completo_instructor, jerarquia_instructor } = req.body

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage(); // Tamaño por defecto: 8.5x11 pulgadas (612x792 puntos)

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const color = rgb(0, 0, 0);
    // Agregar el texto al documento
    const text = "POLICIA DE LA PROVINCIA DEL CHACO\n" +
        "DIVISION VIOLENCIA FAMILIAR Y DE GENERO METROPOLITANA\n" +
        "Avenida Alvear N° 126 - Resistencia - Chaco; Tel. 4761832\n" +
        "Expediente N° 130/--E/2024";
    const { width, height } = page.getSize();
    const fontSize = 12;
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textHeight = font.heightOfFontAtSize(fontSize);

    const x = (width - textWidth) / 2;
    const y = (height - textHeight) / 2;

    page.drawText(text, {
        x: x,
        y: y,
        size: fontSize,
        font,
        color
    });

    // Finalizar el documento
    const pdfBytes = await pdfDoc.save();

    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=document.pdf',
    });
    res.send(Buffer.from(pdfBytes));


}