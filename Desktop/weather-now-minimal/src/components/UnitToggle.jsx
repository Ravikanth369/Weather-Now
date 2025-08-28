import React from 'react';

/**
 * UnitToggle: toggles between metric and imperial units.
 * - unit: 'metric' or 'imperial'
 * - setUnit: setter function
 */
const UnitToggle = ({ unit, setUnit }) => {
  const handleToggle = () => setUnit(unit === 'metric' ? 'imperial' : 'metric');

  return (
    <div className="flex items-center gap-3 mt-3" role="group" aria-label="Temperature units">
      <button
        onClick={handleToggle}
        className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition-transform focus:ring-2"
        aria-pressed={unit === 'metric'}
        title="Toggle °C / °F"
      >
        {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
      </button>
    </div>
  );
};

export default UnitToggle;
