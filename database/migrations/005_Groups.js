'use strict';

const Schema = use( 'Schema' );
const Group  = use( 'App/Model/Group' );

class GroupsTableSchema extends Schema {

  up() {
    this.createIfNotExists( Group.table, ( table ) => {
      table.increments();
      table.string( 'name' ).notNullable().unique();
      table.string( 'description' );
    } )
  }

  down() {
    this.dropTableIfExists( Group.table );
  }

}

module.exports = GroupsTableSchema;
