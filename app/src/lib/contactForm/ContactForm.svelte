<div class="relative bg-white" id='contact_form'>
    <div class="absolute inset-0">
      <div class="absolute inset-y-0 left-0 w-1/2 bg-gray-50"></div>
    </div>
    <div class="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
      <div class="bg-gray-50 py-10 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Get in touch
          </h2>
          <p class="mt-3 text-lg leading-6 text-gray-500">
            Are you ready to take your business to the next level? Whether your aims are customer acquisition, lead generation or encouraging repeat business, we’re here to see it through.
          </p>
          <dl class="mt-8 text-base text-gray-500">
            <!-- <div class="mt-6">
              <dt class="sr-only">Phone number</dt>
              <dd class="flex">
                <a class="flex" href="tel:+17063665561">
                <svg class="flex-shrink-0 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="ml-3">
                  +1 (706) 366-5561
                </span>
              </a>
              </dd>
            </div> -->
            <div class="mt-3">
              <dt class="sr-only">Email</dt>
              <dd class="flex">
                <a class="flex" href="mailto:hello@alenthea.com">
                <!-- Heroicon name: outline/mail -->
                <svg class="flex-shrink-0 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="ml-3">
                  hello@alenthea.com
                </span>
              </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="bg-white py-10 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
        <div class="max-w-3xl mx-auto lg:max-w-none">
            <!-- <form name="test" method="post" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="test" />
                <input type="text" name="bot-field" />
                <p>
                    <input type="text" name="name" />
                </p>
                <p>
                    <input type="email" name="email" />
                </p>
                <p>
                     <textarea name="message" />
                </p>
                <p>
                    <button type="submit">Send</button>
                </p>
            </form> -->

        



          <form name="contactForm" method="post" data-netlify="true" netlify-honeypot="bot-field" class="grid grid-cols-1 gap-y-6">
            <input type="hidden" name="form-name" value="contactForm" />
            <input type="text" name="bot-field" class="h-0" />
            <div>
              <label for="full-name" class="sr-only">Full name</label>
              <input type="text" name="full-name" id="full-name" autocomplete="name" class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" placeholder="Full name">
            </div>
            <div>
              <label for="email" class="sr-only">Email</label>
              <input id="email" name="email" type="email" autocomplete="email" class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" placeholder="Email">
            </div>
            <div>
              <label for="phone" class="sr-only">Phone</label>
              <input type="text" name="phone" id="phone" autocomplete="tel" class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" placeholder="Phone">
            </div>
            <div>
              <label for="message" class="sr-only">Message</label>
              <textarea id="message" name="message" rows="4" class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md" placeholder="Message"></textarea>
            </div>
            <div>
              <button type="submit" class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>