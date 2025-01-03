<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
</script>

<!-- Header -->
<Header />

<!-- Login Form -->
<div class="relative bg-slate-500 p-52 pl-[40rem] pr-[40rem]">
  <div class="relative outline outline-3 outline-black bg-white p-10 font-serif">
    <div class="text-center text-3xl font-bold pb-5">Member Login</div>
    <form method="POST">
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
  </div>
</div>

<!-- Footer -->
<Footer />
