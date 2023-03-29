const introImg = document.getElementById('introImg');
    
function changeIntroImg() {
  if (window.innerWidth > window.innerHeight *1.832) {
    introImg.style.width = '100vw';
    introImg.style.height = 'auto';
  } else {
    introImg.style.width = 'auto';
    introImg.style.height = '100vh';
  };
};

changeIntroImg();
addEventListener('resize', (event) => {
  changeIntroImg();
});

function agreedBtn() {
  alert('wahoo')
  window.scrollTo(0, window.innerHeight);
};
