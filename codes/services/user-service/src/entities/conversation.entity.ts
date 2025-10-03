import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Project } from './project.entity';
import { Message } from './message.entity';
//import { BillingLog } from './billing_log.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, project => project.conversations)
  project: Project;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'json', nullable: true })
  metadata: object;

  @OneToMany(() => Message, message => message.conversation)
  messages: Message[];

  @CreateDateColumn()
  created_at: Date;
}