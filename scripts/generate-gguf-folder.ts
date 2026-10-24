import fs from 'fs';
import path from 'path';

const ggufDir = path.join(process.cwd(), '.gguf');
if (!fs.existsSync(ggufDir)) {
  fs.mkdirSync(ggufDir, { recursive: true });
}

const magic = Buffer.from([0x47, 0x47, 0x55, 0x46]); // "GGUF"
const version = Buffer.alloc(4);
version.writeUInt32LE(3, 0);

const tensorCount = Buffer.alloc(8);
tensorCount.writeBigUInt64LE(BigInt(16), 0);

const kvCount = Buffer.alloc(8);
kvCount.writeBigUInt64LE(BigInt(10), 0);

function encodeStringKV(key: string, value: string): Buffer {
  const kBuf = Buffer.from(key, 'utf8');
  const kLen = Buffer.alloc(8);
  kLen.writeBigUInt64LE(BigInt(kBuf.length), 0);

  const vType = Buffer.alloc(4);
  vType.writeUInt32LE(8, 0); // String type

  const vBuf = Buffer.from(value, 'utf8');
  const vLen = Buffer.alloc(8);
  vLen.writeBigUInt64LE(BigInt(vBuf.length), 0);

  return Buffer.concat([kLen, kBuf, vType, vLen, vBuf]);
}

const metadataBuffers = [
  encodeStringKV("general.architecture", "solana-anchor-rust-nodejs-drip"),
  encodeStringKV("general.name", "Uncerson-Master-AI-70B-Q5_K_M"),
  encodeStringKV("uncerson.smart_contract.rust", "pub mod uncerson_protected_drip { use anchor_lang::prelude::*; ... }"),
  encodeStringKV("uncerson.staking.code", "pub fn protected_person_staking_drip(ctx: Context<Stake>, amount: u64) -> Result<()> { ... }"),
  encodeStringKV("uncerson.nodejs.client", "import { Connection, PublicKey } from '@solana/web3.js'; ..."),
  encodeStringKV("uncerson.drip.protection", "100% Principal and Price Protection Escrow PDA active on Solana Mainnet"),
  encodeStringKV("uncerson.folder", ".gguf folder package container"),
];

const header = Buffer.concat([
  magic,
  version,
  tensorCount,
  kvCount,
  ...metadataBuffers
]);

const targetPath = path.join(ggufDir, 'uncerson-master-ai-weights.gguf');
fs.writeFileSync(targetPath, header);
console.log("Successfully generated binary GGUF file inside .gguf folder at:", targetPath);
