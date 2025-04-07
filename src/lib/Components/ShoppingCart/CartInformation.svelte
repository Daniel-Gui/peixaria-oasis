<script>
    const faqs = [
        {
            title: 'How do I create an account?',
            content: 'Click the "Sign Up" button in the top right corner and follow the registration process.'
        },
        {
            title: 'I forgot my password. What should I do?',
            content: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.'
        },
        {
            title: 'How do I update my profile information?',
            content: 'Go to "My Account" settings and select "Edit Profile" to make changes.'
        }
    ];
</script>

<div class="join join-vertical bg-base-100 rounded-box">
    {#each faqs as faq}
    <div class="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" checked="checked" />
      <div class="collapse-title font-semibold">{faq.title}</div>
      <div class="collapse-content text-sm">{faq.content}</div>
    </div>
    {/each}
</div>