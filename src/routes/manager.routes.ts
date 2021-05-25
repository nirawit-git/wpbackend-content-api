/// <reference path="../../typings.d.ts" />

import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';

import * as express from 'express';
import { Router, Request, Response } from 'express';

import { ManageModel } from '../models/manage.model';
import { UserModel } from '../models/user';

const userModel = new UserModel();
const manageModel = new ManageModel();
const router: Router = Router();

// router.get('/', async (req: Request, res: Response) => {
//     try {
//         var rs: any = await manageModel.getRequest(req.db);
//         res.send({ ok: true, rows: rs });
//     } catch (error) {
//         console.log(error);
//         res.send({ ok: false, message: error.message });
//     }
// });

router.get('/category/:langcode', async (req: Request, res: Response) => {
    const langcode: string = req.params.langcode;
    try {
        var rs: any = await manageModel.getCategory(req.db, langcode);
        res.send({ ok: true, rows: rs });
    } catch (error) {
        console.log(error);
        res.send({ ok: false, message: error.message });
    }
});

router.post('/save_category', async (req: Request, res: Response) => {
    const data: any = req.body.data;
    const publicStatus: any = req.body.publicStatus;
    let requestDate = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
        // console.log(data);
        console.log(publicStatus);
        let playload_meta = {
            datetime_create: requestDate,
            status: publicStatus
        }
        const idSaveMeta: any = await manageModel.saveCategoryMeta(req.db, playload_meta)
        // console.log(idSaveMeta[0]);

        let playload = {}

        for (var index in data) {
            console.log(data[index]);

            playload = {
                category_name: data[index].data,
                ref_language_code: data[index].language_code,
                category_create_dateime: requestDate,
                ref_category_meta_id: idSaveMeta[0]
            }
            await manageModel.saveCategory(req.db, playload)
        }
        res.send({ ok: true });
    } catch (error) {
        console.log(error);
        res.send({ ok: false, message: error.message });
    }
});

router.put('/edit_category', async (req: Request, res: Response) => {
    const data: any = req.body.data;
    try {
        console.log(data);
        const category_meta_id: number = Number(data.category_meta_id)
        const id: number = Number(data.id)
        if (category_meta_id !== null && id !== null) {
            const dataCategoryMeta = {
                status: data.Status,
            }
            const updateCategoryMeta = await manageModel.updateCategoryMeta(req.db, dataCategoryMeta, category_meta_id)
            if (updateCategoryMeta) {
                const dataCategory = {
                    category_name: data.Text
                }
                await manageModel.updateCategory(req.db, dataCategory, id)
            }
            res.send({ ok: true });
        }
    } catch (error) {
        res.send({ ok: false, message: error.message })
    }
})

router.get('/userall/:userStatus', async (req: Request, res: Response) => {
    const userStatus = req.params.userStatus;
    try {
        const numuserStatus: number = Number(userStatus)
        const rs: any = await manageModel.getUserAll(req.db, numuserStatus)
        console.log(res);
        res.send({ ok: true, rows: rs });
    } catch (error) {
        console.log(error);
        res.send({ ok: false, message: error.message });
    }
});


// // save new request
// router.post('/', async (req: Request, res: Response) => {
//     let symptom = req.body.symptom;
//     let lat = req.body.lat;
//     let lng = req.body.lng;

//     let id = req.decoded.id;

//     let requestDate = moment().format('YYYY-MM-DD');
//     let requestTime = moment().format('HH:mm:ss');

//     let data: any = {};
//     data.symptom = symptom;
//     data.lat = lat;
//     data.lng = lng;
//     data.register_id = id;
//     data.request_date = requestDate;
//     data.request_time = requestTime;
//     data.status = 1;

//     try {
//         await requestModel.saveRequest(req.db, data);
//         req.mqttClient.publish('request/notify', 'new request', { qos: 0, retain: false });
//         res.send({ ok: true, code: HttpStatus.OK });
//     } catch (error) {
//         res.send({ ok: false, error: error.message, code: HttpStatus.OK });
//     }

// });


export default router;