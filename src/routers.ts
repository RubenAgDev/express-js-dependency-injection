import { Request, Response, Router } from 'express';

import { getDatabase } from '../dependencies';

const BASE_PATH = '/';

export const myRouter = (database = getDatabase()): Router => {
  const router = Router();

  router.get(BASE_PATH, async(req: Request, res: Response) => {
    // TODO: Parse request body
    res.json({});
  });

  return router;
};
