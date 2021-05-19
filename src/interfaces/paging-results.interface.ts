/**
 * 分页数据的结果类型
 */
export interface PagingResults<T> {
  data: T[];
  total: number;
}
