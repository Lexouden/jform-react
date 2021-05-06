const { config } = require('@swc/core/spack');

export default config({
  entry: __dirname + '/src/index.tsx',
  output: {
    path: __dirname + '/dist',
    name: 'index.js',
  },
});
