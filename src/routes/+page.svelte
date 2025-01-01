<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
</script>

<div class="relative">
  <!-- Hero -->
  <div class="relative w-screen h-screen">
    <video class="relative object-cover w-full h-full" autoplay muted loop>
      <source src="hero.mp4" type="video/mp4">
    </video>
    <div class="absolute inset-0 bg-black bg-opacity-60"></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center font-serif">
      <div class="text-white text-5xl font-bold">
        Bay Area Youth Music Society
      </div>
      <a href="/#about" class="text-white mt-10 pl-5 pr-5 p-2 outline-1 outline-white outline">
        Learn more
      </a>
    </div>
  </div>
  
  <!-- Header -->
  <Header />

  <!-- About -->
  <div id="about" class="relative flex flex-col font-serif bg-black bg-opacity-60">
    <div class="relative flex flex-col mt-40 mb-40 ml-80 mr-80 p-5 text-white">
      <div class="text-5xl font-bold pb-5">ABOUT US</div>
      <div class="pb-2 text-xl">
        BAYMS, 501(c)(3) Public Charity EIN# 74-3247617, is a
        non-profit volunteer organization that brings together youth
        from the Bay Area. We are dedicated to nurturing and enhancing
        children’s musical talents by involving them in various
        community service activities. By participating in services,
        our younger members improve their musical abilities and learn
        the significance of giving back to our community.
      </div>
      <div class="text-xl">
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

  
  <!-- Join -->
  <div class="relative flex flex-col font-serif bg-white">
    <div class="relative flex flex-col mt-40 mb-40 ml-80 mr-80 p-5 text-black">
      <div class="text-5xl font-bold pb-5">JOIN US</div>
      <div class="pb-2 text-xl">
        We are always on the lookout for talented musicians to join
        us. If you're interested in auditioning, please review the
        information below.
      </div>
    </div>
  </div>

  <!-- Footer -->
  <Footer />
</div>
