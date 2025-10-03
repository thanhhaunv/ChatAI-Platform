import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Project } from './project.entity';
import { ProjectMember } from './project_member.entity';
import { Message } from './message.entity';
import { BillingLog } from './billing_log.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ unique: true, nullable: true, length: 20 })
  phone: string;

  @Column({ nullable: true, length: 50 })
  auth_provider: string;

  @Column({ length: 50 })
  role: string;

  @OneToMany(() => Project, project => project.owner)
  projects: Project[];

  @OneToMany(() => ProjectMember, member => member.user)
  projectMembers: ProjectMember[];

  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @OneToMany(() => BillingLog, billingLog => billingLog.user)
  billingLogs: BillingLog[];

  @CreateDateColumn()
  created_at: Date;
}