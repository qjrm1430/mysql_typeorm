import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from '../entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    return await this.catRepository.save(createCatDto);
  }
  async findAll() {
    return await this.catRepository.find();
  }
  async findOne(id: number) {
    return await this.catRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.findOne(id);
    if (!cat) {
      throw new Error('cat not found');
    }
    Object.assign(cat, updateCatDto);
    return await this.catRepository.save(cat);
  }

  async remove(id: number) {
    const cat = await this.findOne(id);
    if (!cat) {
      throw new Error('cat not found');
    }
    return await this.catRepository.remove(cat);
  }
}
