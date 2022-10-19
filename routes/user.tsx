import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";

export default function User() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <h2>User page.</h2>
    </>
  );
}
