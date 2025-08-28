import React from 'react';

const UnitToggle = ({ unit, setUnit }) => {
  return (
    <div className="flex justify-center my-2">
      <button
        onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
        className="bg-gray-200 dark:bg-gray-700 px-4 py-1 rounded"
      >
        {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
      </button>
    </div>
  );
};

export default UnitToggle;
