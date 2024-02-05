import {
    Inject,
    Injectable,
    Logger,
    LoggerService,
    NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(@Inject('APP_LOGGER') private readonly logger: LoggerService) { }

    use(req: any, res: any, next: NextFunction) {
        const { ip, method, originalUrl } = req;
        const userAgent = req.get('user-agent');

        res.on('finish', () => {
            const { statusCode } = res;
            this.logger.log(
                `METHOD = ${ method } | URL = ${ originalUrl } | STATUS = ${ statusCode } | IP = ${ ip } | AGENT = ${ userAgent }`,
            )
        });

        next();
    }

}