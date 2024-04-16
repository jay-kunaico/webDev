import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";

export default component$(() => {
  return (
    <header class="sticky top-0 z-10 ml-0 bg-purple-700 text-white">
      <section class="flex max-w-4xl p-4 ">
        <h1 class="text-3xl font-medium">Weather API</h1>
      </section>
    </header>
  );
});
