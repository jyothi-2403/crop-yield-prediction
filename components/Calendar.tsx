import React, { useState } from 'react';
import type { CalendarEvent, TranslationKey } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface CalendarProps {
  events: CalendarEvent[];
  t: (key: TranslationKey) => string;
}

export const Calendar: React.FC<CalendarProps> = ({ events, t }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames: TranslationKey[] = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const dayNames: TranslationKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startingDay = firstDayOfMonth.getDay();

  const eventsByDate = events.reduce((acc, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  const changeMonth = (offset: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    setSelectedDate(null);
  };

  const handleDayClick = (day: number) => {
      const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(clickedDate);
  }

  const renderDays = () => {
    const days = [];
    // Padding for days before the start of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`pad-start-${i}`} className="text-center p-2"></div>);
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = !!eventsByDate[dateStr];
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      const isSelected = selectedDate?.toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

      days.push(
        <div key={day} className="text-center p-1">
          <button
            onClick={() => handleDayClick(day)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors
            ${isToday ? 'bg-green-200 text-green-800 font-bold' : ''}
            ${isSelected ? 'bg-green-500 text-white ring-2 ring-green-300' : 'hover:bg-gray-100'}
          `}>
            {day}
            {hasEvent && <span className="absolute mt-5 ml-5 w-2 h-2 bg-blue-500 rounded-full"></span>}
          </button>
        </div>
      );
    }
    return days;
  };
  
  const selectedDayEvents = selectedDate ? eventsByDate[`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`] || [] : [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <CalendarIcon className="w-6 h-6 mr-2 text-green-600" />
        {t('agriculturalCalendar')}
      </h3>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeftIcon className="w-5 h-5" /></button>
        <div className="font-semibold text-lg">{`${t(monthNames[currentDate.getMonth()])} ${currentDate.getFullYear()}`}</div>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronRightIcon className="w-5 h-5" /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 font-medium">
        {dayNames.map(day => <div key={day}>{t(day)}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2">{renderDays()}</div>
      
      {selectedDate && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-semibold text-gray-700">{selectedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
          <div className="mt-2 space-y-2 text-sm max-h-24 overflow-y-auto">
            {selectedDayEvents.length > 0 ? (
                selectedDayEvents.map((event, i) => (
                    <div key={i} className="p-2 bg-green-50 rounded-md">
                        <p className="font-bold text-green-800">{event.title}</p>
                        <p className="text-gray-600">{event.details}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">{t('noEvents')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
