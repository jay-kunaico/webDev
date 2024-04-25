import { component$ } from '@builder.io/qwik';
import { useQuestionData } from '~/routes';

export default component$(() => {
  const questions = useQuestionData();
  return (
    <div class="m-25">
      <div
        class="max-w-md mx-auto bg-white p-8 
				rounded-md shadow-md"
        style="border: 1px solid black;"
      >
        <h1
          class="text-3xl font-bold mb-6 
				text-green-400 text-center 
				text-success"
        >
          Qwik TypeScript Quiz
        </h1>
        <form id="quizForm" class="space-y-4">
          {questions &&
            questions.value.map(
              (question: {
                id: number;
                question: string | undefined;
                answer1: string | undefined;
                answer2: string | undefined;
                answer3: string | undefined;
                answer4: string | undefined;
              }) => (
                <div key={question.id} class="flex flex-col mb-8 py-4">
                  <label for="q1" class="text-lg text-gray-800 mb-2">
                    {question.id}. {question.question}
                  </label>
                  <div class="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="q1a"
                      name="q1"
                      value="a"
                      class="mr-2"
                      required
                    />
                    <label for="q1a" class="text-gray-700">
                      a) {question.answer1}
                    </label>
                  </div>
                  <div class="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="q1b"
                      name="q1"
                      value="b"
                      class="mr-2"
                      required
                    />
                    <label for="q1b" class="text-gray-700">
                      b){question.answer2}
                    </label>
                  </div>
                  <div class="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="q1c"
                      name="q1"
                      value="c"
                      class="mr-2"
                      required
                    />
                    <label for="q1c" class="text-gray-700">
                      c) {question.answer3}
                    </label>
                  </div>
                  <div class="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="q1d"
                      name="q1"
                      value="d"
                      class="mr-2"
                      required
                    />
                    <label for="q1d" class="text-gray-700">
                      d) {question.answer4}
                    </label>
                  </div>{' '}
                  <hr />
                </div>
              )
            )}
          <div class="flex justify-between">
            <button
              type="button"
              class="bg-blue-500 hover:bg-blue-600 
						text-white px-2 py-1 rounded-md"
            >
              Previous
            </button>
            <button
              type="button"
              class="bg-blue-500 hover:bg-blue-600 
							text-white px-4 py-1 rounded-md"
            >
              Next
            </button>
          </div>
          <hr />

          <button
            type="button"
            class="bg-green-500 text-white px-4 py-2 
					rounded-md mt-8"
          >
            Submit
          </button>

          <button
            type="button"
            class="bg-red-500 text-white px-3 py-2 rounded-md mt-4"
          >
            Restart Quiz
          </button>

          <div id="result" class="mt-8 hidden">
            <h2 class="text-2xl font-bold mb-4 text-center">
              ???? Quiz Result
            </h2>
            <p
              id="score"
              class="text-lg 
								font-semibold mb-2 
								text-center"
            ></p>
            <p id="feedback" class="text-gray-700 text-center"></p>
          </div>
        </form>
      </div>
    </div>
  );
});
