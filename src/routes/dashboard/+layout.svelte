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

  // mobile navigation state
  let mobileNavOpen = $state(false);

  // determine which page the user is on and bold the navigation accordingly
  $effect(() => {
    switch (path) {
    case "/dashboard" : {
      section = 0;
      break;
    }

    case "/dashboard/applicant" : {
      section = 0;
      break;
    }
      
    case "/dashboard/members" : {
      section = 1;
      break;
    }

    case "/dashboard/applicants" : {
      section = 2;
      break;
    }

    case "/dashboard/status" : {
      section = 2;
      break;
    }

    case "/dashboard/events" : {
      section = 3;
      break;
    }

    case "/dashboard/recordings" : {
        section = 4;
        break;
      }
    }
  });

  function toggleMobileNav() {
    mobileNavOpen = !mobileNavOpen;
  }
</script>

<!-- Header -->
<Header />

<div class="bg-dashboard text-muted font-serif min-h-[calc(100vh-64px)] flex flex-col">
  <div class="p-5 border-b text-white border-muted-b font-bold flex justify-between items-center">
    <span>Dashboard</span>
    <button 
      class="md:hidden p-2" 
      onclick={toggleMobileNav}
      aria-label="Toggle navigation"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {#if mobileNavOpen}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        {:else}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        {/if}
      </svg>
    </button>
  </div>
  
  <!-- Mobile Navigation -->
  <div class="md:hidden {mobileNavOpen ? 'block' : 'hidden'} border-b border-muted-b">
    <div class="flex flex-col">
      {#if userRole === 'applicant'}
        <div class="p-4 border-b border-muted-b {section==0 ? 'text-white font-bold bg-muted-b' : ''}">
          <a href="/dashboard/applicant">Profile</a>
        </div>
      {:else}
        <div class="p-4 border-b border-muted-b {section==0 ? 'text-white font-bold bg-muted-b' : ''}">
          <a href="/dashboard">Profile</a>
        </div>
      {/if}
      
      {#if userRole === 'admin'}
        <div class="p-4 border-b border-muted-b {section==1 ? 'text-white font-bold bg-muted-b' : ''}">
          <a href="/dashboard/members">Members</a>
        </div>
        <div class="p-4 border-b border-muted-b {section==2 ? 'text-white font-bold bg-muted-b' : ''}">
          <a href="/dashboard/applicants">Applicants</a>
        </div>
        <div class="p-4 border-b border-muted-b {section==3 ? 'text-white font-bold bg-muted-b' : ''}">
          <a href="/dashboard/events">Events</a>
        </div>
        <div class="p-4 border-b border-muted-b {section==4 ? 'text-white font-bold bg-muted-b' : ''}">
          <a href="/dashboard/recordings">Recordings</a>
        </div>
      {/if}

      {#if userRole === 'applicant'}
        <div class="p-4 border-b border-muted-b {section==2 ? 'text-white font-bold bg-muted-b' : ''}">
          <a href="/dashboard/status">Status</a>
        </div>
      {/if}
    </div>
  </div>

  <div class="grow grid grid-cols-1 md:grid-cols-[200px_minmax(900px,_1fr)] border-muted-b">
    <!-- Desktop Navigation -->
    <div class="hidden md:block border-r border-muted-b grid grid-rows-[repeat(4,_60px)]">
      {#if userRole === 'applicant'}
        <div class="p-5 border-b border-muted-b {section==0 ? 'text-white font-bold' : ''}">
          <a href="/dashboard/applicant">Profile</a>
        </div>
      {:else}
        <div class="p-5 border-b border-muted-b {section==0 ? 'text-white font-bold' : ''}">
          <a href="/dashboard">Profile</a>
        </div>
      {/if}
      
      {#if userRole === 'admin'}
        <div class="p-5 border-b border-muted-b {section==1 ? 'text-white font-bold' : ''}">
          <a href="/dashboard/members">Members</a>
        </div>
        <div class="p-5 border-b border-muted-b {section==2 ? 'text-white font-bold' : ''}">
          <a href="/dashboard/applicants">Applicants</a>
        </div>
        <div class="p-5 border-b border-muted-b {section==3 ? 'text-white font-bold' : ''}">
          <a href="/dashboard/events">Events</a>
        </div>
        <div class="p-5 border-b border-muted-b {section==4 ? 'text-white font-bold' : ''}">
          <a href="/dashboard/recordings">Recordings</a>
        </div>
      {/if}

      {#if userRole === 'applicant'}
        <div class="p-5 border-b border-muted-b {section==2 ? 'text-white font-bold' : ''}">
          <a href="/dashboard/status">Status</a>
        </div>
      {/if}
    </div>
    <div class="p-5 h-[calc(100vh-129px)] overflow-auto">
      {@render children()}
    </div>
  </div>
</div>
