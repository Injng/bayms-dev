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
