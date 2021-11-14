export class SuccessResponse{

    private readonly _success: boolean;
    private readonly _data: {};

    constructor(data: {}|[] = {}) {
        this._success = true;
        this._data = data;
    }

    get success(){
        return this._success;
    }

    get data(){
        return this._data;
    }

    throw(res: any){
        res.status(200).json({
            success: this.success,
            data: this.data
        });
    }
}

export function successResponse(res: any, success: SuccessResponse){
    res.status(200).json({
        success: success.success,
        data: success.data
    });
}