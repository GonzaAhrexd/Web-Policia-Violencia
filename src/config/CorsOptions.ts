const allowedOrigins = [
  process.env.corsOrigin, // Origen desde la variable de entorno
  'http://localhost:4200', // Origen adicional
];


const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origen no permitido por CORS'));
        }
    },
    credentials: true,
};


export default corsOptions; 