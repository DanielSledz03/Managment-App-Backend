import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyById(id: number) {
    return this.prisma.company.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllCompanies() {
    return this.prisma.company.findMany();
  }

  async getAllUsersForCompany(companyId: number) {
    const users = await this.prisma.companyUser.findMany({
      where: {
        companyId: companyId,
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const newUsers = users.map((companyUser) => companyUser.user);

    return newUsers;
  }

  async createCompany(dto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        name: dto.name,
        administrators: {
          connect: {
            id: dto.adminId,
          },
        },
      },
    });
  }
}
