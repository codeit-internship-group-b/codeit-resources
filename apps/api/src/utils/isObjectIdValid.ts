const isObjectIdValid = (id: string): boolean => /^[0-9a-fA-F]{24}$/.test(id);

export default isObjectIdValid;
