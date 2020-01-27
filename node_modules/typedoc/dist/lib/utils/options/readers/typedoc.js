"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const FS = require("fs");
class TypeDocReader {
    constructor() {
        this.priority = 100;
        this.name = 'typedoc-json';
    }
    read(container, logger) {
        const path = container.getValue('options');
        const file = this.findTypedocFile(path, logger);
        if (!file) {
            if (!container.isDefault('options')) {
                logger.error(`The options file could not be found with the given path ${path}`);
            }
            return;
        }
        let data = require(file);
        if (typeof data !== 'object') {
            logger.error(`The file ${file} is not an object.`);
            return;
        }
        if ('src' in data && !('inputFiles' in data)) {
            data.inputFiles = Array.isArray(data.src) ? data.src : [data.src];
            delete data.src;
        }
        container.setValues(data).match({
            ok() { },
            err(errors) {
                for (const err of errors) {
                    logger.error(err.message);
                }
            }
        });
    }
    findTypedocFile(path, logger) {
        path = Path.resolve(path);
        return [
            path,
            Path.join(path, 'typedoc.json'),
            Path.join(path, 'typedoc.js')
        ].find(path => FS.existsSync(path) && FS.statSync(path).isFile());
    }
}
exports.TypeDocReader = TypeDocReader;
//# sourceMappingURL=typedoc.js.map