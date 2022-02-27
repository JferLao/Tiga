const glob = require('glob-all');

describe('Checking generated css js files', () => {
    it('should generate css js files', (done) => {
        const files = glob.sync([
            './dist/js/index.js',
        ]);

        if (files.length > 0) {
            done();
        } else {
            throw new Error('no css js files generated');
        }
    });
});