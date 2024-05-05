import { component$, useSignal, $ } from "@builder.io/qwik";
import { useQuestionData } from "~/routes";

export default component$(() => {
  const questions = useQuestionData();
  const currentIndex = useSignal<number>(0);
  const question = questions.value[currentIndex.value];
  const selectedAnswer = useSignal<string | null>(null);

  const nextQuestion$ = $(() => {
    if (currentIndex.value < questions.value.length - 1) {
      currentIndex.value++;
      selectedAnswer.value = null; // Reset the selected answer
    }
  });

  const handleAnswerChange$ = $((answer: string) => {
    selectedAnswer.value = answer;
  });

  return (
    <div class="m-5">
      <div
        class="mx-auto max-w-md rounded-md bg-white 
				p-8 shadow-md"
        style="border: 1px solid black;"
      >
        <h1
          class="text-success mb-6 text-center 
				text-3xl font-bold 
				text-green-400"
        >
          Qwik TypeScript Quiz
        </h1>
        <form id="quizForm" class="space-y-4">
          <div>
            {questions.value.length > 0 &&
              currentIndex.value < questions.value.length && (
                <div>
                  <div>{questions.value[currentIndex.value].question}</div>
                  <div key={question.id} class="mb-2 flex flex-col">
                    <label for="q1" class="text-lg text-gray-800">
                      {question.id}. {question.question}
                    </label>
                    {["a", "b", "c", "d"].map((key, index) => {
                      const answerKey = `answer${index + 1}`;
                      return (
                        <div key={key}>
                          <input
                            type="radio"
                            id={`q${questions.value[currentIndex.value].id}${key}`}
                            name={`q${questions.value[currentIndex.value].id}`}
                            value={key}
                            checked={selectedAnswer.value === key}
                            onChange$={() => handleAnswerChange$(key)}
                            required
                          />
                          <label for="q1a" class="text-gray-700">
                            {" "}
                            {
                              questions.value[currentIndex.value][
                                answerKey
                              ] as string
                            }
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>

          <div class="flex justify-between">
            {currentIndex.value > 0 && (
              <button
                onClick$={() => (currentIndex.value = currentIndex.value - 1)}
                type="button"
                class="rounded-md bg-blue-500 
						px-2 py-1 text-white hover:bg-blue-600"
              >
                Previous
              </button>
            )}
            {currentIndex.value < questions.value.length - 1 && (
              <button
                onClick$={nextQuestion$}
                disabled={!selectedAnswer.value}
                type="button"
                class="rounded-md bg-blue-500 
							px-4 py-1 text-white hover:bg-blue-600 disabled:bg-gray-400"
              >
                Next
              </button>
            )}
          </div>
          <button
            type="button"
            class="mt-8 rounded-md bg-green-500 px-4 
					py-2 text-white"
          >
            Submit
          </button>
          <button
            type="button"
            class="mt-4 rounded-md bg-red-500 px-3 py-2 text-white"
          >
            Restart Quiz
          </button>
          <div id="result" class="mt-8 hidden">
            <h2 class="mb-4 text-center text-2xl font-bold">
              ???? Quiz Result
            </h2>
            <p
              id="score"
              class="mb-2 
								text-center text-lg 
								font-semibold"
            ></p>
            <p id="feedback" class="text-center text-gray-700"></p>
          </div>
        </form>
      </div>
    </div>
  );
});
