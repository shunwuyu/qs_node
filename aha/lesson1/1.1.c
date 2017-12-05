#include <stdio.h>
int main() 
{
  int a[11], i, j, t;
  // 初始化， n+1桶
  for(i = 0; i <= 10; i++) 
    a[i] = 0;
  
  // book a  下标数有几个
  
  for(i = 1; i <= 5; i++) {
    // 等待输入 &t 将输入的值， 放到t变量的地址
    scanf("%d", &t);
    // 数量加一
    a[t]++;
  }

  for(i = 0; i < 10; i++) {
    for (j = 1; j <= a[i]; j++) {
      printf("%d ", i);
    }
  }
  // 停下来
  getchar(); getchar();
  return 0;
}