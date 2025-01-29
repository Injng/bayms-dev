<!--
    dashboard/+page.svelte
    Author: Lin Jiang (@Injng)
    The default dashboard page for editing profile information.
  -->
<script lang="ts">
  let { data } = $props();

  // obtain user data to pre-fill forms
  const user = data.user![0];
</script>

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
      <form method="POST" action="?/save_personal_information">
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Name</div>
          <input name="name" type="text" class="border border-muted-b bg-input"
                 value={user.name}>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Email</div>
          <input name="email" type="email" class="border border-muted-b bg-input"
                 value={user.email}>
        </label>
        <div class="grid grid-cols-2">
          <label class="grid grid-cols-[150px_1fr] mb-2 mr-5 items-center">
            <div>Phone</div>
            <input name="phone" type="tel" class="border border-muted-b bg-input"
                   value={user.phone}>
          </label>
          <label class="grid grid-cols-[150px_1fr] mb-2 ml-5 items-center">
            <div>Birthday</div>
            <input name="birthday" type="date" class="border border-muted-b bg-input"
                   value={user.birthday}>
          </label>
        </div>
        <div class="w-full flex justify-end">
          <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                         mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all"
                  type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- School and Location Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Address and School Information
    </div>
    <form method="POST" action="?/save-location-information">
      <div class="pt-3 pb-3 pl-5 pr-5 border-b border-muted-b">
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Street</div>
          <input name="name" type="text" class="border border-muted-b bg-input"
                 value={user['address/street']}>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>City</div>
          <input name="email" type="text" class="border border-muted-b bg-input"
                 value={user['address/city']}>
        </label>
        <div class="grid grid-cols-2">
          <label class="grid grid-cols-[150px_1fr] mb-2 mr-5 items-center">
            <div>State</div>
            <input name="state" type="text" class="border border-muted-b bg-input"
                   value={user['address/state']}>
          </label>
          <label class="grid grid-cols-[150px_1fr] ml-5 items-center">
            <div>ZIP Code</div>
            <input name="zip" type="text" class="border border-muted-b bg-input"
                   value={user['address/zip']}>
          </label>
        </div>
      </div>
      <div class="pt-3 pb-3 pl-5 pr-5">
        <div class="grid grid-cols-2">
          <label class="grid grid-cols-[150px_1fr] mb-2 items-center mr-5">
            <div>School Name</div>
            <input name="school" type="text" class="border border-muted-b bg-input"
                   value={user.school}>
          </label>
          <label class="grid grid-cols-[150px_1fr] mb-2 items-center ml-5">
            <div>Grade</div>
            <input name="grade" type="number" class="border border-muted-b bg-input"
                   value={user.grade}>
          </label>
        </div>
        <div class="w-full flex justify-end">
          <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                         mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all"
                  type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>

  <!-- About Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      About
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      <form method="POST" action="?/save-about-information">
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Picture</div>
          <input name="picture" type="file" class="border border-muted-b bg-input p-2"
                 accept=".jpg, .jpeg, .png, .webp">
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Instrument</div>
          <input name="instrument" type="text" class="border border-muted-b bg-input">
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Biography</div>
          <textarea name="bio"
                    class="border border-muted-b bg-input"
                    placeholder="Enter your biography here (max 650 chars)"
                    maxlength="650"
                    value={user.bio}></textarea>
        </label>
        <div class="w-full flex justify-end">
          <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                         mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all"
                  type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
  
  <!-- Parent 1 Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Parent 1 Information
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      <form method="POST" action="?/save-parent1-information">
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Parent 1 Name</div>
          <input name="parent1-name" type="text" class="border border-muted-b bg-input"
                 value={user['parent1/name']}>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Parent 1 Email</div>
          <input name="parent1-email" type="email" class="border border-muted-b bg-input"
                 value={user['parent1/email']}>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Parent 1 Phone</div>
          <input name="parent1-phone" type="tel" class="border border-muted-b bg-input"
                 value={user['parent1/phone']}>
        </label>
        <div class="w-full flex justify-end">
          <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                         mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all"
                  type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
  
  <!-- Parent 2 Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Parent 2 Information
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      <form method="POST" action="?/save-parent2-information">
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Parent 2 Name</div>
          <input name="parent2-name" type="text" class="border border-muted-b bg-input"
                 value={user['parent2/name']}>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Parent 2 Email</div>
          <input name="parent2-email" type="email" class="border border-muted-b bg-input"
                 value={user['parent2/email']}>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Parent 2 Phone</div>
          <input name="parent2-phone" type="tel" class="border border-muted-b bg-input"
                 value={user['parent2/phone']}>
        </label>
        <div class="w-full flex justify-end">
          <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1 mt-2
                         bg-emerald-800 hover:bg-emerald-700 text-white transition-all"
                  type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

