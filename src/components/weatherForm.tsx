import React, { useState } from 'react';
import { buttonVariants } from './ui/button';

type LocationFormProps = {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};

function LocationForm({ setLocation }: LocationFormProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(inputValue);
    setInputValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mx-auto rounded-md border-2 border-purple-600 bg-white p-4 text-purple-950 shadow-md"
    >
      <div className="space-y-1 px-4 py-2 inset-y-0 left-0">
        <label htmlFor="input" className="block text-sm font-semibold">
          Input Location
        </label>
        <input
          id="input"
          placeholder="Input Location"
          className="placeholder-blue-300 placeholder-shown:bg-purple-100 rounded-md border-2 border-purple-600 px-2 py-1 caret-blue-400 disabled:bg-purple-100"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className={buttonVariants()}>
        <button>Submit</button>
      </div>
    </form>
  );
}
export default LocationForm;
