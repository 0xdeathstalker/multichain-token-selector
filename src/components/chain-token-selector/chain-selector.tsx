"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CHAINS } from "@/constants/chains";
import { capitalize, cn, removeChar } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { ChainLogo } from "../chain-token-logo";
import { ChainSelection } from "./chain-selection";
import { ChainSelectorProps } from "./types";

const ChainSelector: React.FC<ChainSelectorProps> = ({
  allowedChains,
  selectedChainId,
  setSelectedChainId,
  className,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between text-xs", className)}
        >
          <div className="inline-flex items-center gap-2">
            {selectedChainId && (
              <>
                <ChainLogo chainId={selectedChainId} />
                {capitalize(removeChar(CHAINS[selectedChainId]))}
              </>
            )}
            {!selectedChainId && "Select chain..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-sm">Select a chain</DialogTitle>
        </DialogHeader>

        <ChainSelection
          allowedChains={allowedChains}
          selectedChainId={selectedChainId}
          setSelectedChainId={setSelectedChainId}
          setDialogOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChainSelector;
