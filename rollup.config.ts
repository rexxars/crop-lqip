import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'

const browserName = 'crop-lqip.browser'

export default {
  input: `src/${browserName}.ts`,
  output: [
    {file: `dist/${browserName}.umd.js`, name: 'cropLqip', format: 'umd', sourcemap: true},
    {file: `dist/${browserName}.es5.js`, format: 'es', sourcemap: true}
  ],
  external: [],
  plugins: [typescript({useTsconfigDeclarationDir: true}), commonjs(), resolve(), sourceMaps()],
  watch: {
    include: 'src/**'
  }
}
