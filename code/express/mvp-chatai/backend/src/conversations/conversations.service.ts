import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from '../projects/projects.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ConversationsService {
  constructor(
    private prisma: PrismaService,
    private projectsService: ProjectsService,
  ) {}

  // Create conversation (thread)
  async create(projectId: number, userId: number, dto: CreateConversationDto) {
    // Check access
    const hasAccess = await this.projectsService.checkAccess(projectId, userId);
    if (!hasAccess) {
      throw new ForbiddenException('Access denied to this project');
    }

    const conversation = await this.prisma.conversation.create({
      data: {
        projectId: projectId,
        title: dto.title || 'New Conversation',
        // threadId is auto-generated via @default(uuid()) in schema
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return conversation;
  }

  // Get all conversations in a project
  async getProjectConversations(projectId: number, userId: number) {
    // Check access
    const hasAccess = await this.projectsService.checkAccess(projectId, userId);
    if (!hasAccess) {
      throw new ForbiddenException('Access denied to this project');
    }

    const conversations = await this.prisma.conversation.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return conversations;
  }

  // Get conversation by threadId (IMPORTANT for threading!)
  async getByThreadId(threadId: string, userId: number) {
    const conversation = await this.prisma.conversation.findUnique({
      where: {
        threadId: threadId,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            agent: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Check access
    const hasAccess = await this.projectsService.checkAccess(conversation.projectId, userId);
    if (!hasAccess) {
      throw new ForbiddenException('Access denied to this conversation');
    }

    return conversation;
  }

  // Update conversation title
  async updateTitle(threadId: string, userId: number, title: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { threadId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Check access
    const hasAccess = await this.projectsService.checkAccess(conversation.projectId, userId);
    if (!hasAccess) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.conversation.update({
      where: { threadId },
      data: { title },
    });
  }

  // Delete conversation
  async delete(threadId: string, userId: number) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { threadId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Check if user is owner or editor
    const member = await this.prisma.projectMember.findFirst({
      where: {
        projectId: conversation.projectId,
        userId: userId,
        role: {
          in: ['owner', 'editor'],
        },
      },
    });

    if (!member) {
      throw new ForbiddenException('Only owners and editors can delete conversations');
    }

    await this.prisma.conversation.delete({
      where: { threadId },
    });

    return { message: 'Conversation deleted successfully' };
  }
}
