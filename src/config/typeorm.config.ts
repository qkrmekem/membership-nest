import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigKey } from "src/member/interface/dbconfig.interface";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(
        private configService: ConfigService<ConfigKey>
    ){}

    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        const dbConfig = this.configService.get('db');
        return {
            type: dbConfig.type,
            host: dbConfig.host,
            port: dbConfig.port,
            username: dbConfig.username,
            password: dbConfig.password,
            database: dbConfig.database,
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: dbConfig.synchronize,
            logging: true,
        };
    }

}