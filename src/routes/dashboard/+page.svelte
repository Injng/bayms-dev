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
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Name</div>
          <input name="name" type="text" class="border border-muted-b bg-input">
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Email</div>
          <input name="email" type="email" class="border border-muted-b bg-input">
        </label>
        <div class="grid grid-cols-2">
          <label class="grid grid-cols-[150px_1fr] mb-2 mr-5 items-center">
            <div>Phone</div>
            <input name="phone" type="tel" class="border border-muted-b bg-input">
          </label>
          <label class="grid grid-cols-[150px_1fr] mb-2 ml-5 items-center">
            <div>Birthday</div>
            <input name="birthday" type="date" class="border border-muted-b bg-input">
        </label>
        </div>
      </form>
    </div>
  </div>

  <!-- School and Location Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Address and School Information
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5 border-b border-muted-b">
      <form method="POST" action="?/save-personal-information">
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Street</div>
          <input name="name" type="text" class="border border-muted-b bg-input">
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>City</div>
          <input name="email" type="text" class="border border-muted-b bg-input">
        </label>
        <div class="grid grid-cols-2">
          <label class="grid grid-cols-[150px_1fr] mb-2 mr-5 items-center">
            <div>State</div>
            <input name="state" type="text" class="border border-muted-b bg-input">
          </label>
          <label class="grid grid-cols-[150px_1fr] ml-5 items-center">
            <div>Postal Code</div>
            <input name="postal" type="text" class="border border-muted-b bg-input">
          </label>
        </div>
      </form>
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      <form method="POST" action="?/save-personal-information">
        <div class="grid grid-cols-2">
          <label class="grid grid-cols-[150px_1fr] mb-2 items-center mr-5">
            <div>School Name</div>
            <input name="school" type="text" class="border border-muted-b bg-input">
          </label>
          <label class="grid grid-cols-[150px_1fr] mb-2 items-center ml-5">
            <div>Grade</div>
            <input name="grade" type="number" class="border border-muted-b bg-input">
          </label>
        </div>
      </form>
    </div>
  </div>

  <!-- About Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      About
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      <form method="POST" action="?/save-personal-information">
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Picture</div>
          <input name="picture" type="file" class="border border-muted-b bg-input p-2"
                 accept=".jpg, .jpeg, .png, .webp">
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Instrument</div>
          <input name="instrument" type="email" class="border border-muted-b bg-input">
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Biography</div>
          <textarea name="bio"
                    class="border border-muted-b bg-input"
                    placeholder="Enter your biography here (max 650 chars)"
                    maxlength="650"></textarea>
        </label>
      </form>
    </div>
  </div>
  
  <!-- Parent 1 Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Parent 1 Information
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      <form method="POST" action="?/save-personal-information">
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Parent 1 Name</div>
          <input name="parent1-name" type="text" class="border border-muted-b bg-input">
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Parent 1 Email</div>
          <input name="parent1-email" type="email" class="border border-muted-b bg-input">
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Parent 1 Phone</div>
          <input name="parent1-phone" type="tel" class="border border-muted-b bg-input">
        </label>
      </form>
    </div>
  </div>
  
  <!-- Parent 2 Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Parent 2 Information
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      <form method="POST" action="?/save-personal-information">
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Parent 2 Name</div>
          <input name="parent2-name" type="text" class="border border-muted-b bg-input">
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Parent 2 Email</div>
          <input name="parent2-email" type="email" class="border border-muted-b bg-input">
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-center">
          <div>Parent 2 Phone</div>
          <input name="parent2-phone" type="tel" class="border border-muted-b bg-input">
        </label>
      </form>
    </div>
  </div>
</div>

