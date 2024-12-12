"use client";
import { MenuItem } from "@/lib/types";
import React, { useState } from "react";
import EditMenuItemCard from "./EditMenuItemCard";
import { JWTPayload } from "jose";
import { Input } from "./ui/input";
import { Search, X } from "lucide-react";

export default function EditMenuList({
  menuItems,
  session,
}: {
  menuItems: MenuItem[];
  session: JWTPayload;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="mb-6 relative">
        <Input
          type="text"
          placeholder="Search in menu"
          className="px-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        {searchTerm.length > 0 && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-400 hover:transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {searchTerm === ""
        ? menuItems?.map((menuItem) => (
            <EditMenuItemCard
              key={menuItem.id}
              item={menuItem}
              role={session.role}
            />
          ))
        : filteredMenuItems?.map((menuItem) => (
            <EditMenuItemCard
              key={menuItem.id}
              item={menuItem}
              role={session.role}
            />
          ))}
    </div>
  );
}
