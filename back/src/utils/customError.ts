export class CustomError extends Error {
    public code: number;
    public constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}