import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsDTO } from './dto/tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getAllTags() : Promise<TagsDTO[]> {
    return await this.tagsService.getAllTags();
  }

  @Get(':id')
  async getTagById(@Param('id') id : string) : Promise<TagsDTO> {
    return await this.tagsService.getTagById(id);
  }

  @Post()
  async createTag(@Body() data: TagsDTO) : Promise<TagsDTO> {
    try {
      return await this.tagsService.createTag(data);
    } catch (error) {
      throw new HttpException(`Failed to create tag: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateTag(@Param('id') id: string, @Body() data: TagsDTO) : Promise<TagsDTO> {
    try {
      return await this.tagsService.updateTag(id, data);
    } catch (error) {
      throw new HttpException(`Failed to update tag: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id') 
  async deleteTag(@Param('id') id: string) {
    try {
      return await this.tagsService.deleteTag(id);
    } catch (error) {
      throw new HttpException(`Failed to delete tag: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
