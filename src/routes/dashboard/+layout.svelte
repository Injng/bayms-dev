<!--
    dashboard/+layout.svelte
    Author: Lin Jiang (@Injng)
    The dashboard layout for management, containing a navigation system.
  -->

<script lang="ts">
  import Header from "$lib/Header.svelte";
  import { page } from "$app/state";
  import { jwtDecode } from "jwt-decode";
  import type { JwtPayload as DefaultJwtPayload } from "jwt-decode";

  // obtain children pages to slot into layout as well as supabase data
  let { data, children } = $props()
  let { session } = $derived(data)

  // define jwt payload to include custom user role claim
  interface JwtPayload extends DefaultJwtPayload {
    user_role: string;
  }

  // obtain role of user (either member, applicant, or admin)
  let userRole: string = $state('');
  function getRole() {
    if (session) {
      const jwt = jwtDecode<JwtPayload>(session.access_token);
      userRole = jwt.user_role;
    }
  };
  getRole();
  
  // establish the section and path as state variables
  let section = $state(0);
  let path = $derived(page.url.pathname);

  // determine which page the user is on and bold the navigation accordingly
  $effect(() => {
    switch (path) {
    case "/dashboard" : {
      section = 0;
      break;
    }
      
    case "/dashboard/members" : {
      section = 1;
      break;
    }
    }
  });
</script>

<!-- Header -->
<Header />

<div class="bg-dashboard text-muted font-serif min-h-[calc(100vh-64px)] flex flex-col">
  <div class="p-5 border-b text-white border-muted-b font-bold">
    Dashboard
  </div>
  <div class="grow grid grid-cols-[200px_minmax(900px,_1fr)] border-muted-b">
    <div class="border-r border-muted-b grid grid-rows-[repeat(2,_60px)]">
      <div class="p-5 border-b border-muted-b {section==0 ? 'text-white font-bold' : ''}">
        <a href="/dashboard">Profile</a>
      </div>
      {#if userRole === 'admin'}
        <div class="p-5 border-b border-muted-b {section==1 ? 'text-white font-bold' : ''}">
          <a href="/dashboard/members">Members</a>
        </div>
      {/if}
    </div>
    <div class="p-5 h-[calc(100vh-129px)] overflow-auto">
      {@render children()}
    </div>
  </div>
</div>
