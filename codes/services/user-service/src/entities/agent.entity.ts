import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Message } from './message.entity';
import { BillingLog } from './billing_log.entity';

@Entity('agents')
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  type: string;

  @Column({ length: 200 })
  api_endpoint: string;

  @Column({ type: 'json' })
  config_json: object;

  @Column({ length: 50 })
  model_source: string;

  @Column({ type: 'json', nullable: true })
  training_config: object;

  @Column({ length: 20 })
  version: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Message, message => message.agent)
  messages: Message[];

  @OneToMany(() => BillingLog, billingLog => billingLog.agent)
  billingLogs: BillingLog[];

  @CreateDateColumn()
  created_at: Date;
}