import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard, JwtGuard } from 'src/auth/guard';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@ApiTags('Company')
@ApiBearerAuth()
@UseGuards(JwtGuard, AdminGuard)
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @ApiOperation({
        summary: 'Get a company by id.',
    })
    @Get(':id')
    async getCompanyById(@Param('id', ParseIntPipe) id: number) {
        return this.companyService.getCompanyById(id);
    }

    @ApiOperation({
        summary: 'Get all companies.',
    })
    @Get()
    async getAllCompanies() {
        return this.companyService.getAllCompanies();
    }

    @ApiOperation({
        summary: 'Get all users for a company.',
    })
    @Get(':id/users')
    async getAllUsersForCompany(@Param('id', ParseIntPipe) id: number) {
        return this.companyService.getAllUsersForCompany(id);
    }

    @ApiOperation({
        summary: 'Create a new company.',
    })
    @Post()
    async createCompany(@Body() dto: CreateCompanyDto) {
        return this.companyService.createCompany(dto);
    }
}
