import * as Knex from 'knex';

export class ManageModel {
    // getCategory(db: Knex) {
    //     return db('category')
    //         .orderBy('id')
    // }
    getCategory(db: Knex, lang_code: string) {
        return db('category as c')
            .leftJoin('category_meta as cm', 'cm.category_meta_id', 'c.ref_category_meta_id')
            .where('c.ref_language_code', lang_code)
            .orderBy('id')
    }
    saveCategoryMeta(db: Knex, data: any) {
        return db('category_meta')
            .insert(data)
    }
    saveCategory(db: Knex, data: any) {
        return db('category')
            .insert(data)
    }
    updateCategoryMeta(db: Knex, data: any, category_meta_id: number) {
        return db('category_meta')
            .update(data)
            .where('category_meta_id', category_meta_id)
    }
    updateCategory(db: Knex, data: any, id: number) {
        return db('category')
            .update(data)
            .where('id', id)
    }
    /////////////////////////////////
    getUserAll(db: Knex, userStatus: number) {
        return db('user_login')
            .where('status', userStatus)
    }
    ////////////////////////////////
}
