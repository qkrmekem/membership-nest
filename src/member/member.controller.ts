import {  Body, Controller, Param, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entity/user.entity';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('login')
  getUer(@Body() param: LoginDto ){
    console.log('login', param);
    return this.memberService.getUser(param);
  }

  @Post('signup')
  createUser(@Body() param: User){
    console.log('signup', param);
    
    return this.memberService.createUser(param);
  }

}
