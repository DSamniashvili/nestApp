import { ErrorMessageInterface } from './response-error.interface';
import { SuccessMessageInterface } from './response-success.interface';
import { ResponseTypes } from './response-types.enum';

export function getSuccessMessage(data): SuccessMessageInterface {
  return {
    status: ResponseTypes.success,
    data,
  };
}

export function getErrorMessage(message): ErrorMessageInterface {
  return {
    status: ResponseTypes.error,
    message,
  };
}
