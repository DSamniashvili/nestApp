import { ResponseTypes } from './response-types.enum';

export interface SuccessMessageInterface {
  status: ResponseTypes;
  data: any;
}
