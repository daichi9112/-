/*
  渡辺美玲 公式サイト JavaScript
  初心者向けメモ：
  - このファイルではスマホ用メニューの開閉と、フォーム風ボタンの簡単な表示だけを担当しています。
  - 実際にお問い合わせ内容を送信する機能は入れていません。
*/

// ページの読み込みが終わってから処理を開始します。
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-button");
  const globalNav = document.querySelector(".global-nav");
  const navLinks = document.querySelectorAll(".global-nav a");
  const formButton = document.querySelector(".contact-form button");

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

  // フォームは見た目だけなので、押したときに案内を表示します。
  if (formButton) {
    formButton.addEventListener("click", function () {
      alert("このフォームは見た目のみです。正式な連絡先へお問い合わせください。");
    });
  }
});
