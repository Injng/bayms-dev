<!--
    status/+page.svelte
    Author: Lin Jiang (@Injng)
    The page for viewing application status for the applicant.
  -->

<script lang="ts">
  // get page data loaded from server
  let { data } = $props();

  // isRejected can be true, false, or undefined/null
  const isRejected = data?.isRejected?.rejected;
</script>

<svelte:head>
  <title>Application Status - Dashboard - BAYMS</title>
</svelte:head>

<div class="px-4 md:px-52 pt-5 font-serif">
  <div class="text-2xl text-white mb-6">
    Application Status
  </div>
  {#if isRejected === true}
    <div class="p-4 bg-destructive text-white rounded border border-red-400 shadow mb-4">
      <div class="font-bold text-lg mb-1">Application Rejected</div>
      <div>We regret to inform you that your application has been rejected.</div>
    </div>
  {:else}
    <div class="p-4 bg-blue-200 text-blue-600 rounded border border-blue-400 shadow mb-4">
      <div class="font-bold text-lg mb-1">Application In Progress</div>
      <div>Your application is currently being processed.</div>
    </div>
  {/if}
</div>

