import { Request, Response, NextFunction } from 'express';
import Task, { ITask } from '../models/Task';

declare global {
    namespace Express {
        interface Request {
            task: ITask;
        }
    }
}

export async function validateTaskExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params;
		const task = await Task.findById(taskId);
		if (!task) {
			res.status(404).json({ error: 'Tarea no encontrado.' });
			return;
		}
        req.task = task;
		next();
	} catch (error) {
		res.status(500).json({ error: 'Hubo un error al momento de acceder ' });
	}
}
