<!-- 
     Header.svelte
     Author: Lin Jiang (@Injng)
     Svelte component for the website header.
-->
<script lang="ts">
  import { page } from '$app/state';
  import { invalidateAll } from '$app/navigation';
  
  let { headerGap = 0 } = $props();
  let data = $derived(page.data);

  // make header relative if there is no scrolling animation, i.e. not on the home page
  let style = headerGap == 0 ? "relative" : "fixed";

  /**
   * Function to handle logout by signing out on the supabase and invalidating the session.
   */
  async function logout() {
    const { error } = await data.supabase.auth.signOut();
    if (!error) {
      await invalidateAll();
    }
  }
</script>

<div class="{style} bg-slate-100 flex flex-row font-serif p-5 z-10"
     style="top: {headerGap}px; left: {headerGap}px; right: {headerGap}px;">
  <a href="/" class="font-bold">BAYMS</a>
  <div class="grow flex flex-row-reverse space-x-reverse space-x-4">
    {#if data.auth}
      <button class="font-bold cursor-pointer" onclick={logout}>
        Logout
      </button>
    {:else}
      <a href="/login" class="font-bold">Login</a>
    {/if}
    {#if data.auth}
      <a href="/dashboard">Dashboard</a>
    {/if}
    <a href="/musicians">Musicians</a>
    <a href="/performances">Performances</a>
  </div>
</div>
