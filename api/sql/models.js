import knex from './connector';

export class Users {
  getByLogin(username) {
    const query = knex('usuarios')
      .select('uid', 'username', 'name', 'email', 'role', 'mantis_token')
      .where('username', username);

    return query.then(([row]) => row);
  }

  getById(id) {
    const query = knex('usuarios')
      .select('uid', 'username', 'name', 'email', 'role')
      .where('uid', id);

    return query.then(([row]) => row);
  }
}
