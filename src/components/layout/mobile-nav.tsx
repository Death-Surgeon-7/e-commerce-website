"use client";

import React from "react";
import Link from "next/link";
import { Menu, Shirt } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  navLinks: { href: string; label: string }[];
}

export function MobileNav({ navLinks }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
                <Shirt className="h-6 w-6" />
                <span className="font-bold">FashionVerse</span>
            </Link>
        </div>
        <SheetContent side="left" className="w-[300px]">
          <SheetHeader>
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setOpen(false)}
            >
              <Shirt className="h-6 w-6" />
              <span className="text-lg font-bold">FashionVerse</span>
            </Link>
          </SheetHeader>
          <div className="mt-8 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
