import TokenSelector from "@/components/token-selector";
import { env } from "@/env";

export default function Home() {
  console.log("[env] = ", { duneApiKey: env.NEXT_PUBLIC_DUNE_API_KEY });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <TokenSelector />
      </main>
    </div>
  );
}
