import * as Knex from 'knex';

export class Login {
  login(db: Knex, username: string, password: string) {
    return db('user_login')
      .where('username', username)
      .where('password', password)
      .limit(1);
  }
}