<script setup lang="ts">
defineOptions({
  name: 'SignatureRequiredModal',
})

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'go-to-signatures'): void
}>()

const closeModal = () => {
  emit('update:modelValue', false)
}

const handleGoToSignatures = () => {
  emit('go-to-signatures')
  closeModal()
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-[rgba(151,155,164,0.75)] flex items-center justify-center z-50"
  >
    <div class="flex flex-col items-start w-[600px] rounded-xl overflow-hidden shadow-lg absolute">
      <!-- Modal header -->
      <div
        class="flex flex-row justify-end items-center w-full h-12 px-6 pt-6 pb-0 gap-1 bg-white rounded-t-xl"
      >
        <button @click="closeModal" class="w-6 h-6 flex items-center justify-center">
          <span class="material-icons text-neutral-500">close</span>
        </button>
      </div>

      <!-- Modal content -->
      <div
        class="flex flex-col justify-center items-center w-full px-8 pb-8 gap-6 bg-white rounded-b-xl"
      >
        <!-- Illustration -->
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_7_17629)">
            <g filter="url(#filter0_dd_7_17629)">
              <rect
                x="5"
                y="5"
                width="150.4"
                height="150.4"
                rx="75.2"
                fill="url(#paint0_linear_7_17629)"
              />
            </g>
            <rect
              x="13.2637"
              y="13.2637"
              width="133.873"
              height="133.873"
              rx="66.9363"
              fill="white"
            />
            <g clip-path="url(#clip1_7_17629)">
              <path
                d="M109.27 109.011H50.3295C47.9353 109.011 45.7346 107.812 44.592 105.883C43.5581 104.139 43.5339 102.036 44.5255 100.268L73.999 47.8312C75.1235 45.8298 77.3484 44.5895 79.803 44.5895C82.2576 44.5895 84.4825 45.8298 85.607 47.8312L115.074 100.262C116.066 102.03 116.042 104.133 115.008 105.877C113.865 107.806 111.665 109.005 109.27 109.005V109.011ZM79.7969 48.1847C78.6422 48.1847 77.6567 48.706 77.167 49.5809L47.6995 102.012C47.1977 102.905 47.5 103.678 47.7237 104.055C48.2195 104.894 49.217 105.409 50.3355 105.409H109.27C110.383 105.409 111.387 104.888 111.882 104.055C112.106 103.678 112.408 102.905 111.906 102.012L82.4329 49.5809C81.9432 48.706 80.9578 48.1847 79.803 48.1847H79.7969Z"
                fill="#D5A308"
              />
              <path
                d="M79.7967 87.7206C78.7931 87.7206 77.9829 86.9177 77.9829 85.923V69.7982C77.9829 68.8036 78.7931 68.0006 79.7967 68.0006C80.8003 68.0006 81.6104 68.8036 81.6104 69.7982V85.923C81.6104 86.9177 80.8003 87.7206 79.7967 87.7206Z"
                fill="#D5A308"
              />
              <path
                d="M79.7967 96.6489C78.7931 96.6489 77.9829 95.8459 77.9829 94.8512V94.7674C77.9829 93.7727 78.7931 92.9697 79.7967 92.9697C80.8003 92.9697 81.6104 93.7727 81.6104 94.7674V94.8512C81.6104 95.8459 80.8003 96.6489 79.7967 96.6489Z"
                fill="#D5A308"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_dd_7_17629"
              x="-1"
              y="3"
              width="162.4"
              height="162.4"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="2"
                operator="erode"
                in="SourceAlpha"
                result="effect1_dropShadow_7_17629"
              />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.06 0"
              />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_17629" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="2"
                operator="erode"
                in="SourceAlpha"
                result="effect2_dropShadow_7_17629"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_7_17629"
                result="effect2_dropShadow_7_17629"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect2_dropShadow_7_17629"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_7_17629"
              x1="80.2"
              y1="5"
              x2="80.2"
              y2="134.327"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FAEBBD" />
              <stop offset="1" stop-color="white" />
            </linearGradient>
            <clipPath id="clip0_7_17629">
              <rect width="160" height="160" fill="white" />
            </clipPath>
            <clipPath id="clip1_7_17629">
              <rect
                width="72"
                height="64.4211"
                fill="white"
                transform="translate(43.7998 44.5895)"
              />
            </clipPath>
          </defs>
        </svg>

        <!-- Title -->
        <div class="flex justify-center items-center w-full px-4 h-12">
          <h2 class="text-lg font-semibold text-neutral-900 text-center tracking-tight">
            Before creating a new Rapid Response you must create a signature first.
          </h2>
        </div>

        <!-- Footer buttons -->
        <div class="flex flex-row justify-center items-center w-full pt-3 gap-4">
          <button
            class="min-w-[120px] h-9 px-4 py-2 flex justify-center items-center bg-blue-900 text-white font-medium rounded-md"
            @click="handleGoToSignatures"
          >
            Go to signatures
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
