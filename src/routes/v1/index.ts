import {Router} from "express";

const router = Router();

router.route('/')
    .get((req, res, next) => {
        res.send({
            server: 'Test series server is up!!!'
        });
    })

export default router;
