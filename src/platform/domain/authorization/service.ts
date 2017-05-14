
import { Representation, Entity } from './';

export class Service {

    public verifyCredentials(username: string, password: string): Promise<Representation.IUser> {

    const promise: Promise<Representation.IUser> = 
      new Promise<Representation.IUser>((resolve, reject) => {
          const user: Entity.IUser = Entity.USERS.find(x => x.name === username && x.password === password );

          process.nextTick(x => !!user ? resolve(user) : reject('INVALID CREDENTIALS'));
      });

      return promise;
  }

}
