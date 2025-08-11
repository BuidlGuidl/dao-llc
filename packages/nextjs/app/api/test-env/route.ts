import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Environment test",
    hasApiKey: !!process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
    apiKeyLength: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY?.length || 0,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes("ETHERSCAN")),
    nodeEnv: process.env.NODE_ENV,
  });
}
