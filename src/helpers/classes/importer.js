module.exports = class Importer {
    static async importFile(filePath) {
        const fileData = await import(filePath);
        return fileData?.default;
    }
};
