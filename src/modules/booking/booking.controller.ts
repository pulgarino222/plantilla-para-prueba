import { Controller, Post, Body, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from '../booking/entities/booking.entity';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Bookings')  // Define el tag para la documentación de Swagger
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(':roomId')
  @ApiOperation({ summary: 'Create a new booking for a room' })  // Descripción de la operación
  @ApiResponse({
    status: 201,
    description: 'The booking has been successfully created.',
    type: Booking,  // Tipo de la respuesta en caso de éxito
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input, such as a reservation exceeding one hour.',
  })
  @ApiParam({
    name: 'roomId',
    description: 'The ID of the room for the booking',
    type: String,
  })
  @ApiBody({
    description: 'Booking data',
    type: Booking,  // Define la estructura del cuerpo de la solicitud
  })
  async createBooking(
    @Param('roomId') roomId: string,
    @Body('checkInDate') checkInDate: Date,
    @Body('checkOutDate') checkOutDate: Date,
    @Body('guests') guests: number,
  ): Promise<Booking> {
    return this.bookingService.createBooking(roomId, checkInDate, checkOutDate, guests);
  }
}
