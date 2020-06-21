export class PipeConfig {

    funcName: string;
    params: any;

    constructor(funcName: string, params?: any) {
        this.funcName = funcName;
        this.params = params;
    }
}
