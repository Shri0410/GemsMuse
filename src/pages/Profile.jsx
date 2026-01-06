import React from "react";
import { MOCK_BOOKINGS } from "../constants";

const Profile = () => {
  return (
    <div className="pt-40 pb-24 bg-white dark:bg-[#121212] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase block mb-3 animate-fade-in">
              Client Portal
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-text-main-light dark:text-text-main-dark">
              My Bookings
            </h2>
            <div className="w-16 h-0.5 bg-primary mt-6"></div>
          </div>
          <div className="flex items-center gap-8 border-b border-gray-100 dark:border-gray-800 pb-1 w-full md:w-auto overflow-x-auto no-scrollbar">
            <button className="text-sm font-serif text-primary border-b-2 border-primary pb-3 -mb-1.5 whitespace-nowrap px-2">
              All Requests
            </button>
            <button className="text-sm font-serif text-text-muted-light hover:text-primary transition-colors pb-3 px-2 whitespace-nowrap">
              Upcoming
            </button>
            <button className="text-sm font-serif text-text-muted-light hover:text-primary transition-colors pb-3 px-2 whitespace-nowrap">
              History
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {MOCK_BOOKINGS.map((booking) => (
            <div
              key={booking.id}
              className="group relative bg-background-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-8 rounded-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
              <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                <div className="flex items-center gap-6 lg:w-1/5">
                  <div className="flex flex-col items-center justify-center w-20 h-20 border border-primary/20 bg-white dark:bg-black/20 rounded-sm">
                    <span className="text-xs uppercase tracking-widest text-primary font-bold">
                      {booking.date.split(" ")[0]}
                    </span>
                    <span className="text-3xl font-serif">
                      {booking.date.split(" ")[1]}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm font-bold">
                      {booking.time}
                    </span>
                    <span className="block text-xs text-text-muted-light tracking-wide uppercase mt-1">
                      Scheduled
                    </span>
                  </div>
                </div>
                <div className="lg:w-2/5 flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-serif">{booking.type}</h3>
                    <span
                      className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold ${
                        booking.status === "Confirmed"
                          ? "bg-green-50 text-green-700 border-green-100"
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark font-light leading-relaxed">
                    {booking.description}
                  </p>
                </div>
                <div className="lg:w-1/3 flex flex-wrap gap-4 justify-start lg:justify-end w-full">
                  <button className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] hover:text-primary transition-colors py-2 px-4 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 rounded-sm">
                    <span className="material-symbols-outlined text-lg">
                      visibility
                    </span>
                    Details
                  </button>
                  <button className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] bg-primary text-white hover:bg-primary-hover transition-colors py-3 px-6 shadow-sm rounded-sm">
                    <span className="material-symbols-outlined text-lg">
                      edit_calendar
                    </span>
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
