<script setup>

</script>

<template>

    <div class="footer-content">
      <div class="social-media-icons">
        <a href="https://www.instagram.com">
          <img src="../assets/instagram.png" alt="instagram">
        </a>
        <a href="https://www.facebook.com">
          <img src="../assets/facebook.png" alt="facebook">
        </a>
        <a href="https://www.twitter.com">
          <img src="../assets/twitter.png" alt="twitter">
        </a>
        <a href="https://www.youtube.com">
          <img src="../assets/youtube.jpeg" alt="youtube">
        </a>
      </div>

      <div class="copyright">
        <p>

          copyright &copy; 2023 

          <a href="https://www.linkedin.com/in/mohamad-hmdian-91b053156/">Mohamad Hmidan</a>
        </p>
      </div>

    </div>
</template>
<style scoped>
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6b3b3;
  padding: 15px;
  justify-content: space-around;
  box-shadow: 0px 0px 09px 0px black;
}

.social-media-icons {
  display: flex;
  align-items: center;
  border: none;
}

.social-media-icons a {
  margin-right: 10px;
  text-decoration: none;
}

.social-media-icons img {
  width: 30px;
  height: 30px;
}

.footer-content p {
  margin: 0;
}

.footer-content p a {
  text-decoration: none;
  color: #000;
}

.footer-content p a:hover {
  color: #ff0000;
}

/* Responsive Styles */

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-content p {
    margin-top: 10px;
  }
}
</style>