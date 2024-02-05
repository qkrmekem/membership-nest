import { DBType } from "../enum/DbType.enum";

export interface ConfigKey {
    db: DbConfig
}

export interface DbConfig{
    // typeorm 옵션에 들어가는 type은 실제 사용될 db타입을 명시해야 한다고 하여 따로 enum으로 뺐습니다.
    type: DBType;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string;
    synchronize: boolean;
}