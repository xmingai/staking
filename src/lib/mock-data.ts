// Mock data layer simulating smart contract responses
// All pages can run independently without a blockchain connection

export interface NodeInfo {
  id: string;
  name: string;
  owner: string;
  ownerStaked: number;
  totalDelegated: number;
  delegatorCount: number;
  dgridCount: number; // Hardware devices count
  commissionRate: number; // percentage, e.g. 15 = 15%
  baseAPY: number;
  isActive: boolean;
  createdAt: string;
}

export interface StakePosition {
  id: string;
  nodeId: string;
  nodeName: string;
  amount: number;
  lockDuration: number; // days
  multiplier: number;
  effectiveAPY: number;
  earned: number;
  lockEndDate: string;
  status: "active" | "cooling" | "claimable" | "inactive";
}

export interface DashboardStats {
  totalStaked: number;
  totalEarned: number;
  activePositions: number;
  avgAPY: number;
}

// ─── Mock Nodes ─────────────────────────────────────
export const MOCK_NODES: NodeInfo[] = [
  {
    id: "node-001",
    name: "DGrid Genesis",
    owner: "0xA0C1...a875",
    ownerStaked: 500000,
    totalDelegated: 4250000,
    delegatorCount: 342,
    dgridCount: 1542000,
    commissionRate: 10,
    baseAPY: 12,
    isActive: true,
    createdAt: "2026-01-15",
  },
  {
    id: "node-002",
    name: "Neon Validators",
    owner: "0x3F24...e912",
    ownerStaked: 750000,
    totalDelegated: 8120000,
    delegatorCount: 891,
    dgridCount: 4215000,
    commissionRate: 8,
    baseAPY: 12,
    isActive: true,
    createdAt: "2026-02-03",
  },
  {
    id: "node-003",
    name: "BSC Pioneers",
    owner: "0x7B8A...c301",
    ownerStaked: 500000,
    totalDelegated: 2350000,
    delegatorCount: 178,
    dgridCount: 852000,
    commissionRate: 15,
    baseAPY: 12,
    isActive: true,
    createdAt: "2026-03-10",
  },
  {
    id: "node-004",
    name: "CryptoDAO Hub",
    owner: "0xD5E6...f442",
    ownerStaked: 1000000,
    totalDelegated: 12500000,
    delegatorCount: 1547,
    dgridCount: 8530000,
    commissionRate: 5,
    baseAPY: 12,
    isActive: true,
    createdAt: "2025-12-20",
  },
  {
    id: "node-005",
    name: "Lime Capital",
    owner: "0x9A2B...d789",
    ownerStaked: 600000,
    totalDelegated: 3800000,
    delegatorCount: 263,
    dgridCount: 1280000,
    commissionRate: 12,
    baseAPY: 12,
    isActive: true,
    createdAt: "2026-03-25",
  },
  {
    id: "node-006",
    name: "Alpha Stake",
    owner: "0x1C3D...b456",
    ownerStaked: 500000,
    totalDelegated: 1950000,
    delegatorCount: 124,
    dgridCount: 520000,
    commissionRate: 20,
    baseAPY: 12,
    isActive: true,
    createdAt: "2026-04-01",
  },
];

// ─── Mock User Dashboard ────────────────────────────
export const MOCK_POSITIONS: StakePosition[] = [
  {
    id: "pos-001",
    nodeId: "node-002",
    nodeName: "Neon Validators",
    amount: 50000,
    lockDuration: 180,
    multiplier: 1.5,
    effectiveAPY: 14.4, // 12 * 1.5 * 0.92 (8% commission)
    earned: 3240,
    lockEndDate: "2026-08-14",
    status: "active",
  },
  {
    id: "pos-002",
    nodeId: "node-004",
    nodeName: "CryptoDAO Hub",
    amount: 25000,
    lockDuration: 365,
    multiplier: 2.0,
    effectiveAPY: 22.8, // 12 * 2.0 * 0.95
    earned: 1425,
    lockEndDate: "2027-04-14",
    status: "active",
  },
  {
    id: "pos-003",
    nodeId: "node-001",
    nodeName: "DGrid Genesis",
    amount: 10000,
    lockDuration: 30,
    multiplier: 1.0,
    effectiveAPY: 10.8, // 12 * 1.0 * 0.9
    earned: 890,
    lockEndDate: "2026-04-20",
    status: "cooling",
  },
  {
    id: "pos-004",
    nodeId: "node-003",
    nodeName: "BSC Pioneers",
    amount: 0,
    lockDuration: 0,
    multiplier: 1.0,
    effectiveAPY: 10.2, // 12 * 1.0 * 0.85
    earned: 0,
    lockEndDate: "2026-01-20",
    status: "inactive",
  },
];

export const MOCK_DASHBOARD: DashboardStats = {
  totalStaked: 85000,
  totalEarned: 5555,
  activePositions: 3,
  avgAPY: 16.0,
};

// ─── Helpers ────────────────────────────────────────
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

export function shortenAddress(addr: string): string {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export const LOCK_OPTIONS = [
  { days: 30, label: "30 Days", multiplier: 1.0 },
  { days: 90, label: "90 Days", multiplier: 1.3 },
  { days: 180, label: "180 Days", multiplier: 1.5 },
  { days: 365, label: "1 Year", multiplier: 2.0 },
] as const;
