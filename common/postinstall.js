const fse = require('fs-extra');

const path = require('path');
const topDir = __dirname;

// fse.emptyDirSync(
//   path.join(
//     topDir.replace('/web-uikit/common', ''),
//     'src/@types/uikit-common.d.ts',
//     'uikit-common.d.ts'
//   )
// );
fse.copySync(
  path.join(topDir, '@types', 'index.d.ts'),
  path.join(
    topDir.replace('/web-uikit/common', ''),
    'src/@types',
    'uikit-common.d.ts'
  ),
  { overwrite: true }
);
