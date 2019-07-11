'use strict';

const UserService = {
  getAllUsers(db) {
    return db
      .from('windchime_users')
      .select('*');
  },

  getById(db, id) {
    return UserService.getAllUsers(db)
      .where('id', id)
      .first();
  },

  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('windchime_users')
      .returning('*')
      .then(([user]) => user);
  },

  serializeUsers(users) {
    return users.map(this.serializeUser);
  },

  serializeUser(user) {
    return {
      id: user.id,
      date_created: new Date(user.date_created)
    };
  }
};

module.exports = UserService;