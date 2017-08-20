exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (column) => {
        column.increments()
        column.string('email', 'char(60)').unique().notNullable()
        column.string('h_pw', 'char(100').notNullable()
        column.timestamps(true, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};