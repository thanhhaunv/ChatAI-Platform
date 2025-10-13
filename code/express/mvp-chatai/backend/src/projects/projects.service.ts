import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { InviteMemberDto } from './dto/invite-member.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  // Create project
  async create(userId: number, createProjectDto: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        ownerId: userId,
        members: {
          create: {
            userId: userId,
            role: 'owner',
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return project;
  }

  // Get user's projects
  async getUserProjects(userId: number) {
    const projects = await this.prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            conversations: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return projects;
  }

  // Get project by ID
  async getProjectById(projectId: number, userId: number) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        conversations: {
          orderBy: {
            updatedAt: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found or access denied');
    }

    return project;
  }

  // Invite member to project
  async inviteMember(projectId: number, userId: number, inviteMemberDto: InviteMemberDto) {
    // Check if user is owner or editor
    const membership = await this.prisma.projectMember.findFirst({
      where: {
        projectId: projectId,
        userId: userId,
        role: {
          in: ['owner', 'editor'],
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException('Only owners and editors can invite members');
    }

    // Find user by email
    const invitedUser = await this.prisma.user.findUnique({
      where: { email: inviteMemberDto.email },
    });

    if (!invitedUser) {
      throw new NotFoundException('User not found');
    }

    // Check if already a member
    const existingMember = await this.prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId: projectId,
          userId: invitedUser.id,
        },
      },
    });

    if (existingMember) {
      throw new ForbiddenException('User is already a member');
    }

    // Add member
    const member = await this.prisma.projectMember.create({
      data: {
        projectId: projectId,
        userId: invitedUser.id,
        role: inviteMemberDto.role,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return member;
  }

  // Remove member
  async removeMember(projectId: number, userId: number, memberId: number) {
    // Check if user is owner
    const membership = await this.prisma.projectMember.findFirst({
      where: {
        projectId: projectId,
        userId: userId,
        role: 'owner',
      },
    });

    if (!membership) {
      throw new ForbiddenException('Only owners can remove members');
    }

    // Cannot remove owner
    const memberToRemove = await this.prisma.projectMember.findFirst({
      where: {
        projectId: projectId,
        userId: memberId,
      },
    });

    if (!memberToRemove) {
      throw new NotFoundException('Member not found');
    }

    if (memberToRemove.role === 'owner') {
      throw new ForbiddenException('Cannot remove project owner');
    }

    // Remove member
    await this.prisma.projectMember.delete({
      where: {
        id: memberToRemove.id,
      },
    });

    return { message: 'Member removed successfully' };
  }

  // Check user access to project
  async checkAccess(projectId: number, userId: number): Promise<boolean> {
    const member = await this.prisma.projectMember.findFirst({
      where: {
        projectId: projectId,
        userId: userId,
      },
    });

    return !!member;
  }
}
