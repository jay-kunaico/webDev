import React, { useState } from 'react';
import { buttonVariants } from './ui/button';

// type LocationFormProps = {
//   setLocation: React.Dispatch<React.SetStateAction<string>>;
//   setEndPoint: React.Dispatch<React.SetStateAction<string>>;
// };
interface IWeatherFormProps {
  setLocation: string;
  setEndPoint: string;
  setDate: string;
  setDays: string;
}

const LocationForm: React.FunctionComponent<IWeatherProps> = ({
  setLocation,
  setEndPoint = 'current.json',
  setDate,
  setDays,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDays, setShowDays] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLocation(inputValue);
    // setInputValue('');
    console.log('handleSubmit inputValue ', inputValue);
    // setShowCalendar(false);
    // setShowDays(false);
  };

  const handleEndPoint = (event) => {
    const buttonText = event.target.textContent.toLowerCase();
    setEndPoint(buttonText + '.json');
    handleSubmit(event);
  };

  const handleFutureClick = () => {
    setShowDays(false);
    setEndPoint('future.json');
    setShowCalendar(!showCalendar);
  };

  const handleForecastClick = () => {
    setDate = '';
    setShowCalendar(false);
    setEndPoint('forecast.json');
    setShowDays(!showDays);
  };
  const handleDateChange = (numericDate) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0'); // Pad the month with leading zero
    const formattedDay = String(numericDate).padStart(2, '0'); // Pad the day with leading zero
    const formattedDate = `${currentYear}-${currentMonth}-${formattedDay}`;
    setDate(formattedDate);
    setEndPoint('future.json');
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setDays(selectedValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center mx-auto rounded-md border-2 border-purple-600 bg-white p-4 text-purple-950 shadow-md"
    >
      <div className="space-y-1 px-4 py-2 w-full max-w-md">
        <label htmlFor="input" className="block text-sm font-semibold">
          Input Location
        </label>
        <input
          id="input"
          placeholder="Input Location"
          className="placeholder-blue-300 placeholder-shown:bg-purple-100 rounded-md border-2 border-purple-600 px-2 py-1 caret-blue-400 disabled:bg-purple-100 w-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="mt-4 w-full max-w-md">
        <nav className="flex justify-center gap-2">
          <div className={buttonVariants()}>
            <button onClick={handleEndPoint}>Current</button>
          </div>
          <div className={buttonVariants()}>
            <button type="submit" onClick={handleForecastClick}>
              Forecast
            </button>
          </div>
          <div className={buttonVariants()}>
            <button onClick={handleFutureClick}>Future</button>
          </div>
        </nav>

        {showCalendar && (
          <div className="max-w-md mt-4 w-full">
            <input
              type="number"
              placeholder="Enter a date (2 digits day)"
              className="placeholder-blue-300 placeholder-shown:bg-purple-100 rounded-md border-2 border-purple-600 px-2 py-1 caret-blue-400 disabled:bg-purple-100 w-full"
              // value={dateValue}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>
        )}

        {showDays && (
          <div className="max-w-md mt-4 w-full">
            <select onChange={handleSelectChange}>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </form>
  );
};
export default LocationForm;
