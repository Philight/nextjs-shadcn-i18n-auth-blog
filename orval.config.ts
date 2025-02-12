import { defineConfig } from 'orval';

// ============================================================================

const INPUT_FILE = 'src/utils/api/swagger.json';
const OUTPUT_FILE = 'src/utils/api/__generated/index.ts';

// ============================================================================

export default defineConfig({
  openapi: {
    /**
     * INPUT
     **/
    input: { target: INPUT_FILE },
    /**
     * OUTPUT
     **/
    output: {
      target: OUTPUT_FILE,
      // client: 'react-query',
      client: 'fetch',
      mode: 'tags-split',
      mock: {
        type: 'msw',
        delay: () => (process.env.NODE_ENV === 'development' ? 1000 : 10),
        delayFunctionLazyExecute: true,
        generateEachHttpStatus: true,
      },
      prettier: true,
      // clean: ['src/api'],
      /**
       * OVERRIDE
       **/
      override: {
        // mutator: {
        //   path: 'src/api/mutators/axios-instance.ts',
        //   name: 'customInstance',
        // },
        useNativeEnums: true,
      },
    },
  },
});
