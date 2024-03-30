import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import AdoptedPetContext from './AdoptedPetContext';
import Details from './Details';
import SearchParams from './SearchParams';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  // return React.createElement('div', {}, [
  //   React.createElement('h1', {}, 'Adopt Me!'),
  //   React.createElement(Pet, {
  //     animal: 'Dog',
  //     name: 'Luna',
  //     breed: 'chihuahua',
  //   }),
  //   React.createElement(Pet, {
  //     animal: 'Cat',
  //     name: 'Boots',
  //     breed: 'siamese',
  //   }),
  //   React.createElement(Pet, { animal: 'horse', name: 'Ducky', breed: 'Gray' }),
  // ]);
  // rewrite in JSX
  // return (
  //   <div>
  //     <h1>Adopt Me!</h1>
  //     {/* <Pet name="Luna" animal="dog" breed="Havanese" />
  //     <Pet name="Pepper" animal="bird" breed="Cockatiel" />
  //     <Pet name="Doink" animal="cat" breed="Mix" /> */}
  //     {/* The beow is the updated way */}
  //     <SearchParams />
  //   </div>
  // );
  const adoptedPet = useState(null);
  return (
    <div>
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
