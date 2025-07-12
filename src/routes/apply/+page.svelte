<!--
    apply/+page.svelte
    Author: Lin Jiang (@Injng)
    The website's application page for applicants to sign up in order to login.
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

  // state to track if confirm password is same as entered password
  let passwordSame = $state(false);
  let password = $state("");
  let password2 = $state("");
  $effect(() => {
    if (password === password2) passwordSame = true;
    else passwordSame = false
  });

  // password validation states
  let passwordValid = $state(false);
  let passwordLengthValid = $state(false);
  $effect(() => {
    passwordLengthValid = password.length > 6;
    passwordValid = passwordLengthValid && passwordSame && password.length > 0;
  });
</script>

<svelte:head>
  <title>Apply - BAYMS</title>
</svelte:head>

<!-- Header -->
<Header />

<!-- Login Form -->
<div class="relative bg-slate-500 p-52 pl-[40rem] pr-[40rem]">
  <div class="relative outline outline-3 outline-black bg-white p-10 pb-5 font-serif">
    <div class="text-center text-3xl font-bold pb-5">Apply</div>
    <form method="POST" action="?/apply">
      <div class="flex flex-col justify-end">
        <label class="pb-3">
          <div>Email</div>
          <input name="email" type="email" class="w-full">
        </label>
        <label class="pb-3">
          <div>Full Name</div>
          <input name="name" type="text" class="w-full">
        </label>
        <label class="pb-3">
          <div>Password</div>
          <input name="password" type="password" class="w-full" bind:value={password}
                 style={passwordLengthValid ? "border-color: green" : "border-color: red"}>
        </label>
        <div class="text-sm pb-3 flex items-center gap-2">
          {#if passwordLengthValid}
            <span class="text-green-600">✓ Password length is valid</span>
          {:else}
            <span class="text-red-600">✗ Password must be longer than 6 characters</span>
          {/if}
        </div>
        <label class="pb-2">
          <div>Confirm Password</div>
          <input name="password2" type="password" class="w-full" bind:value={password2}
                 style={passwordSame ? "border-color: green" : "border-color: red"}>
        </label>
        <div class="text-sm pb-3 flex items-center gap-2">
          {#if password2.length === 0}
            <span class="text-gray-600">Please confirm your password</span>
          {:else if passwordSame}
            <span class="text-green-600">✓ Passwords match</span>
          {:else}
            <span class="text-red-600">✗ Passwords do not match</span>
          {/if}
        </div>
        <button
          type="submit"
          class="outline outline-1 outline-black p-2 hover:bg-black hover:text-white
                 disabled:bg-gray-300 disabled:text-white"
          disabled={!passwordValid}>
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
