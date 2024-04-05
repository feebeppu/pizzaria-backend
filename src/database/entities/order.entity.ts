import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'table', nullable: false })
  table: number;

  @Column({ name: 'status', default: false })
  status: boolean;

  @Column({ name: 'draft', default: true })
  draft: boolean;

  @Column({ name: 'client_name', length: 100, nullable: true })
  clientName?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItens: OrderItemEntity[];
}
