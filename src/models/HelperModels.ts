export interface ResponseModel {
    success: boolean,
    message: string;
    response?: any
}

export interface SelectWhereModel  {
    select: string[],
    where: any
};