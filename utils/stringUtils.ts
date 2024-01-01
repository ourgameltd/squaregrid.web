export function format(source: string, params: Array<any>) {
    for (let i = 0; i < params.length; i++) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), params[i]);         
    }
    return source;
}