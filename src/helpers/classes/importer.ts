export default class Importer {
    public static async importFile<FileDataType>(
        filePath: string
    ): Promise<FileDataType | void> {
        const fileData = await import(filePath);
        return fileData?.default;
    }
}
