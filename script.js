/*
  渡辺美玲 公式サイト JavaScript
  初心者向けメモ：
  - このファイルではスマホ用メニューの開閉と、お問い合わせフォーム送信後の表示を担当しています。
  - フォームの送信先を変える場合は、index.html の form タグの action を編集してください。
*/

// ページの読み込みが終わってから処理を開始します。
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-button");
  const globalNav = document.querySelector(".global-nav");
  const navLinks = document.querySelectorAll(".global-nav a");
  const contactForm = document.querySelector(".contact-form");
  const formStatus = document.querySelector(".form-status");

  // スマホ用メニューを開閉します。
  if (menuButton && globalNav) {
    menuButton.addEventListener("click", function () {
      const isOpen = globalNav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // メニュー内のリンクを押したら、スマホメニューを閉じます。
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (globalNav && menuButton) {
        globalNav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Formspreeに送信し、送信後の結果をフォーム下に表示します。
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const submitButton = contactForm.querySelector("button[type='submit']");
      const formData = new FormData(contactForm);

      formStatus.className = "form-status";
      formStatus.textContent = "送信しています。少々お待ちください。";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "送信中...";
      }

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (response.ok) {
          contactForm.reset();
          formStatus.classList.add("is-success");
          formStatus.textContent = "お問い合わせを送信しました。内容を確認のうえ、必要に応じてご連絡いたします。";
        } else {
          formStatus.classList.add("is-error");
          formStatus.textContent = "送信できませんでした。時間をおいて再度お試しいただくか、メールまたは電話でお問い合わせください。";
        }
      } catch (error) {
        formStatus.classList.add("is-error");
        formStatus.textContent = "通信エラーが発生しました。メールまたは電話でのお問い合わせもご利用ください。";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "送信する";
        }
      }
    });
  }
});
