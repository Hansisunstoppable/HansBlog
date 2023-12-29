 链接：[登录—专业IT笔试面试备考平台_牛客网](https://ac.nowcoder.com/acm/contest/24872/I)
 来源：牛客网
 

## 题目描述

Alice enjoys playing a card game called Steadily Growing Steam (as known as SGS).
 
 In this game, each player will play different roles and have different skills. Players get cards from the deck and use them to play the game. Each card has a numeric label tit_iti​, the point number. In addition, each card has a value viv_ivi​.
 
 Now Alice is playing this game with Bob. According to the skill of Alice's role, she can have Bob display nnn cards from the top of the deck. After that, Bob must choose some cards from the nnn cards and split the chosen cards into two sets that the sum of the cards' point numbers in the two sets are equal. In other words, if one of the sets is SSS and another is TTT , S∩T=∅S\cap T=\emptysetS∩T=∅ and ∑i∈Sti=∑j∈Ttj\sum_{i\in S} t_i=\sum _{j\in T}t_j∑i∈S​ti​=∑j∈T​tj​ (Note that S∪T={1,2,⋯n}S\cup T = \{1,2,\cdots n\}S∪T={1,2,⋯n} is not necessary). Then, Alice gets all of the cards in set SSS and Bob gets the cards in set TTT.
 
 However, according to the skill of Bob's role, before choosing the two sets, he can choose at most kkk different cards and double their point numbers. In other words, he can choose a sequence {a1,a2,⋯ ,ar}, (1≤a1<a2<⋯<ar≤n, 0≤r≤k)\{a_1,a_2,\cdots,a_r\},\,(1\le a_1<a_2<\cdots <a_r\le n,\, 0\le r\le k){a1​,a2​,⋯,ar​},(1≤a1​<a2​<⋯<ar​≤n,0≤r≤k) and for each i (1≤i≤r)i\,(1\le i \le r)i(1≤i≤r) , change tait_{a_i}tai​​ into 2tai2t_{a_i}2tai​​. After that he can continue choosing the two sets.
 
 Alice and Bob are partners in this game. Now given the nnn cards from the deck, they want to know the maximum possible sum of the values of the cards they finally get. In other words, determine the maximum ∑i∈S∪Tvi\sum_{i\in S \cup T}v_i∑i∈S∪T​vi​ among all valid schemes(choose cards to double their point numbers, then choose cards and split them into two sets S,TS,TS,T of the same point number sum) and output it.

## 输入描述:

```
The first line contains two integers n (1≤n≤100)n\,(1\le n \le 100)n(1≤n≤100) and k (0≤k≤n)k\,(0\le k \le n)k(0≤k≤n), denoting the number of the displayed cards and the maximum number of cards that Bob can choose to double their point numbers, respectively.

The i+1i+1i+1 line contains two integers vi (∣vi∣≤109)v_i\,(|v_i|\le 10^9)vi(∣vi∣≤109) and ti (1≤ti≤13)t_i\,(1\le t_i \le 13)ti(1≤ti≤13), denoting the value and the point number of the iii-th card, respectively.
```

## 输出描述:

```
Output one line containing one integer, denoting the maximum sum of the value of the cards that Alice or Bob can get.
```

示例1

## 输入

```
4 1
10 1
-5 3
5 1
6 1
```

## 输出

21

## 说明

```
One possible scheme:

Double t1t_1t1 and choose that S={1},T={3,4}S=\{1\},T=\{3,4\}S={1},T={3,4}, where the point number sum are both 2, and the sum of the card values is 10+5+6=2110+5+6=2110+5+6=21.
```

大概题意：给定n张牌，每张牌有一个ti与一个si。你至多可选m张牌，将其ti翻倍。在翻倍结束后，从n张牌中找出若干数量的牌，将其分为两组，两组的ti之和相等。求出此时的最大的si之和。



简易题解：可看作01背包问题，使用动态规划，详细看代码。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
 
const int N = 110, M = 6010;
 
int n, m;
int v[N], t[N];
int f[2][N][M]; 
//数组定义：从前i张牌中，至多使用j次技能，两组牌的ti之和的差+2600 为 k 
//k之所以定义为差+2600，是因为差最小为-2600，防止数组下标为负数，加一个偏移量
 
signed main() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        cin >> v[i] >> t[i];
    }
    //将所有初始值初始化为-INF
    //因为存在这样的方案：必须选入v[i]<0的牌才能凑成两组牌t[i]之和相等并且此时s[i]之和取得最大值
    //若初始化为0，v[i]<0的牌永远不会被选入，所以需要初始化为-INF
    for (int i=0;i<=m;i++)
        for (int j=0;j<=5200;j++)
            f[0][i][j]=-21474836470000*(j!=2600); //f[i][j][0]初始化为0，此时两组都不选任何牌，答案为0 

    //因为只用到i与i-1，所以可以用滚动数组优化空间
    for (int i = 1; i <= n; i++)
    {
        for (int j = 0; j <= m; j++)
        {
            for (int k = 0; k <= 5200; k++)
            {
                int &x = f[i&1][j][k]; 
                x = f[i&1^1][j][k]; //不选第i张牌
                if(k-t[i]>=0)       //选第i张牌，放在和更小的那组
                    x = max(x, f[i&1^1][j][k-t[i]]+v[i]);
                if(k+t[i]<=5200)    //选第i张牌，放在和更大的那组
                     x = max(x, f[i&1^1][j][k+t[i]]+v[i]);
                if (j)
                {
                    if(k-2*t[i]>=0)  //选第i张牌，使用一次技能，放在和更小的那组
                        x = max(x, f[i&1^1][j - 1][k - 2 * t[i]] + v[i]);
                     if(k+2*t[i]<=5200)//选第i张牌，使用一次技能，放在和更大的那组
                        x = max(x, f[i&1^1][j-1][k+2*t[i]]+v[i]);
                }
            }
        }  
    }
    
    cout << f[n&1][m][2600] << endl;
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

