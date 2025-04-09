import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <div className="flex flex-col gap-6 px-4 text-center">
        <h1 className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white font-sans">
          cracked ui components
        </h1>
        <h3 className="font-mono text-xl sm:text-3xl font-medium">
          coming soon...
        </h3>
      </div>

      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
}
