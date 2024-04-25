export interface Questions {
  id: string;
    question: string;
    answer1: string;
    answer2: string;
    answer3?: string;
    answer4?: string;
}

export const CONTACTS: Questions[] = [
    {
        id: "1",
        question: "TypeScript is an _____ framework",
        answer1: "Licensed",
        *answer2: "Open-sourced",
        answer3: "Commercial",
        answer4: "Both A and B",
    },
    {
        id: "2",
        question: "TypeScript is a typed superset of _____",
        answer1: "C#",
        answer2: "Java",
        *answer3: "JavaScript",
        answer4: "ReactJS",
    },
    {
        id: "3",
        question: "TypeScript files compile into ____",
        *answer1: "JavaScript",
        answer2: "VBScript",
        answer3: "TypeScript",
        answer4: "None of the above",
    
    },
    {
        id: "4",
        question: "TypeScript can be used to write server side and client side applications",
       * answer1: "true",
        answer2: "false",
     

    },
    {
        id: "5",
        question: "____ command is used to genearte a JavaScript file from a TypeScript file",
        answer1: "npm filename.ts",
        *answer2: "tsc fileName.ts",
        answer3: "tsc -js fileName.ts",
        answer4: "All of the above",
    },
    {
        id: "6",
        question: "Which of the following statemnts declare a variable in TypeScript?",
        answer1: "var myVar = 123;",
        answer2: "var myVar:number = 123;",
        answer3: "let myVar:number = 123;",
        *answer4: "All of the above",
    },
    {
        id: "7",
        question: "Which of the following are primitive types supported in TypeScript?",
        answer1: "number",
        answer2: "string",
        answer3: "boolean",
        *answer4: "All of the above",
    },
    {
        id: "8",
        question: "Which of the following s a valid union type variable?",
        answer1: "var emp: [number, string] = [1, 'Jay'];",
        *answer2: "var emp:(number|string) = 123",
        answer3: "var emp:string[] = ['Jay']",
        answer4: "None of the above",
},
            {
        id: "9",
        question: "Whichof the following is a valid tuple?",
        *answer1: "var employee: [number, string] = [1, 'Jay']",
        answer2: "var emploiyee:(number|string) = 123",
        answer3: "var employee = [1,'Jay'];",
        answer4: "None of the above",
        },
        {
        id: "10",
        question: "Type assertion in TypeScript is achieved using which of the following syntax?",
        answer1: "Using <type> syntax",
        answer2: "Using as syntax",
        *answer3: "Both A and B",
        answer4: "None of the above",
        },
    //  {
    // id: "11",
    //      question: "What will be teh output of the following code snippet?
    // let arr =[10, 20, 30, 40];
    //     for(var val of arr) {
    //     console.log(val);
    // }",
    // *answer1: "prints 10,20,30,40",
    // answer2: "prints 0,1,2,3",
    // answer3: "prints undefined",
    // answer4: "Compiler error",
    // },
      {
    id: "12",
    question: "Which of the following is a valid arrow function?",
    *answer1: "let sum = (x: number, y: number) => x + y",
    answer2: "let sum(): (x: number, y: number): => x + y",
    answer3: "let sum = (x: number, y: number) => return x + y",
    answer4: "let sum:(x: number, y: number) => x + y",
    },
       {
    id: "13",
    question: "the rest parameters in a function are used when ____",
    answer1: "The types of parameters are not known",
    *answer2: "The number of parameters are not known",
    answer3: "The function needs to be executed asynchronously",
    answer4: "The function is called recursively",
    },
        {
    id: "14",
    question: "which of the following statements are true?",
    answer1: "An interface can extend another interface in TypeScript",
    answer2: "An interface can extend a class in TypeScript",
    answer3: "TypeScript interface does not generate any JavaScript code",
   * answer4: "All of the above",
    },
         {
    id: "15",
    question: "WHich of the following are valid data modifiers in TypeScript?",
    answer1: "public",
    answer2: "private",
    answer3: "protected",
    *answer4: "all of the above",
    },
          {
    id: "16",
    question: "which of the following keywords is used to declare a module?",
    *answer1: "export",
    answer2: "namespace",
    answer3: "type",
    answer4: "declare",
    },
           {
    id: "17",
    question: "Which of the following is declared a namespace?",
   * answer1: "namespace test { }",
    answer2: "ns test { }",
    answer3: "Both A and B",
    answer4: "export test() { }",
    },
            {
    id: "18",
    question: "Which of the following command is used to compile a module?",
    answer1: "tsc --module amd mymodule.ts",
    answer2: "tsc -m amd mymodule.ts",
    *answer3: "Both A and B",
    answer4: "None of the above",
    },
             {
    id: "19",
    question: "Which configuration file is required to compile the whole TypeScript project?",
    answer1: "tsconfig.js",
    *answer2: "tsconfig.json",
    answer3: "web.config",
    answer4: "app.json",
    },

 {
    id: "20",
    question: "WHich of the following statements is true?",
    answer1: "TypeScript supports generics",
    answer2: "TypeScript supports readonly and static members",
    answer3: "TypeScript supports abstract class",
    *answer4: "All of the above",
    },
  