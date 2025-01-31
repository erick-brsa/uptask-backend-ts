import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { TaskController } from '../controllers/TaskController';
import { validateProjectExists } from '../middleware/project';
import { handleInputErrors } from '../middleware/validation';
import { validateTaskExists } from '../middleware/task';

const router = Router();

router.get('/', ProjectController.getAllProjects);

router.get(
	'/:id',
	param('id').isMongoId().withMessage('El ID del proyecto no es válido.'),
	handleInputErrors,
	ProjectController.getProjectById
);

router.post(
	'/',
	body('projectName')
		.notEmpty()
		.withMessage('El nombre del proyecto es obligatorio.'),
	body('clientName')
		.notEmpty()
		.withMessage('El nombre del cliente es obligatorio.'),
	body('description')
		.notEmpty()
		.withMessage('La descripción del proyecto es obligatoria.'),
	handleInputErrors,
	ProjectController.createProject
);

router.put(
	'/:id',
	param('id').isMongoId().withMessage('El ID del proyecto no es válido.'),
	body('projectName')
		.notEmpty()
		.withMessage('El nombre del proyecto es obligatorio.'),
	body('clientName')
		.notEmpty()
		.withMessage('El nombre del cliente es obligatorio.'),
	body('description')
		.notEmpty()
		.withMessage('La descripción del proyecto es obligatoria.'),
	handleInputErrors,
	ProjectController.updateProject
);

router.delete(
	'/:id',
	param('id').isMongoId().withMessage('El ID del proyecto no es válido.'),
	handleInputErrors,
	ProjectController.deleteProject
);

// Routes for tasks
router.param('projectId', validateProjectExists);

router.post(
	'/:projectId/tasks',
	param('projectId')
	.isMongoId()
	.withMessage('El ID del proyecto no es válido.'),
	body('name')
	.notEmpty()
	.withMessage('El nombre de la tarea es obligatorio.'),
	body('description')
	.notEmpty()
	.withMessage('La descripción de la tarea es obligatoria.'),
	handleInputErrors,
	TaskController.createTask
);

router.get(
	'/:projectId/tasks',
	TaskController.getProjectTasks
);

router.param('taskId', validateTaskExists);

router.get(
	'/:projectId/tasks/:taskId',
	param('taskId').isMongoId().withMessage('El ID del proyecto no es válido.'),
	handleInputErrors,
	TaskController.getTaskById
);

router.put(
	'/:projectId/tasks/:taskId',
	param('taskId').isMongoId().withMessage('El ID del proyecto no es válido.'),
	body('name')
	.notEmpty()
	.withMessage('El nombre de la tarea es obligatorio.'),
	body('description')
	.notEmpty()
	.withMessage('La descripción de la tarea es obligatoria.'),
	handleInputErrors,
	TaskController.updateTask
);

router.delete(
	'/:projectId/tasks/:taskId',
	param('taskId').isMongoId().withMessage('El ID del proyecto no es válido.'),
	handleInputErrors,
	TaskController.deleteTask
);

router.post(
	'/:projectId/tasks/:taskId/status',
	param('taskId').isMongoId().withMessage('El ID del proyecto no es válido.'),
	body('status').notEmpty().withMessage('El estado es obligatorio.'),
	handleInputErrors,
	TaskController.updateTaskStatus
);

export default router;
