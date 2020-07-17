import { TaskStatus } from '../task-status.enum';
import { IsIn, IsOptional } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional() @IsIn([TaskStatus.OPEN, TaskStatus.PROGRESS, TaskStatus.DONE]) status: TaskStatus;
  @IsOptional() search: string;
}
