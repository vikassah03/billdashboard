import { useState, useEffect } from 'react';
import "./design.css";

// Helper function to determine the greeting based on time
const getGreeting = (hour) => {
  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 17) return 'Good Afternoon';
  if (hour >= 17 && hour < 21) return 'Good Evening';
  return 'Good Night';
};

// Predefined list of festivals with dates
const festivals = {
  '01-01': 'Happy New Year!',
  '10-31': 'Happy Halloween!',
  '12-25': 'Merry Christmas!',
};

const GreetingsPage = () => {
  const [greeting, setGreeting] = useState('');
  const [festivalGreeting, setFestivalGreeting] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  // Function to update the time and greeting
  const updateGreeting = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDate = now.toLocaleDateString('en-GB', { month: '2-digit', day: '2-digit' }); // Format as MM-DD
    setGreeting(getGreeting(currentHour));
    setCurrentTime(now.toLocaleTimeString());

    // Check if today is a festival
    if (festivals[currentDate]) {
      setFestivalGreeting(festivals[currentDate]);
    } else {
      setFestivalGreeting(null);
    }
  };

  // Use useEffect to update greeting on component mount and every second
  useEffect(() => {
    updateGreeting(); // Initial greeting
    const interval = setInterval(updateGreeting, 1000); // Update time every second
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className=" flex flex-col justify-center items-center text-white">
      <h1 className="xl:text-3xl font-bold text-white">{greeting}!</h1>
      {festivalGreeting && (
        <p className="text-2xl mt-4 font-semibold text-orange-500">
          {festivalGreeting}
        </p>
      )}
      <p className="mt-2 xl:text-2xl font-bold text-white sm:pt-1 phone_time"> Time: {currentTime}</p>
    </div>
  );
};

export default GreetingsPage;
