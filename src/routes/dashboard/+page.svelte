<!--
    dashboard/+page.svelte
    Author: Lin Jiang (@Injng)
    The default dashboard page for editing profile information.
  -->

<div class="pl-52 pr-52 pt-5">
  <div class="text-2xl text-white">
    User Profile
  </div>

  <!-- Personal Information Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Personal Information
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      <form method="POST" action="?/save-personal-information">
        <label class="grid grid-cols-[300px_1fr] mb-2">
          <div>Name</div>
          <input name="name" type="text" class="border border-muted-b bg-input">
        </label>
        <label class="grid grid-cols-[300px_1fr] mb-2">
          <div>Email</div>
          <input name="name" type="email" class="border border-muted-b bg-input">
        </label>
        <label class="grid grid-cols-[300px_1fr]">
          <div>Phone</div>
          <input name="name" type="tel" class="border border-muted-b bg-input">
        </label>
      </form>
    </div>
  </div>
</div>

