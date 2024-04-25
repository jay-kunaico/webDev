import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import Quiz from '~/components/quiz';

export const useQuestionData = routeLoader$(async () => {
  const res = await fetch('http://localhost:3000/questions');

  const data = await res.json();

  return data;
});

export default component$(() => {
  return (
    <>
      <Quiz />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik TypeScript Quiz',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
