import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStausValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.OPEN,
    TaskStatus.PROGRESS,
  ];

  transform(value: any): any {
    value = value.toUpperCase();
    if(!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not a valid status!`)
    }
    return value;
  }

  private isStatusValid (status: any) {
    const result = this.allowedStatus.indexOf(status);
    return result !== -1;
  }
};
