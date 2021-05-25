import * as Knex from 'knex';

export class DataModel {
    getLanguage(db: Knex) {
        return db('language')
            .orderBy('language_id')
    }
}
