import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RoomService } from '../rooms/rooms.service';
import { Room } from '../rooms/entities/room.entity';
import { IsNumber, IsString } from 'class-validator'; // Agregar validadores para los datos del JSON

class CreateRoomDto {
  @IsNumber()
  roomNumber: number;

  @IsString()
  type: string;

  @IsNumber()
  price: number;
}

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // Crear una habitación
  @Post()
  async create(@Body() roomData: CreateRoomDto): Promise<Room> {
    return this.roomService.create(roomData);
  }

  // Obtener todas las habitaciones
  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  // Obtener una habitación por su ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Room> {
    return this.roomService.findOne(id);
  }

  // Actualizar una habitación
  @Put(':id')
  async update(@Param('id') id: string, @Body() roomData: Partial<Room>): Promise<Room> {
    return this.roomService.update(id, roomData);
  }

  // Eliminar una habitación
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.roomService.remove(id);
  }
}
