import { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {
	static getAllProjects = async (req: Request, res: Response): Promise<void> => {
		try {
			const projects = await Project.find({});
			res.json(projects);
		} catch (error) {
			console.log(error);
		}
	};

	static getProjectById = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		try {
			const project = await Project.findById(id).populate('tasks');

			if (!project) {
				res.status(404).json({ error: "Proyecto no encontrado." });
				return;
			}
			
			res.json(project);
		} catch (error) {
			console.log(error);
		}
	};
	
	static createProject = async (req: Request, res: Response): Promise<void> => {
		const project = new Project(req.body);
		try {
			await project.save();
			res.send('Proyecto creado correctamente.');
		} catch (error) {
			console.log(error);
		}
	};
	
	static updateProject = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		
		try {
			const project = await Project.findByIdAndUpdate(id, req.body);
	
			if (!project) {
				res.status(404).json({ error: "Proyecto no encontrado." });
				return;
			}
	
			await project.save();
			res.send("Proyecto actualizado correctamente.")
		} catch (error) {
			console.log(error);
		}
	};
	
	static deleteProject = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		
		try {
			const project = await Project.findById(id);
	
			if (!project) {
				res.status(404).json({ error: "Proyecto no encontrado." });
				return;
			}
			await project.deleteOne();
			res.send("Proyecto eliminado exitosamente.")
		} catch (error) {
			console.log(error);
		}
	};
}
