import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { IsDate, IsNumber } from 'class-validator';

@Entity()
export class Booking {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column({ type: 'date' })
    @IsDate()
    checkInDate: Date;

    @Column({ type: 'date' })
    @IsDate()
    checkOutDate: Date;

    @Column()
    @IsNumber()
    guests: number;

    @ManyToOne(() => Room, (room) => room.bookings, { nullable: false, onDelete: 'CASCADE' })
    room: Room;
}

