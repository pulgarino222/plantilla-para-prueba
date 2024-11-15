import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../booking/entities/booking.entity';
import { Room } from '../rooms/entities/room.entity';
import { LessThan, MoreThan } from 'typeorm';


@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async findRoomById(roomId: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }
    return room;
  }

  async checkRoomAvailability(roomId: string, checkInDate: Date, checkOutDate: Date): Promise<boolean> {
    const bookings = await this.bookingRepository.find({
      where: { 
        room: { id: roomId },
        
        checkInDate: LessThan(checkOutDate),
        checkOutDate: MoreThan(checkInDate),
      },
    });
    return bookings.length === 0; 
  }

  async createBooking(roomId: string, checkInDate: Date, checkOutDate: Date, guests: number): Promise<Booking> {
    const room = await this.findRoomById(roomId);

    const currentTime = new Date();
    const minutes = currentTime.getMinutes();
    if (minutes >= 45) {
      throw new BadRequestException('Reservations can only be created if there are more than 15 minutes until the next hour.');
    }


    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const diffInMinutes = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60);
    if (diffInMinutes > 60) {
      throw new BadRequestException('Reservations cannot be longer than one hour.');
    }

    // Verificar disponibilidad de la habitación
    const isAvailable = await this.checkRoomAvailability(roomId, checkIn, checkOut);
    if (!isAvailable) {
      throw new BadRequestException('The room is already booked for the selected dates.');
    }

    const booking = this.bookingRepository.create({
      room,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
    });

    return this.bookingRepository.save(booking);
  }
}
