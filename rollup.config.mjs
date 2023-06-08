import resolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import ts from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.cjs.min.js',
        format: 'cjs',
        plugins: [terser()],
      },
      {
        file: 'dist/index.esm.js',
        format: 'es',
      },
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.min.js',
        format: 'cjs',
        plugins: [terser()],
      },
      {
        file: 'dist/index.esm.min.js',
        format: 'es',
        plugins: [terser()],
      },
    ],
    plugins: [
      ts({
        tsconfig: './tsconfig.build.json',
        declaration: true,
        declarationDir: './ts',
      }),
      cjs(),
      resolve({
        modulesOnly: true,
      }),
    ],
  },
  {
    input: './dist/ts/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
