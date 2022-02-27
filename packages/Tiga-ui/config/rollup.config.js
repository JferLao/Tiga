import Package from '../package.json'
import RollupJson from '@rollup/plugin-json'
import RollupNodeResolve from '@rollup/plugin-node-resolve'
import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupTypescript from 'rollup-plugin-typescript2'
import RollupCopy from 'rollup-plugin-copy'
import RullupAlias from 'rollup-plugin-alias'
import NodePath, { resolve } from 'path'

const resolveFile = path => NodePath.resolve(__dirname, '..', path)
const externalPackages = [
  'react',
  'react-dom',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react'
]

const defaultConfig = [
  {
    input: resolveFile(Package.source),
    output: [
      {
        file: resolveFile(Package.main),
        format: 'cjs',
        sourcemap: true
      },
      {
        file: resolveFile(Package.module),
        format: 'es',
        sourcemap: true
      }
    ],
    external: externalPackages,
    plugins: [
      RullupAlias({
        resolve: ['.jsx', '.js', '.ts', '.tsx'],
        entries: [{ find: 'types', replacement: '../types' }]
      }),
      RollupNodeResolve({
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        }
      }),
      RollupCommonjs({
        include: /\/node_modules\//
      }),
      RollupJson(),
      RollupTypescript({
        tsconfig: resolveFile('tsconfig.rollup.json')
      }),
      RollupCopy({
        targets: [
          {
            src: resolveFile('src/style'),
            dest: resolveFile('dist')
          }
        ]
      })
    ]
  }
]

export default defaultConfig
