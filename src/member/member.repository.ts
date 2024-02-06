import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import { RoleId } from "./enum/role-id.enum";
import { RoleName } from "./enum/role-name.enum";

@Injectable()
export class MemberRepository {
    constructor(
        @InjectRepository(User)
        private userEntity: Repository<User>
    ){}

    async getUser(param: LoginDto){
        
        
        try {
            const user = await this.userEntity.findOneBy({ id: param.id });
            console.log('리포지토리 ', param);
            console.log('테이블', user);
            if(param.id === user?.id && param.password === user?.password){
                user.password = null;
                return user;
            }
            throw new Error('일치 정보 없음');
        } catch (error) {
            throw error;
        }
        // return user;
    }

    async createUser(param: User){
        const user = this.userEntity.create(param);
        try {
            const basicRole = this.getBasicRole();
            user.role.push(basicRole);
            const result = await this.userEntity.save(user);
            result.password = null;
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
        
    }

    getBasicRole(){
        return {
            roleId: RoleId.User,
            roleName: RoleName.User
        }
    }
}