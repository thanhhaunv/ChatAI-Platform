import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { ProjectMember } from './project_member.entity';
import { Conversation } from './conversation.entity';
//import { BillingLog } from './billing_log.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => User, user => user.projects)
  owner: User;

  @OneToMany(() => ProjectMember, member => member.project)
  members: ProjectMember[];

  @OneToMany(() => Conversation, conversation => conversation.project)
  conversations: Conversation[];

  // @OneToMany(() => BillingLog, billingLog => billingLog.user)
  // billingLogs: BillingLog[];

  @CreateDateColumn()
  created_at: Date;
}