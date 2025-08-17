<!--
    forgot/+page.svelte
    Author: Lin Jiang (@Injng)
    The website's forgot password page for members to request a password reset email.
  -->

<script lang="ts">
  import type { ActionData } from "./$types";
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";

  // handle errors through the action data
  let { form }: { form: ActionData } = $props();
  
  // don't show the error on first load
  let showError = $state(false);
  
  // if error occurs thereafter, set showError to true
  $effect(() => {
    if (form) {
      if (form.success != undefined && !form.success) showError = true;
    } else {
      showError = false;
    }
  });
</script>

<svelte:head>
  <title>Forgot Password - BAYMS</title>
</svelte:head>

<!-- Header -->
<Header />

<!-- Forgot Password Form -->
<div class="relative bg-slate-500 p-4 md:p-52 sm:pl-[40rem] sm:pr-[40rem]">
  <div class="relative outline outline-3 outline-black bg-white p-6 md:p-10 pb-5 font-serif">
    <div class="text-center text-2xl md:text-3xl font-bold pb-5">Forgot Password</div>
    <form method="POST" action="?/forgot">
      <div class="flex flex-col justify-end">
        <label class="pb-3">
          <div>Email</div>
          <input name="email" type="email" class="w-full">
        </label>
        <button
          type="submit"
          class="outline outline-1 outline-black p-2 hover:bg-black hover:text-white
                 disabled:bg-gray-300 disabled:text-white">
          Submit
        </button>
      </div>
    </form>
    {#if showError}
      <div class="mt-7 p-2 bg-red-200 text-sm text-red-600">
        Error: Please check your inputs and try again.
      </div>
    {/if}
  </div>
</div>

<!-- Footer -->
<Footer />
