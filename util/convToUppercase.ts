export default (name: string): string => {
    const format: RegExp = /(\b[a-z](?!\s))/g;
    return name.replace(format, (s) => s.toUpperCase())
}