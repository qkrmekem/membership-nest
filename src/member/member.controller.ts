import { Body, Controller, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { SignupDto } from './dto/signup.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

}
