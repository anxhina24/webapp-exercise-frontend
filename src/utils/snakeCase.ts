export function convertKeysToSnakeCase(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    const snakeCaseObj: any = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const snakeCaseKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            snakeCaseObj[snakeCaseKey] = convertKeysToSnakeCase(obj[key]);
        }
    }

    return snakeCaseObj;
}
