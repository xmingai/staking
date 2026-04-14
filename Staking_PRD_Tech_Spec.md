# DGAI Staking 产品技术与架构文档 (基于 BSC 链)

## 1. 产品概述
构建在 Binance Smart Chain (BSC) 上的去中心化委托质押（Delegated Staking）系统。允许社区领袖创建验证节点（Node），吸引散户委托质押（Delegation）。协议提供统一基础年化收益，节点主通过设定抽成比例获取裂变收益。

---

## 2. 核心用户故事 (User Stories)

### 2.1 节点管理 (Pool Owner)
- **创建节点**：用户质押最低额度（如 10,000 DGAI）创建专属节点，生成专属节点邀请链接。
- **配置抽成比例**：节点主可设定 `0% - 20%` 的散户收益抽成比例（Commission Rate）。
- **管理节点**：节点主可在 Dashboard 查看节点总 TVL、散户人数、历史手续费收益，并随时调整抽成比例（为保护散户，调高比例应存在延迟生效机制）。
- **节点注销**：节点主申请关闭节点，进入 7 天冷却期，期间散户资产自动解除委托。

### 2.2 委托质押 (Delegator)
- **选择节点**：浏览节点大厅，按 TVL、抽成比例、历史收益率过滤并选择心仪的节点。
- **质押资产**：存入 DGAI，并**选择锁定期**（30天/90天/180天/365天），获取对应的时间权重乘数（1.0x - 2.0x）。
- **领取收益**：实时查看累计收益，支持随时 `Claim`（提取）收益到钱包，或选择 `Restake`（复投）。
- **解除质押**：锁定期满后可申请解锁，进入 **7天不可见的冷却期**（防止流动性闪崩），冷却结束后可将本金 `Withdraw` 回钱包。

---

## 3. 数值与收益模型
- **基础年化 (Base APY)**：协议设置系统级释放率，理论锚定 12%（依实际通胀曲线计算）。
- **时间乘数 (ve-Model)**：收益率 = 基础 APY × 锁定乘数。
    - 30天 = 1x | 90天 = 1.3x | 180天 = 1.5x | 365天 = 2x
- **收益切分公式 (单币维度)**：
    - 散户实收 = 散户理论生成总奖励 × (1 - 节点抽成率)
    - 节点主附加收益 = $\sum$ (该节点所有散户理论生成总奖励 × 节点抽成率)
- **国库抽成 (Treasury Tax)**：提取收益时，协议扣除 1%~3% 手续费注入国库销毁或维稳。

---

## 4. 技术架构规格 (Technical Specification)

### 4.1 前端架构与 UI/UX 设计语言 (Frontend & Design System)

**核心前端堆栈**
- **框架**: Next.js (App Router), React 18, TypeScript。
- **组件原子库**: **shadcn/ui** + Radix UI，放弃第三方臃肿组件，完全掌控 DOM 结构。
- **样式引擎**: Tailwind CSS，高度依赖自定义 Design Tokens（如 `bg-muted/10`, `border-border/40`）。
- **Web3 通讯**: `wagmi v2` + `viem` 用于合约读写，`Web3Modal` 用于现代化的钱包登录。

**UI 设计美学：Uniswap 卡片化交互与 dgrid.ai 色彩空间**
Staking 仪表盘将追求**极简、轻快、高度原生**的 Web3 顶级交互体验，放弃死板的仪表板网格，采用：
1. **Uniswap 经典卡片流 (Card-Based UI)**：
   - 全局界面以中心化的高端卡片架构呈现，大量使用大圆角（`rounded-3xl` 或 `rounded-2xl`）。
   - 移除冷硬的 1px 分割线，改用具有呼吸感的悬浮态与微弱弥散阴影（Soft Shadows）。交互保持极致流畅。
2. **极简主义排版**：
   - 大字号的流动性核心数据（TVL、APY）展示，排布干净透气。
   - 保留一定量的无衬线字体，但告别极端密集的 `text-[10px]` 控制台布局，转而提供对散户绝对友好的易读性。
3. **色彩空间 (Color Palette: DGrid 霓虹系)**：
   - **Primary Action (主行动点/高亮)**：采用高饱和度的**荧光青柠绿 (Neon Lime, 参考 Hex: `#BFFF00` / `#C6FF00`)**。用于主按钮（如 Stake/Claim）、核心数据高亮。
   - **Dark Mode (暗黑基调)**：背景深邃极致（参考 Hex: `#0D0E10` 或 `#121415`）。面板层采用极简纯黑叠加微弱绿色泛光，辅助文字使用无衬线浅灰。
   - **Light Mode (明亮基调)**：背景纯白（`#FFFFFF`），数据容器与输入框使用高对比度极浅灰（参考 Hex: `#F5F6F7`），保持与青柠绿的极净对比感。
4. **基于 Shadcn 的二次发育**：对基础的 Dialog、Slider、Popover 组件圆角与背光框作高度软化调整以融入 Uniswap 级别的亲和力。

### 4.2 智能合约技术栈
- **核心框架**: Solidity, Hardhat/Foundry。
- **基础设施**: OpenZeppelin (ERC20, SafeERC20, ReentrancyGuard, Ownable)。
- **区块链网络**: BNB Smart Chain (BSC)。
- **数据索引**: TheGraph (Subgraph) 抓取 TVL 历史与散户个人收益瀑布流。

### 4.3 核心合约架构

系统将被拆分为 3 核心合约以降低耦合度：
1. `DGAINodeRegistry.sol`：节点名册合约，管理 Node 创建、验证节点主质押、维护各节点的分成费率（Commission）。
2. `DGAIStakingPool.sol`：核心质押逻辑合约，承载 TVL 资金池，管理散户 Stake、Unstake 和 7天冷却期（Cooling Queue）。
3. `DGAIRewardController.sol`：奖励分发合约，根据区块高度/时间戳计算通胀释放，计算时间乘数，执行收益切分和 Claim/Restake 逻辑。

### 4.3 核心数据结构 (Solidity Structs)

```solidity
// 节点信息
struct NodeInfo {
    address owner;             // 节点主地址
    uint256 ownerStakedAmount; // 节点主自质押量
    uint256 totalDelegated;    // 散户委托总 TVL
    uint16 commissionRate;     // 佣金率，基数 10000（2000 = 20%）
    bool isActive;             // 节点是否活跃
}

// 质押白条信息
struct StakeInfo {
    address nodeAddress;       // 绑定的节点地址
    uint256 amount;            // 真实质押数量
    uint256 weightMultiplier;  // 时间权重乘数 (基数 100，如 150 = 1.5x)
    uint256 lockEndTime;       // 锁仓解锁时间戳
    uint256 rewardDebt;        // 奖励债务 (用于数学公式追踪)
}

// 冷却队列
struct UnstakeRequest {
    uint256 amount;
    uint256 availableAt;       // 当下时间 + 7天
}
```

### 4.4 核心接口与函数定义 (ABI Preview)

**NodeRegistry / 节点管理**
*   `createNode(uint16 _commission)`: 创建节点，需带入 `msg.value` 或已授权的 DGAI。
*   `updateCommission(uint16 _newCommission)`: 更新佣金。应具备 `timelock`，比如 3 天后生效，防止恶意突袭。

**StakingPool / 质押系统**
*   `stake(address _node, uint256 _amount, uint8 _lockDurationType)`: 用户选择长期锁仓并质押，记录 `StakeInfo`。
*   `requestUnstake()`: 将到期的质押转换为 `UnstakeRequest`，进入 7 天冻结。
*   `withdrawUnstaked()`: 经过 7 天冷却后，提现资金到钱包。

**RewardController / 奖励控制**
*   `claimRewards()`: 散户领取自己的代币，内部自动计算切分（80% 汇入自己，20% 记账给 NodeOwner，扣除1%至国库）。
*   `claimOwnerRewards()`: 节点主一口气领取下属所有散户贡献的分润。

---

## 5. 安全与审计考量

1. **防恶意调息机制 (Anti-Griefing)**
   如果节点主中途将分润率从 5% 突然调至 20%，损害散户利益。
   *解决方案*：调整抽成比例需 3~7 天冷静期。这期间质押期限未满的散户可以通过紧急逃生舱 (Emergency Bypass，扣除违约金) 退出，或等待。
2. **通胀与数学精度缺陷 (Precision Loss & Reward Drain)**
   每次更新权重、加仓、减仓必须先调用 `updatePool` 分发奖励，奖励采用 `rewardPerToken` 累加器算法防重入（类似 SushiSwap MasterChef 模型）。
3. **资金安全**
   所有提款、Claim 操作必须遵循 `Checks-Effects-Interactions` 模式。关键函数引入 `nonReentrant` 保护。

---

## 6. 前端开发计划

### Phase 1 — 基座搭建 (Day 1)
- 初始化 Next.js (App Router) + TypeScript + Tailwind CSS 项目
- 安装 shadcn/ui 组件库，配置 DGrid 色彩主题 (Neon Lime + Dark/Light)
- 配置 wagmi v2 + viem + Web3Modal（钱包连接）
- 全局布局：TopBar（Logo + 导航 + Connect Wallet 按钮）

### Phase 2 — 核心页面 UI (Day 2-3)
- **节点大厅页 `/nodes`**：节点列表（TVL、佣金率、Delegators 数、APY）+ 排序筛选
- **质押操作页 `/stake/[nodeId]`**：Uniswap 风格居中操作卡片（输入金额 → 选择锁定期 → 确认质押）
- **我的仪表盘 `/dashboard`**：个人质押总览（总资产、累计收益、活跃质押列表、冷却中的提款）

### Phase 3 — 节点主管理面板 (Day 4)
- **创建节点 `/nodes/create`**：输入自质押量、设定佣金率、预览收益模型
- **节点管理 `/nodes/manage`**：TVL 趋势图、散户列表、调整佣金率（带 Timelock 提示）、Claim 分润

### Phase 4 — 交互打磨与 Mock 数据 (Day 5)
- 全局 Mock 数据层（模拟合约返回），确保所有页面可独立运行演示
- 微动画：卡片 Hover、数字滚动、Toast 通知、加载骨架屏
- Dark / Light 双模式完整适配
- 响应式布局（Desktop + Mobile）

