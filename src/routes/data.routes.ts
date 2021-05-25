import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';

import * as express from 'express';
import { Router, Request, Response } from 'express';

import { DataModel } from '../models/data.model';

const dataModel = new DataModel();
const router: Router = Router();


// router.get('/', (req: Request, res: Response) => {
//     res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
// });
router.get('/get_language', async (req: Request, res: Response) => {
    try {
        var rs: any = await dataModel.getLanguage(req.db);
        res.send({ ok: true, rows: rs });
    } catch (error) {
        console.log(error);
        res.send({ ok: false, message: error.message });
    }
});

export default router;