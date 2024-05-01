import React, { useState } from 'react';
import { buttonVariants } from './ui/button';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

// type LocationFormProps = {
//   setLocation: React.Dispatch<React.SetStateAction<string>>;
//   setEndPoint: React.Dispatch<React.SetStateAction<string>>;
// };
interface IWeatherFormProps {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setEndPoint: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setDays: React.Dispatch<React.SetStateAction<string>>;
}

const LocationForm: React.FunctionComponent<IWeatherFormProps> = ({
  setLocation,
  setEndPoint,
  setDate,
  setDays,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDays, setShowDays] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  // submit the form
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLocation(inputValue);
    // setInputValue('');
  };

  // set the endPoint based on button text and hide the widgets
  // call submit
  const handleEndPoint = (event: {
    target?: any;
    preventDefault?: () => void;
  }) => {
    const buttonText = event.target.textContent.toLowerCase();
    setEndPoint(buttonText + '.json');
    setShowCalendar(false);
    setShowDays(false);
    handleSubmit(event);
  };

  // when the Future button is clicked hide the days dropdown
  // set the end point and toggle the calendar display
  const handleFutureClick = () => {
    setShowDays(false);
    setEndPoint('future.json');
    setShowCalendar(!showCalendar);
  };

  // When the Forecast button is clicked hide the calendar and toggle days dropdown
  // clear the date and set the endPoint and default the days to 1
  const handleForecastClick = () => {
    setDate('');
    setShowCalendar(false);
    setEndPoint('forecast.json');
    setShowDays(!showDays);
    setDays('1');
  };
  const handleDateChange = (calendarValue: { toISOString: () => string }) => {
    // const currentYear = new Date().getFullYear();
    // const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0'); // Pad the month with leading zero
    // const formattedDay = String(numericDate).padStart(2, '0'); // Pad the day with leading zero
    // const formattedDate = `${currentYear}-${currentMonth}-${formattedDay}`;
    const formattedDate = calendarValue.toISOString().substring(0, 10);
    setDate(formattedDate);
    setEndPoint('future.json');
  };

  // When the days dropdown value has been changed setDays to that value
  const handleSelectChange = (event: { target: { value: string } }) => {
    const selectedValue = event.target.value;
    setDays(selectedValue);
  };

  return (
    // Return a Form for collecting user input
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center mx-auto rounded-md border-2 border-purple-600 bg-white p-4 text-purple-950 shadow-md"
    >
      {/* Main input field  */}
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
        {/* React Calendar component for selecting future dates for weather information
from Hackerone.  This is conditioned on if showCalendar is true which is set when the Future button is clicked */}
        {showCalendar && (
          <div className="max-w-md mt-4 w-full">
            <DatePicker
              selected={startDate}
              // todayButton="bold"
              showIcon
              toggleCalendarOnIconClick
              showPopperArrow={false}
              shouldCloseOnSelect={false}
              dateFormat="yyy-MM-dd"
              minDate={addDays(new Date(), 14)}
              maxDate={addDays(new Date(), 300)}
              onChange={(date) => {
                handleDateChange(date);
                setStartDate(date);
              }}
              holidays={[
                { date: '202408-15', holidayName: "India's Independence Day" },
                { date: '2024-12-31', holidayName: "New Year's Eve" },
                { date: '2024-12-25', holidayName: 'Christmas' },
                { date: '2024-01-01', holidayName: "New Year's Day" },
                { date: '2024-11-23', holidayName: 'Thanksgiving Day' },
                { date: '2025-12-25', holidayName: 'Christmas' },
              ]}
            >
              <div style={{ color: 'red' }}>
                Don't forget to check the weather!
              </div>
            </DatePicker>
          </div>
        )}
        {/* The dropdow element for displaying 1 -10 days for weather forecaset information. It is conditioned on if showDays is true which is set when the Forecast button is clicked */}
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
