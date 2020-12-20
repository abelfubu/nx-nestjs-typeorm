import { TaskStatus } from '@mono/api-interfaces';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    const isValid = this.allowedStatuses.includes(value.toUpperCase());
    if (!isValid) {
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }
}
