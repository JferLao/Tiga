const fs =require('fs')
const path = require('path')

const cwd = process.cwd();

function resolve(moduleName){
  return require.resolve(moduleName)
}

function getProjectPath(...filePath) {
  return path.join(cwd, ...filePath);
}

// 主要是处理浏览器兼容的版本
function isThereHaveBrowserslistConfig() {
  try {
    const packageJson = require(getProjectPath('package.json'));
    if (packageJson.browserslist) {
      return true;
    }
  } catch (e) {
    //
  }
  if (fs.existsSync(getProjectPath('.browserslistrc'))) {
    return true;
  }
  if (fs.existsSync(getProjectPath('browserslist'))) {
    return true;
  }
  return false;
}


module.exports = function (modules) {
  // 这些plugin转自网络，应该不需要这么多plugin
  // Todo 优化plugin项
  const plugins = [
    [
      resolve('@babel/plugin-transform-typescript'),
      {
        isTSX: true,
      },
    ],
    resolve('babel-plugin-inline-import-data-uri'),
    resolve('@babel/plugin-transform-member-expression-literals'),
    resolve('@babel/plugin-transform-object-assign'),
    resolve('@babel/plugin-transform-property-literals'),
    [
      resolve('@babel/plugin-transform-runtime'),
      {
        useESModules: modules === false,
        version: '^7.10.4',
      },
    ],
    resolve('@babel/plugin-transform-spread'),
    resolve('@babel/plugin-transform-template-literals'),
    resolve('@babel/plugin-proposal-export-default-from'),
    resolve('@babel/plugin-proposal-export-namespace-from'),
    resolve('@babel/plugin-proposal-object-rest-spread'),
    [
      resolve('@babel/plugin-proposal-decorators'),
      {
        legacy: true,
      },
    ],
    resolve('@babel/plugin-proposal-class-properties'),
  ];
  return {
    presets: [
      resolve('@babel/preset-react'),
      [
        resolve('@babel/preset-env'),
        {
          modules,
          targets: isThereHaveBrowserslistConfig()
            ? undefined
            : {
                browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
              },
        },
      ],
    ],
    plugins,
  };
};
