import { component$, useSignal, $ } from "@builder.io/qwik";
import { useQuestionData } from "~/routes";

export default component$(() => {
  const questions = useQuestionData();
  const currentIndex = useSignal<number>(0);
  const question = questions.value[currentIndex.value];
  const options = question.options;
  const selectedAnswer = useSignal<string>();
  const answers = useSignal<string[]>([]);
  const score = useSignal<number>(0);
  const disableRadios = useSignal<boolean>(false);
  const submittedQuiz = useSignal<boolean>(false);

  const nextQuestion$ = $(() => {
    if (currentIndex.value < questions.value.length - 1) {
      currentIndex.value++;
      selectedAnswer.value = answers.value[currentIndex.value]; // Reset the selected answer
    }
    if (!selectedAnswer.value) {
      disableRadios.value = false;
    }
  });

  const handleAnswerChange$ = $((answer: string) => {
    // Store the previous answer
    const previousAnswer = answers.value[currentIndex.value];

    selectedAnswer.value = answer;
    answers.value[currentIndex.value] = answer;
    disableRadios.value = true;

    if (previousAnswer === question.answer) {
      // If the previous answer was correct, decrement the score
      score.value--;
    } else if (answer === question.answer) {
      // If the new answer is correct, increment the score
      score.value++;
    }
  });

  const returnScore$ = $(() => {
    submittedQuiz.value = true;
  });

  function calculateGrade(score: number, totalQuestions: number): string {
    const percentage = (score / totalQuestions) * 100;

    if (percentage >= 90) {
      return "A";
    } else if (percentage >= 80) {
      return "B";
    } else if (percentage >= 70) {
      return "C";
    } else if (percentage >= 60) {
      return "D";
    } else {
      return "F";
    }
  }

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
          {!submittedQuiz.value && (
            <div>
              {questions.value.length > 0 &&
                currentIndex.value < questions.value.length && (
                  <div>
                    {/* <div>{questions.value[currentIndex.value].question}</div> */}
                    <div key={question.id} class="mb-2 flex flex-col">
                      <label for="q1" class="text-lg text-gray-800">
                        {question.id}. {question.question}
                      </label>
                      {options.map((option: string) => {
                        return (
                          <div key={option}>
                            <input
                              type="radio"
                              id={`q${questions.value[currentIndex.value].id}${option}`}
                              name={`q${questions.value[currentIndex.value].id}`}
                              value={option}
                              checked={
                                answers.value[currentIndex.value] === option
                              }
                              onChange$={() => handleAnswerChange$(option)}
                              required
                              disabled={disableRadios.value}
                            />{" "}
                            <label
                              for={`q${questions.value[currentIndex.value].id}${option}`}
                              class="text-gray-700"
                            >
                              {option}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>
          )}
          {!submittedQuiz.value && (
            <div class="flex justify-between">
              {currentIndex.value > 0 && (
                <button
                  onClick$={() => {
                    // Decrease currentIndex
                    currentIndex.value = currentIndex.value - 1;

                    // Update selectedAnswer to the previous answer
                    selectedAnswer.value =
                      answers.value[currentIndex.value] || "";
                    disableRadios.value = true;
                  }}
                  type="button"
                  class="rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
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
          )}
          <div class="flex items-center justify-between">
            {!submittedQuiz.value && (
              <button
                onClick$={returnScore$}
                type="button"
                class="mt-8 rounded-md bg-green-500 px-4 
          py-2 text-white"
              >
                Submit
              </button>
            )}
            {submittedQuiz.value && (
              <div>
                <h2 class="mb-4 text-center text-2xl font-bold">Quiz Result</h2>
                <p>
                  Your Score: {score.value}/{questions.value.length}
                </p>
                <p>
                  Letter Grade:{" "}
                  {calculateGrade(score.value, questions.value.length)}
                </p>
              </div>
            )}
            <button
              onClick$={() => {
                currentIndex.value = 0;
                selectedAnswer.value = "";
                score.value = 0;
                disableRadios.value = false;
                submittedQuiz.value = false;
                answers.value = []; // Reset the answers array
              }}
              type="button"
              class="mt-4 rounded-md bg-red-500 px-3 py-2 text-white"
            >
              Restart Quiz
            </button>
          </div>
          <p>
            Your Score: {score.value}/{currentIndex.value + 1}
          </p>
        </form>
      </div>
    </div>
  );
});
