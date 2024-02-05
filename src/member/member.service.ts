import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './interface/environment.interface';
import { ConfigKey, DbConfig } from './interface/dbconfig.interface';

@Injectable()
export class MemberService {

    constructor(){
    }


}
