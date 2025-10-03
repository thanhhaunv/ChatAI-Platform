import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity('project_members')
export class ProjectMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, project => project.members)
  project: Project;

  @ManyToOne(() => User, user => user.projectMembers)
  user: User;

  @Column({ length: 50 })
  role: string;
}