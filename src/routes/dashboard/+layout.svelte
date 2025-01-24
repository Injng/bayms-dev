<!--
    dashboard/+layout.svelte
    Author: Lin Jiang (@Injng)
    The dashboard layout for management, containing a navigation system.
  -->

<script lang="ts">
  import Header from "$lib/Header.svelte";
  import { page } from "$app/state";

  // determine which page the user is on and bold the navigation accordingly
  let section = 0;
  switch (page.url.pathname) {
  case "/dashboard" : {
    section = 0;
    break;
  }
  }
</script>

<!-- Header -->
<Header />

<div class="bg-dashboard text-muted font-serif min-h-[calc(100vh-64px)] flex flex-col">
  <div class="p-5 border-b text-white border-muted-b font-bold">
    Dashboard
  </div>
  <div class="grow grid grid-cols-[200px_minmax(900px,_1fr)] border-muted-b">
    <div class="border-r border-muted-b grid grid-rows-[repeat(2,_60px)]">
      <div class="p-5 border-b border-muted-b {section == 0 ? 'text-white font-bold' : ''}">
        Profile
      </div>
    </div>
    <div class="p-5">
      <slot></slot>
    </div>
  </div>
</div>
