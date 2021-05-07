import compileSchema from '../compileSchema';

describe('createJform', () => {
  const schema = {
    type: 'object',
    definitions: {
      nameref: {
        type: 'string',
      },
    },
    title: 'A schema',
    properties: {
      name: {
        $ref: '#/definitions/nameref',
      },
    },
  };

  it('should resolve $refs', () => {
    const schemaCompiled = compileSchema(schema);
    expect(schemaCompiled.properties.name).toHaveProperty('type');
    expect(schemaCompiled.properties.name.type).toEqual('string');
  });
});
