import { Request, Response } from 'express';
import Task from '../models/Task';

export class TaskController {
	static createTask = async (req: Request, res: Response): Promise<void> => {
		try {
			const task = new Task(req.body);

			// Referencias
			task.project = req.project.id;
			req.project.tasks.push(task.id);

			// Guardando cambios
			await Promise.allSettled([task.save(), req.project.save()]);

			res.send('Tarea creada exitosamente.');
		} catch (error) {
			res.status(500).send({ error: 'Hubo un error' });
		}
	};

	static getProjectTasks = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const tasks = await Task.find({ project: req.project.id }).populate(
				'project'
			);
			res.json(tasks);
		} catch (error) {
			res.status(500).send({ error: 'Hubo un error' });
		}
	};

	static getTaskById = async (req: Request, res: Response): Promise<void> => {
		try {
            if (req.task.project.toString() !== req.project.id) {
                res.status(400).json({ error: "Acción no válida." });
                return;
            }

			res.json(req.task);
		} catch (error) {
			res.status(500).send({ error: 'Hubo un error' });
		}
	};

	static updateTask = async (req: Request, res: Response): Promise<void> => {
		try {
            if (req.task.project.toString() !== req.project.id) {
                res.status(400).json({ error: "Acción no válida." });
                return;
            }

			req.task.name = req.body.name;
			req.task.description = req.body.description;
			await req.task.save();

			res.json("Tarea actualizada correctamente");
		} catch (error) {
			res.status(500).send({ error: 'Hubo un error' });
		}
	};

	static deleteTask = async (req: Request, res: Response): Promise<void> => {
		try {
            if (req.task.project.toString() !== req.project.id) {
                res.status(400).json({ error: "Acción no válida." });
                return;
            }

			req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString());
			
			Promise.allSettled([
				req.task.deleteOne(),
				req.project.save()
			]);

			res.json("Tarea actualizada correctamente");
		} catch (error) {
			res.status(500).send({ error: 'Hubo un error' });
		}
	};

	static updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
		try {
			const { status } = req.body;
			req.task.status = status;
			await req.task.save();
			res.json("Tarea actualizada correctamente");
		} catch (error) {
			res.status(500).send({ error: 'Hubo un error' });
		}
	};
}
