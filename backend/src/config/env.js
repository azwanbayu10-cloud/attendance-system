import dotenv from 'dotenv';
dotenv.config();
export const env = { port: process.env.PORT || 4000, jwtSecret: process.env.JWT_SECRET || 'dev-secret', jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d', clientUrl: process.env.CLIENT_URL || 'http://localhost:5173', officeLat: Number(process.env.OFFICE_LAT || 0), officeLng: Number(process.env.OFFICE_LNG || 0), gpsRadiusMeters: Number(process.env.GPS_RADIUS_METERS || 150) };
