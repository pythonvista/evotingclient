<template>
  <section
    class="bg-gray-900 xs:h-auto md:min-h-screen flex justify-center items-center"
  >
    <div
      class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
    >
      <div
        class="mr-auto xs:flex md:block xs:flex-col xs:justify-center xs:text-center md:text-left xs:items-center xs:order-last md:order-first place-self-center lg:col-span-7"
      >
        <h1
          class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white"
        >
          EMETERR AI-X
        </h1>
        <p
          class="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-gray-400"
        >
          Introducing EMETERR AI-X: The Next-Generation WhatsApp integration for
          Researchers, Students, Developers, and Businesses
        </p>
        <div class="flex xs:justify-center md:justify-start items-center gap-3">
          <a
            @click="$router.push({ path: '/join' })"
            class="inline-flex items-center cursor-pointer justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Get started
            <svg
              class="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            @click="$router.push({ path: '/connect' })"
            class="inline-flex items-center cursor-pointer justify-center px-5 py-3 text-base font-medium text-center border rounded-lg focus:ring-4 text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-800"
          >
            Connect Whatsapp
          </a>
        </div>
      </div>
      <div
        class="lg:mt-0 xs:order-first overflow-hidden md:order-last lg:col-span-5 lg:flex"
      >
        <HomeHeroslider></HomeHeroslider>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style></style>
