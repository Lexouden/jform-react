import buildSyncValidation from '../buildSyncValidation';

describe('sync validation', () => {
  it('Works with basic objects', () => {
    let schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 4,
        },
        age: {
          type: 'number',
          minimum: 21,
        },
      },
      required: ['name', 'age'],
    };

    let values = {};

    let errors: any = buildSyncValidation(schema)(values);
    expect(errors).toHaveProperty('name');
    expect(errors).toHaveProperty('age');
  });

  it('Errors on arrays are in _error key of the array', () => {
    let schema = {
      type: 'object',
      properties: {
        columns: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'string',
          },
        },
      },
      required: ['columns'],
    };

    let values = {};
    let errors: any = buildSyncValidation(schema)(values);
    expect(errors).toHaveProperty('columns');
    expect(errors.columns).toHaveProperty('_error');
  });

  it('Works with array elements', () => {
    let schema = {
      type: 'object',
      properties: {
        columns: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'string',
            minLength: 3,
          },
        },
      },
      required: ['columns'],
    };

    let values = { columns: ['a'] };
    let errors: any = buildSyncValidation(schema)(values);
    expect(errors).toHaveProperty('columns');
    expect(errors.columns).toHaveProperty('0');
  });

  it('Works with several errors', () => {
    let schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 3,
        },
        columns: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'string',
            minLength: 3,
          },
        },
      },
      required: ['columns', 'name'],
    };

    let values = { columns: ['a'], name: 'aa' };
    let errors: any = buildSyncValidation(schema)(values);
    expect(errors).toHaveProperty('columns');
    expect(errors).toHaveProperty('name');
    expect(errors.columns).toHaveProperty('0');
  });
});
