import React from 'react';

export const AnimalCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#D8CEBE]/70 animate-pulse flex flex-col h-[460px]">
      <div className="w-full h-64 bg-[#EAE4D7]" />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-3">
            <div className="h-6 w-32 bg-[#EAE4D7] rounded-md" />
            <div className="h-5 w-20 bg-[#EAE4D7] rounded-full" />
          </div>
          <div className="h-4 w-44 bg-[#EAE4D7] rounded mb-3" />
          <div className="h-3 w-full bg-[#EAE4D7] rounded mb-2" />
          <div className="h-3 w-3/4 bg-[#EAE4D7] rounded" />
        </div>
        <div className="pt-4 border-t border-[#EAE4D7] flex justify-between items-center">
          <div className="h-4 w-28 bg-[#EAE4D7] rounded" />
          <div className="h-8 w-24 bg-[#EAE4D7] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const StoryCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#D8CEBE]/70 animate-pulse flex flex-col h-[400px]">
      <div className="w-full h-52 bg-[#EAE4D7]" />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-4 w-24 bg-[#EAE4D7] rounded-full mb-3" />
          <div className="h-6 w-full bg-[#EAE4D7] rounded mb-2" />
          <div className="h-3 w-4/5 bg-[#EAE4D7] rounded" />
        </div>
        <div className="h-4 w-32 bg-[#EAE4D7] rounded" />
      </div>
    </div>
  );
};
