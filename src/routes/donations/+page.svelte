<!--
    donations/+page.svelte
    Author: Lin Jiang (@Injng)
    Public donations page consistent with site styling.
-->

<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  let { data } = $props();
  // data currently unused; kept for consistency
  void data;
</script>

<svelte:head>
  <title>Donations - BAYMS</title>
</svelte:head>

<!-- Header -->
<Header />

<div class="relative bg-white font-serif">
  <!-- Hero / Title -->
  <div class="relative bg-gradient-to-r from-emerald-800 to-emerald-600 text-white">
    <div class="relative p-5">
      <div class="text-3xl md:text-5xl font-bold px-4 md:pl-60 p-5">DONATIONS</div>
    </div>
  </div>

  <!-- Content -->
  <div class="px-6 md:px-80 py-10 space-y-10">
    <section class="bg-gray-50 rounded-lg border border-gray-200 p-6">
      <h2 class="text-2xl md:text-3xl font-bold text-emerald-800 mb-3">Support BAYMS</h2>
      <p class="text-gray-700 text-lg">
        We are a non-profit organization dedicated to developing and sponsoring children's musical talents through
        active involvement in community services. Donations are tax-deductible as permitted by law (501(c)(3)
        Public Charity, EIN# 74-3247617). Please consult your tax advisor.
      </p>
    </section>

    <!-- Mail-in donations -->
    <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 class="text-xl md:text-2xl font-semibold text-emerald-800 mb-2">Mail a Check</h3>
      <p class="text-gray-700">Please make checks payable to <span class="font-semibold">BAYMS</span> and mail to:</p>
      <div class="mt-3 text-gray-800">
        <div>Bay Area Youth Music Society</div>
        <div>3417 Monte Sereno Terrace</div>
        <div>Fremont, CA 94539</div>
      </div>
    </div>
  </div>
</div>

<!-- Footer -->
<Footer />

