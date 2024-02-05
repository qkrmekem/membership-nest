import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './interface/environment.interface';
import { ConfigKey, DbConfig } from './interface/dbconfig.interface';
import { LoginDto } from './dto/login.dto';
import { User } from './entity/user.entity';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {

    constructor(
        private memberRepository: MemberRepository
    ){
    }

    getUser(param: LoginDto){
        console.log('로그인 시도, ',JSON.stringify(param));
        return this.memberRepository.getUser(param);
    }


    createUser(param: User){
        return this.memberRepository.createUser(param);
    }
}
