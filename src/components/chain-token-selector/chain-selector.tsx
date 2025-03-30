"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CHAINS } from "@/constants/chains";
import { capitalize, cn, DESKTOP_MEDIA_QUERY, removeChar } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { ChainLogo } from "../chain-token-logo";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import React, { useEffect } from "react";
import {
  ChainListItemProps,
  ChainSelectionProps,
  ChainSelectorProps,
} from "./types";

const ChainSelector: React.FC<ChainSelectorProps> = ({
  allowedChains,
  selectedChainId,
  setSelectedChainId,
  className,
}) => {
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);

  const [open, setOpen] = useState<boolean>(false);

  if (isDesktop) {
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
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
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
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-sm">Select a chain</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <ChainSelection
            allowedChains={allowedChains}
            selectedChainId={selectedChainId}
            setSelectedChainId={setSelectedChainId}
            setDialogOpen={setOpen}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const ChainSelection: React.FC<ChainSelectionProps> = ({
  allowedChains,
  selectedChainId,
  setSelectedChainId,
  setDialogOpen,
}) => {
  useEffect(() => {
    if (selectedChainId) {
      // a small delay to ensure the dialog is fully rendered
      setTimeout(() => {
        const element = document.querySelector(
          `[data-chain-id="${selectedChainId}"]`
        );
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }, 100);
    }
  }, [selectedChainId]);

  return (
    <Command
      defaultValue="-" // to avoid default selected item
      className="min-h-[340px] max-h-[45svh] bg-transparent border"
    >
      <CommandInput placeholder="Search chain..." className="text-xs" />
      <CommandList>
        <CommandEmpty className="text-xs text-center py-3">
          No chain found.
        </CommandEmpty>

        <CommandGroup>
          {allowedChains.map((chainId) => (
            <ChainListItem
              key={chainId}
              chainId={chainId}
              selectedChainId={selectedChainId}
              setSelectedChainId={setSelectedChainId}
              setOpen={setDialogOpen}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

const ChainListItem: React.FC<ChainListItemProps> = ({
  chainId,
  selectedChainId,
  setSelectedChainId,
  setOpen,
}) => {
  return (
    <CommandItem
      key={chainId}
      value={`${CHAINS[chainId]}-${chainId}`}
      data-chain-id={chainId}
      onSelect={() => {
        setSelectedChainId(chainId);
        setOpen(false);
      }}
      className={cn(
        "text-xs border",
        selectedChainId?.toString() === chainId
          ? "border-border bg-secondary"
          : "border-transparent"
      )}
    >
      <ChainLogo chainId={chainId} />
      {capitalize(removeChar(CHAINS[chainId]))}
    </CommandItem>
  );
};

export default ChainSelector;
