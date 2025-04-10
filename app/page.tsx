import { SquaresBackground } from "@/components/ui/squares-background";
import { TextShimmer } from "@/components/ui/text-shimmer";

export default function Page() {
  return (
    <div className="w-screen h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-6 md:gap-10 px-4 text-center">
        <h1 className="bg-gradient-to-br from-white via-[#d4d4d4] to-[#626262] bg-clip-text text-transparent inline-block text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium font-sans">
          cracked components
        </h1>
        <TextShimmer
          duration={5}
          className="font-mono text-xl sm:text-3xl md:text-4xl font-medium"
        >
          coming soon...
        </TextShimmer>
      </div>

      <div className="absolute inset-0 -z-50 h-full">
        <SquaresBackground
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333"
          hoverFillColor="#222"
        />
      </div>
    </div>
  );
}
