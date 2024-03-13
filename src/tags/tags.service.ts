import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import { TagsDTO } from '../tags/dto/tags.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTags(): Promise<TagsDTO[]> {
    const tags = await this.prisma.tag.findMany();
    return tags;
  }

  async getTagById(id: string): Promise<TagsDTO> {
    const tag = await this.prisma.tag.findUnique({
      where: {
        id: id,
      },
    });

    return tag;
  }

  async createTag(data: TagsDTO): Promise<TagsDTO> {
    const existingTag = await this.prisma.tag.findFirst({
      where: {
        name: data.name,
      },
    });

    if (existingTag != undefined) {
      throw new Error('tag with the same name already exists!');
    }

    const tag = await this.prisma.tag.create({
      data,
    });
    return tag;
  }

  async updateTag(id: string, data: TagsDTO): Promise<TagsDTO> {
    var tagToUpdate: TagsDTO = await this.prisma.tag.findUnique({
      where: {
        id: id,
      },
    });

    if (tagToUpdate == undefined) {
      throw new Error('tag does not exist!');
    }

    var updatedTag = await this.prisma.tag.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
      },
    });

    return updatedTag;
  }

  async deleteAllTags() {
    await this.prisma.tag.deleteMany();
  }

  async deleteTag(id: string): Promise<TagsDTO> {
    const existingTag: TagsDTO = await this.prisma.tag.findFirst({
      where: {
        id: id,
      },
    });

    if (existingTag == undefined) {
      throw new Error(`tag with id: ${id} was not found in the database!`);
    }

    const deletedTag: TagsDTO = await this.prisma.tag.delete({
      where: {
        id: id,
      },
    });

    return deletedTag;
  }
}
