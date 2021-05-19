/**
 * typeorm一些未直接定义接口的返回值的包装
 */

/**
 * findAndCount函数返回值类型定义
 */
export type FindAndCountReturn<T> = [T[], number];
