import buildSyncValidation, { setError } from '../buildSyncValidation';

describe('sync validation', () => {
  it('Works with basic objects', () => {
    let schema = {
      properties: {
        name: {
          type: 'string',
          minLength: 4,
        },
      },
      required: ['name'],
    };

    let values = {};

    let errors = buildSyncValidation(schema)(values);
    expect(errors).toHaveProperty('name');
  });
});
