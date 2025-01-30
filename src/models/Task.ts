import mongoose, { Schema, Document, Types } from 'mongoose';

const taskStatus = {
	PENDING: 'pending',
	ON_HOLD: 'onHold',
	IN_PROGRESS: 'inProgress',
	UNDER_REVIEW: 'underReview',
	COMPLETED: 'completed'
} as const;

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

export interface ITask extends Document {
	name: string;
	description: string;
	status: string;
	project: Types.ObjectId;
}

const TaskSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		description: {
			type: String,
			required: true,
			trim: true
		},
		status: {
			type: String,
			enum: Object.values(taskStatus),
			default: taskStatus.PENDING
		},
		project: {
			type: Types.ObjectId,
			ref: 'Project'
		}
	},
	{
		timestamps: true
	}
);

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;
