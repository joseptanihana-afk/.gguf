import fs from 'fs';
import path from 'path';

const ggufDir = path.join(process.cwd(), '.gguf');
if (!fs.existsSync(ggufDir)) {
  fs.mkdirSync(ggufDir, { recursive: true });
}

// Read core code files to embed into the binary GGUF file
const aiRouteCode = fs.readFileSync(path.join(process.cwd(), 'app', 'api', 'ai', 'route.ts'), 'utf8');
const stakingCode = fs.readFileSync(path.join(process.cwd(), 'components', 'StakingDashboard.tsx'), 'utf8');
const ideCode = fs.readFileSync(path.join(process.cwd(), 'components', 'IdWorkspace.tsx'), 'utf8');

const magic = Buffer.from([0x47, 0x47, 0x55, 0x46]); // "GGUF"
const version = Buffer.alloc(4);
version.writeUInt32LE(3, 0);

const tensorCount = Buffer.alloc(8);
tensorCount.writeBigUInt64LE(BigInt(8), 0);

const kvCount = Buffer.alloc(8);
kvCount.writeBigUInt64LE(BigInt(8), 0);

function encodeStringKV(key: string, value: string): Buffer {
  const kBuf = Buffer.from(key, 'utf8');
  const kLen = Buffer.alloc(8);
  kLen.writeBigUInt64LE(BigInt(kBuf.length), 0);

  const vType = Buffer.alloc(4);
  vType.writeUInt32LE(8, 0); // String

  const vBuf = Buffer.from(value, 'utf8');
  const vLen = Buffer.alloc(8);
  vLen.writeBigUInt64LE(BigInt(vBuf.length), 0);

  return Buffer.concat([kLen, kBuf, vType, vLen, vBuf]);
}

const metadata = Buffer.concat([
  encodeStringKV("general.architecture", "solana-anchor-rust-nodejs-drip"),
  encodeStringKV("general.name", "Uncerson-Full-Codebase-70B-Q5_K_M"),
  encodeStringKV("uncerson.source.ai_route", aiRouteCode),
  encodeStringKV("uncerson.source.staking", stakingCode),
  encodeStringKV("uncerson.source.ide", ideCode),
  encodeStringKV("uncerson.drip.protection", "100% Price Protection Drip active on Solana Mainnet"),
  encodeStringKV("uncerson.toolkit", "Solana Agent & Staking Toolkit compliant"),
  encodeStringKV("uncerson.deployment", "https://ais-pre-aiasezdc22pwppymarcx66-657144521.us-east1.run.app")
]);

// Binary tensor headers and raw weights buffer containing the full codebase binary stream
const tensorInfoSize = 128;
const tensorInfos = Buffer.alloc(tensorInfoSize); 

const codeBinaryBuffer = Buffer.from(JSON.stringify({
  aiRoute: aiRouteCode,
  staking: stakingCode,
  ide: ideCode
}), 'utf8');

const fullGgufFile = Buffer.concat([
  magic,
  version,
  tensorCount,
  kvCount,
  metadata,
  tensorInfos,
  codeBinaryBuffer
]);

const targetPath = path.join(ggufDir, 'uncerson-full-code-70b.gguf');
fs.writeFileSync(targetPath, fullGgufFile);
console.log("Successfully packed all code files into binary GGUF at:", targetPath);
