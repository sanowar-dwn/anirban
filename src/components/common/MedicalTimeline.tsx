import React from 'react';
import { MedicalTimelineEvent } from '../../types';
import { CheckCircle2, Clock, MapPin } from 'lucide-react';

interface MedicalTimelineProps {
  events: MedicalTimelineEvent[];
  animalName: string;
}

export const MedicalTimeline: React.FC<MedicalTimelineProps> = ({ events, animalName }) => {
  return (
    <div className="relative border-l-2 border-[#B0DECB] ml-3 sm:ml-6 my-6 space-y-6 sm:space-y-8">
      {events.map((event, idx) => (
        <div key={idx} className="relative pl-6 sm:pl-8 group">
          {/* Indicator Dot mathematically centered on the left border */}
          <div className={`absolute -left-[13px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
            event.completed
              ? 'bg-[#1A382B] border-[#1A382B] text-white shadow-xs'
              : 'bg-[#FAF8F5] border-[#B0DECB] text-[#75837B]'
          }`}>
            {event.completed ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F2B73B]" />
            ) : (
              <Clock className="w-3.5 h-3.5 text-[#75837B]" />
            )}
          </div>

          {/* Event Content Card */}
          <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#D8CEBE]/80 shadow-xs hover:border-[#1A382B]/40 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C65332] bg-[#FDF5F2] px-2.5 py-0.5 rounded-full border border-[#FACFC2]">
                {event.step}
              </span>
              <span className="text-[11px] sm:text-xs text-[#75837B] font-medium">{event.date}</span>
            </div>

            <h4 className="font-serif text-base sm:text-lg font-bold text-[#1E2421] mb-1">
              {event.title}
            </h4>

            <p className="text-xs sm:text-sm text-[#59655E] leading-relaxed mb-2 font-normal">
              {event.description}
            </p>

            {event.location && (
              <p className="text-[11px] text-[#75837B] flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3 text-[#1A382B] shrink-0" />
                <span className="truncate">{event.location}</span>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
