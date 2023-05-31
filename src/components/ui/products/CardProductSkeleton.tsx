import React from "react";

export const CardProductSkeleton = () => {
  return (
    <div className="flex h-[270px] w-full flex-col ">
      <div className="h-3/4 w-full animate-pulse rounded-sm bg-gray-300" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-2 w-10  animate-pulse rounded-sm bg-gray-300" />
        <div className="h-2 w-6  animate-pulse rounded-sm bg-gray-300" />
      </div>
    </div>
  );
};
