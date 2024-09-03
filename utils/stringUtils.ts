export function format(source: string, params: Array<any>) {
    for (let i = 0; i < params.length; i++) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), params[i]);         
    }
    return source;
}


export function withNewLines(input: string) {
    if (!input) {
        return input;
    }
    const output = input?.replace(/\n/g, '<br />');
    return output;
  };