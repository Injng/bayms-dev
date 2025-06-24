<!--
    login/+page.svelte
    Author: Lin Jiang (@Injng)
    The website's login page for logging in members with an email and username.
  -->

<script lang="ts">
  import type { ActionData } from "./$types";
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";

  // handle login errors through the action data
  let { form }: { form: ActionData } = $props();
  
  // don't show the login error on first load
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

<!-- Header -->
<Header />

<!-- Login Form -->
<div class="relative bg-slate-500 p-52 pl-[40rem] pr-[40rem]">
  <div class="relative outline outline-3 outline-black bg-white p-10 pb-5 font-serif">
    <div class="text-center text-3xl font-bold pb-5">Member Login</div>
    <form method="POST" action="?/login">
      <div class="flex flex-col justify-end">
        <label class="pb-3">
          <div>Email</div>
          <input name="email" type="email" class="w-full">
        </label>
        <label class="pb-7">
          <div>Password</div>
          <input name="password" type="password" class="w-full">
        </label>
        <button
          type="submit"
          class="outline outline-1 outline-black p-2 hover:bg-black hover:text-white">
          Log in
        </button>
      </div>
    </form>
    {#if showError}
      <div class="mt-7 p-2 bg-red-200 text-sm text-red-600">
        Error: Please check your credentials and try again.
      </div>
    {/if}
    <div class="mt-5 text-right">
      <a href="/apply"
         class="text-slate-500 hover:text-slate-700">Applicant? Apply here.</a>
    </div>
  </div>
</div>

<!-- Footer -->
<Footer />
