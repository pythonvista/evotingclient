<template>
  <header class="border-gray-200 border-b-2">
    <nav class="bg-white px-4 lg:px-6 py-3">
      <div class="flex flex-wrap justify-between items-center mx-auto">
        <a
          @click="$router.push({ path: '/' })"
          class="flex flex-1 cursor-pointer items-center"
        >
          <img
            src="https://i.imgur.com/iVs2hUm.png"
            class="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
        </a>
        <div class="flex flex-1 items-center justify-end lg:order-2">
          <a
            v-if="!uid"
            @click="$router.push({ path: '/login' })"
            class="text-gray-800 hover:bg-gray-50 hover:text-white focus:ring-4 focus:ring-gray-300 md:flex xs:hidden cursor-pointer font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >Log in</a
          >
          <a
            v-if="!uid"
            @click="$router.push({ path: '/join' })"
            class="bg-gray-700 md:flex xs:hidden cursor-pointer text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >Get started</a
          >
          <a
            v-if="uid"
            @click="$router.push({ path: '/connect' })"
            class="bg-gray-700 cursor-pointer text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 md:flex xs:hidden mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >CONNECT</a
          >
          <button
          @click="OpenNav"
            data-collapse-toggle="mobile-menu-2"
            class="inline-flex items-center p-2 ml-1 text-sm rounded-lg lg:hidden  focus:outline-none focus:ring-2  dark:text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
           
            <svg v-if="!nav"
              class="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg v-else
              class=" w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="xs:hidden flex-1 justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
        >
          <ul
            class="flex flex-col justify-center items-center w-full font-medium lg:flex-row lg:space-x-8 lg:mt-0"
          >
            <li>
              <a
                @click="$router.push({ path: '/features' })"
                class="block pr-4 pl-3 text-gray-600 cursor-pointer hover:text-black rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
                >Features</a
              >
            </li>
            <li>
              <a
                @click="$router.push({ path: '/team' })"
                class="block pr-4 pl-3 cursor-pointer text-gray-600 hover:text-black rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
                >Team</a
              >
            </li>
            <li>
              <a
                @click="$router.push({ path: '/contact' })"
                class="block pr-4 pl-3 text-gray-600 cursor-pointer hover:text-black rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
                >Contact</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
let store
export default {
  data: () => ({
    sheet: true,
  }),
  props: ['uid'],
  methods: {
    OpenNav() {
      const { $event } = useNuxtApp();
      $event('opennav');
    },
  },
  created() {
    store = useLoungeStore()
  },
  computed: {
    nav() {
      return store.nav
    }
  }
};
</script>

<style></style>
