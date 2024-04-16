import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";

export default component$(() => {
  return (
    <header className="sticky top-0 z-10 ml-0 bg-purple-700 text-white">
      <section className="flex max-w-4xl p-4 ">
        <h1 className="text-3xl font-medium">Weather API</h1>
      </section>
    </header>
  );
});
