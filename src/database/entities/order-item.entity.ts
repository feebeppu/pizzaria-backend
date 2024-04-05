import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'order_item' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @Column({ name: 'product_id', nullable: false })
  productId: string;

  @Column({ name: 'order_id', nullable: false })
  orderId: string;

  @ManyToOne(() => ProductEntity, (product) => product.orderItens)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderItens)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: OrderEntity;
}
