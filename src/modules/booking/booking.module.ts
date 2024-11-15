import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { Booking } from '../booking/entities/booking.entity';
import { Room } from '../rooms/entities/room.entity';
import { BookingController } from './booking.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Room])],
  providers: [BookingService],
  exports: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
