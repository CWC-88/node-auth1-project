
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 1, password: 'rowValue1'},
        {username: 2, password: 'rowValue2'},
        {username: 3, password: 'rowValue3'}
      ]);
    });
};
