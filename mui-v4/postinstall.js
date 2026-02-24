const fse = require('fs-extra');

const path = require('path');
const topDir = __dirname;
fse.emptyDirSync(
  path.join(topDir.replace('/web-uikit/mui-v4', ''), 'public', 'tinymce')
);
fse.copySync(
  path.join(topDir, 'node_modules', 'tinymce'),
  path.join(topDir.replace('/web-uikit/mui-v4', ''), 'public', 'tinymce'),
  { overwrite: true }
);
