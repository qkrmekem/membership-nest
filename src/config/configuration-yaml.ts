import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

// 환경변수에 따라 설정 파일 이름을 결정
const YAML_CONFIG_FILENAME = `${process.env.NODE_ENV}.yaml`;
// const YAML_CONFIG_PATH = join(process.cwd(), 'config', YAML_CONFIG_FILENAME);
const YAML_CONFIG_PATH = join(__dirname, YAML_CONFIG_FILENAME);
console.log('경로 ', YAML_CONFIG_PATH);

export default () => {
    return yaml.load(
        readFileSync(YAML_CONFIG_PATH, 'utf-8')
    ) as Record<string, any>;
};