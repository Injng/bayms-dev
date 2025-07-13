<!-- 
     Header.svelte
     Author: Lin Jiang (@Injng)
     Svelte component for the website header.
-->
<script lang="ts">
  import { page } from '$app/state';
  import { invalidateAll } from '$app/navigation';
  import { jwtDecode } from 'jwt-decode';
  import type { JwtPayload as DefaultJwtPayload } from "jwt-decode";
  
  let { headerGap = 0 } = $props();
  let data = $derived(page.data);

  // make header relative if there is no scrolling animation, i.e. not on the home page
  let style = headerGap == 0 ? "relative" : "fixed";

  // mobile menu state
  let mobileMenuOpen = $state(false);

  /**
   * Function to handle logout by signing out on the supabase and invalidating the session.
   */
  async function logout() {
    const { error } = await data.supabase.auth.signOut();
    if (!error) {
      await invalidateAll();
    }
  }

  // define jwt payload to include custom user role claim
  interface JwtPayload extends DefaultJwtPayload {
    user_role: string;
  }

  // obtain role of user (either member, applicant, or admin)
  let userRole: string = $state('');
  function getRole() {
    if (data.session) {
      const jwt = jwtDecode<JwtPayload>(data.session.access_token);
      userRole = jwt.user_role;
    }
  };
  getRole();

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<div class="{style} bg-slate-100 flex flex-col md:flex-row font-serif p-5 z-10"
     style="top: {headerGap}px; left: {headerGap}px; right: {headerGap}px;">
  <div class="flex justify-between items-center">
    <a href="/" class="font-bold">BAYMS</a>
    <button 
      class="md:hidden p-2" 
      onclick={toggleMobileMenu}
      aria-label="Toggle mobile menu"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {#if mobileMenuOpen}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        {:else}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        {/if}
      </svg>
    </button>
  </div>
  
  <div class="md:hidden {mobileMenuOpen ? 'block' : 'hidden'} mt-4 space-y-3">
    {#if data.auth}
      <button class="font-bold cursor-pointer block w-full text-left" onclick={logout}>
        Logout
      </button>
    {:else}
      <a href="/login" class="font-bold block">Login</a>
    {/if}
    {#if data.auth}
      {#if userRole === 'applicant'}
        <a href="/dashboard/applicant" class="block">Application</a>
      {:else}
        <a href="/dashboard" class="block">Dashboard</a>
      {/if}
    {/if}
    <a href="/musicians" class="block">Musicians</a>
    <a href="/performances" class="block">Performances</a>
  </div>

  <div class="hidden md:flex grow flex-row-reverse space-x-reverse space-x-4">
    {#if data.auth}
      <button class="font-bold cursor-pointer" onclick={logout}>
        Logout
      </button>
    {:else}
      <a href="/login" class="font-bold">Login</a>
    {/if}
    {#if data.auth}
      {#if userRole === 'applicant'}
        <a href="/dashboard/applicant">Application</a>
      {:else}
        <a href="/dashboard">Dashboard</a>
      {/if}
    {/if}
    <a href="/musicians">Musicians</a>
    <a href="/performances">Performances</a>
  </div>
</div>
