/**
 * 包含基于正则表达式的判断函数
 */

// 是负整数
export function isPositiveInteger(str: string): boolean {
  const reg = /^[1-9]\d*|0$/;
  return reg.test(str);
}

// 是非零的正整数
export function isNonZeroPositiveInteger(str: string): boolean {
  const reg = /^[1-9]\d*$/;
  return reg.test(str);
}
