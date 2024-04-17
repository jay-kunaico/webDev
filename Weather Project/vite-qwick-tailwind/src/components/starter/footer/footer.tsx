import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "../../../routes/layout";
import styles from "./footer.module.css";

export default component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer>
      <div class="container">
        <span class="mr-5">Made with ♡ by Jay</span>
        <span class={styles.spacer}>|</span>
        <span>
          {serverTime.value.date} {serverTime.value.time}
        </span>
      </div>
    </footer>
  );
});
