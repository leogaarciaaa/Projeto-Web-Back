import swaggerAutogen from 'swagger-autogen';
import path from 'path';

const outputDir = './src';
const outputFile = path.join(outputDir, 'swagger_output.json');
const endpointsFiles = ['./src/routes/*.js'];

swaggerAutogen()(outputFile, endpointsFiles);