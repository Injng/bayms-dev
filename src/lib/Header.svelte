<!-- 
     Header.svelte
     Author: Lin Jiang (@Injng)
     Svelte component for the website header.
-->
<script lang="ts">
  let { auth, headerGap = 0 } = $props();
</script>

<div class="fixed bg-slate-100 flex flex-row font-serif p-5 z-10"
     style="top: {headerGap}px; left: {headerGap}px; right: {headerGap}px;">
  <a href="/" class="font-bold">BAYMS</a>
  <div class="grow flex flex-row-reverse space-x-reverse space-x-4">
    <a href="/login" class="font-bold">Login</a>
    {#if auth}
      <a href="/dashboard">Dashboard</a>
    {/if}
    <a href="/musicians">Musicians</a>
    <a href="/performances">Performances</a>
  </div>
</div>
