export function sortObjects(objects: any[], field: string, order: string = 'asc') {
    return objects.sort((a, b) => {
        if (order === 'asc') {
            if (a[field] < b[field]) {
                return -1;
            }
            if (a[field] > b[field]) {
                return 1;
            }
            return 0;
        } else {
            if (a[field] > b[field]) {
                return -1;
            }
            if (a[field] < b[field]) {
                return 1;
            }
            return 0;
        }
    });
}
