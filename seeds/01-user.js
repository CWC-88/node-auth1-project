
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "a", password: '1'},
        {username: "b", password: '2'},
        {username: "b", password: '3'}
      ]);
    });
};
