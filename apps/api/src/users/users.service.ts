import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_SERVICE') private readonly userClient: ClientProxy) { }


    getAllUsers(data: any) {
        return this.userClient.send('users.findAllUser', {});
    }

    findAUser(id: number) {
        return this.userClient.send('users.findOneUser', id);
    }

    createAUser(data: any) {
        return this.userClient.send('users.createUser', data);
    }

    updateAUser(data: any) {
        return this.userClient.send('users.updateUser', data);
    }

    deleteAUser(id: number) {
        return this.userClient.send('users.removeUser', id);
    }
}

