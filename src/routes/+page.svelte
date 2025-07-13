<!-- 
     +page.svelte
     Author: Lin Jiang (@Injng)
     The website's homepage, containing About Us and Join Us content as well as hero.
  -->

<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";

  // get page data loaded from server
  let { data } = $props();

  // the gap of the header from the document side
  let headerGap = $state(40);

  /**
   * Calculates the gap of the header based on scroll distance
   */
  function calcHeader() {
    headerGap = Math.round(scrollY < 1000 ? 40 - scrollY / 1000 * 40 : 0);
  }

  // format date for display
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // format time for display
  function formatTime(timeString: string | null): string {
    if (!timeString) return '';
    return timeString;
  }
</script>

<svelte:head>
  <title>BAYMS - Home</title>
</svelte:head>

<svelte:window on:scroll={calcHeader} />

<div class="relative">
  <!-- Hero -->
  <div class="relative w-screen h-screen">
    <video class="relative object-cover w-full h-full" autoplay muted loop>
      <source src="hero.mp4" type="video/mp4">
    </video>
    <div class="absolute inset-0 bg-black/60"></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center font-serif px-4">
      <div class="text-white text-2xl md:text-5xl font-bold text-center">
        Bay Area Youth Music Society
      </div>
      <a href="/#about" class="text-white mt-10 pl-5 pr-5 p-2 outline-1 outline-white outline">
        Learn more
      </a>
    </div>
  </div>
  
  <!-- Header -->
  <Header {headerGap} />

  <!-- About -->
  <div id="about" class="relative flex flex-col font-serif bg-black/60">
    <div class="relative flex flex-col mt-20 md:mt-40 mb-20 md:mb-40 px-6 md:px-80 p-5 text-white">
      <div class="text-3xl md:text-5xl font-bold pb-5">ABOUT US</div>
      <div class="pb-2 text-lg md:text-xl">
        BAYMS, 501(c)(3) Public Charity EIN# 74-3247617, is a
        non-profit volunteer organization that brings together youth
        from the Bay Area. We are dedicated to nurturing and enhancing
        children's musical talents by involving them in various
        community service activities. By participating in services,
        our younger members improve their musical abilities and learn
        the significance of giving back to our community.
      </div>
      <div class="text-lg md:text-xl">
        At BAYMS, we offer opportunities for children to perform,
        collaborate, and grow as musicians. We host events such as
        concerts, workshops, and masterclasses that connect them with
        diverse audiences and causes. Our mission is to educate young
        musicians and encourage community engagement to allow them to
        develop their skills while making meaningful contributions to
        society.
      </div>
    </div>
  </div>

  <!-- Upcoming Events -->
  <div class="relative flex flex-col font-serif bg-white">
    <div class="relative flex flex-col mt-10 md:mt-20 mb-10 md:mb-20 px-6 md:px-80 p-5 text-black">
      <div class="text-3xl md:text-5xl font-bold pb-5">UPCOMING EVENTS</div>
      {#if data.upcomingEvents && data.upcomingEvents.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each data.upcomingEvents as event}
            <div class="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div class="mb-3">
                <div class="font-semibold text-lg text-black mb-2">{event.name}</div>
                <div class="text-emerald-600 text-sm font-medium">
                  {formatDate(event.date)}
                  {#if event.time}
                    <div class="text-gray-600 mt-1">at {formatTime(event.time)}</div>
                  {/if}
                </div>
              </div>
              <div class="text-gray-700 mb-3">
                <span class="text-emerald-600">📍</span> {event.locations.name}
              </div>
              {#if event.description}
                <div class="text-gray-600 text-sm">{event.description}</div>
              {/if}
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-lg md:text-xl text-gray-600">
          No upcoming events at the moment. Check back soon for new events and performances!
        </div>
      {/if}
    </div>
  </div>

  
  <!-- Join -->
  <div class="relative flex flex-col font-serif bg-black/60">
    <div class="relative flex flex-col mt-20 md:mt-40 mb-20 md:mb-40 px-6 md:px-80 p-5 text-white">
      <div class="text-3xl md:text-5xl font-bold pb-5">JOIN US</div>
      <div class="pb-2 text-lg md:text-xl">
        We are always on the lookout for talented musicians to join
        us. If you're interested in auditioning, please review the
        information below.
      </div>
    </div>
  </div>

  <!-- Footer -->
  <Footer />
</div>
