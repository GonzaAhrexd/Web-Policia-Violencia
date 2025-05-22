const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.CORS_ORIGIN,
            'http://localhost:4200',
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origen no permitido por CORS'));
        }
    },
    credentials: true,
};


export default corsOptions; 