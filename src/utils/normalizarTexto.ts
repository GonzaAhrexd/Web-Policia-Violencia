export const normalizarLetras = (caracter: string): string => {
    const equivalencias: { [key: string]: string } = {
        s: '[sz]',
        z: '[sz]',
        i: '[iy]',
        y: '[iy]',
        k: '[kq]',
        q: '[kq]',
        v: '[vb]',
        b: '[vb]',
        g: '[gj]',
        j: '[gj]',
        á: '[áa]',
        a: '[áa]',
        é: '[ée]',
        e: '[ée]',
        í: '[íi]',
        ó: '[óo]',
        o: '[óo]',
        ú: '[úu]',
        u: '[úu]',
        ü: '[üu]',
    };
    return equivalencias[caracter.toLowerCase()] || caracter;
};

export const construirExpresionRegular = (cadena: string): RegExp | null => {
    if (cadena === 'no_ingresado') return null;
    const partes = cadena.toLowerCase().trim().split(/\s+/);
    const regexPattern = partes.map((part) => part.split('').map(normalizarLetras).join('')).join('.*');
    return new RegExp(regexPattern, 'i');
};
