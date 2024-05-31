import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';

interface IUser {
    isAdmin?: boolean;
}

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context
            .switchToHttp()
            .getRequest<Request & { user?: IUser }>();
        const user = request.user;

        if (!user || user.isAdmin === false) {
            throw new ForbiddenException('Unauthorized');
        }

        return true;
    }
}
