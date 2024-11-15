import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Booking API')  // Cambié el título de 'Products API' a 'Booking API'
  .setDescription('API for booking rooms')  // Descripción de la API
  .setVersion('1.0')
  .addBearerAuth()  // Si tu API usa autenticación Bearer, mantén esta línea
  .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,  // Configura la persistencia de la autorización
  },
  customSiteTitle: 'Booking API Documentation',  // Título del sitio en la documentación
};
