import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file'
import { join } from "path";

const env = process.env.NODE_ENV;
const logDir = join(__dirname, '/../../logs');

const dailyOptions = (level: string) => {
    return {
        level, // 로그 수준
        datePattern: 'YYYY-MM-DD', // timestamp 포맷 지정
        // dirname: logDir + `/${level}`, 
        // filename: `%DATE%.${level}.log`, 
        dirname: logDir + `/%DATE%`, // 파일이 저장될 위치
        filename: `%DATE%.log`, // 파일 이름 - %DATE%는 앞에서 설정한 datePattern을 뜻함
        maxFiles: 30, //30일치 로그파일 저장
        zippedArchive: true, // 로그가 쌓이면 압축하여 관리
        format:
            env === 'production' ? winston.format.simple() : winston.format.combine(
                winston.format.timestamp(),
                nestWinstonModuleUtilities.format.nestLike('KEC NEST', {
                    prettyPrint: true,
                }),
            ),
    };
};

// 로그 레벨(낮은 숫자일 수록 중요함)
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
export const winstonLogger = WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            level: env === 'production' ? 'http' : 'silly',
            format:
            env === 'production' ? winston.format.simple() : winston.format.combine(
                winston.format.timestamp(),
                nestWinstonModuleUtilities.format.nestLike('KEC NEST', {
                    colors: true,
                    prettyPrint: true,
                }),
            ),
        }),

        new winstonDaily(dailyOptions('info'))
    ]
})

