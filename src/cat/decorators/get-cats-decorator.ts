import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

export const GetCatsSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary:
        'Get all cats with limit and offset optional query and sorting params',
    }),
    ApiQuery({ name: 'limit', required: false, type: Number }),
    ApiQuery({ name: 'offset', required: false, type: Number }),
    ApiQuery({
      name: 'order',
      required: false,
      type: String,
      example: 'ASC',
    }),
    ApiQuery({
      name: 'sort',
      required: false,
      type: String,
      example: 'name',
    }),
  );
};
