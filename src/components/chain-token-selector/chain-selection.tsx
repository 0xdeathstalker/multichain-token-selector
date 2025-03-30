"use client";

import { ChainLogo } from "@/components/chain-token-logo";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CHAINS } from "@/constants/chains";
import { capitalize, cn, removeChar } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  ChainListItemProps,
  ChainSelectionDrawerProps,
  ChainSelectionProps,
} from "./types";

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
      defaultValue="-"
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

const ChainSelectionDrawer: React.FC<ChainSelectionDrawerProps> = ({
  chainDrawerOpen,
  setChainDrawerOpen,
  selectedChainId,
  setSelectedChainId,
  allowedChains,
}) => {
  return (
    <Drawer open={chainDrawerOpen} onOpenChange={setChainDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={chainDrawerOpen}
          className="justify-between text-xs"
        >
          {selectedChainId ? (
            <ChainLogo chainId={selectedChainId} />
          ) : (
            "Select a chain..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Select a chain</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <Command
            defaultValue="-"
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
                    setOpen={setChainDrawerOpen}
                  />
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </DrawerContent>
    </Drawer>
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

export { ChainSelection, ChainSelectionDrawer };
