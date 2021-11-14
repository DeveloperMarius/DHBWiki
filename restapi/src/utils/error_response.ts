export class ErrorResponse{

    private readonly _error: string;
    private readonly _code: number;
    private readonly _message?: string;
    private readonly _errors? : ErrorResponse[] = [];

    constructor(error: string, code: number, message?: string, errors: ErrorResponse[] = []) {
        this._error = error;
        this._code = code;
        this._message = message;
        this._errors = errors;
    }

    get error(){
        return this._error;
    }

    get code(){
        return this._code;
    }

    get message(){
        return this._message;
    }

    get errors(){
        return this._errors;
    }

    throw(res: any){
        res.status(this.code).json({
            error: this.error,
            message: this.message,
            code: this.code,
            errors: this.errors
        });
    }
}

export function errorResponse(res: any, error: ErrorResponse){
    res.status(error.code).json({
        error: error.error,
        message: error.message,
        code: error.code,
        errors: error.errors
    });
}