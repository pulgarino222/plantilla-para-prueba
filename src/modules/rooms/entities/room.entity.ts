import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';
import { IsString, IsNumber } from 'class-validator';

@Entity()
export class Room {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column({ unique: true })
    @IsNumber()
    roomNumber: number;

    @Column()
    @IsString()
    type: string;

    @Column('decimal', { precision: 10, scale: 2 })
    @IsNumber()
    price: number;

    @OneToMany(() => Booking, (booking) => booking.room)
    bookings: Booking[];
}

