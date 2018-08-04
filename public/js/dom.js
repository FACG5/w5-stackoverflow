const btn = document.getElementById('btn');
const result = document.getElementById('result');
const inputlang = document.getElementById('inputlang');
const errors = document.getElementById('error');
const loaddiv = document.getElementById('loadingimg');

// const validation = (arr) => {
//   if (arr.has_more === false) {
//     const error = document.createElement('h1');
//     error.classList.add('header');
//     error.textContent = 'Sorry  Not Found';
//     errors.appendChild(error);
//   }
// };


const rendering = (arr) => {
  arr.items.forEach((element) => {
    const list = document.createElement('div');
    // linkQues
    const detQues = document.createElement('div');
    const titles = document.createElement('a');
    const tag = document.createElement('div');
    const answerCount = document.createElement('div');

    titles.setAttribute('href', element.link);
    titles.textContent = `Questions:${element.title}`;
    titles.classList.add('question-header');
    tag.textContent = ` Tags : ${element.tags} `;
    answerCount.textContent = `Answer Count : ${element.answer_count}`;

    detQues.appendChild(titles);
    detQues.appendChild(tag);
    detQues.appendChild(answerCount);

    // image&name

    const owner = document.createElement('div');
    const image = document.createElement('img');
    const pr = document.createElement('p');
    const nameOwner = document.createElement('a');

    image.src = element.owner.profile_image;
    image.classList.add('profile_image');
    nameOwner.setAttribute('href', element.owner.link);
    nameOwner.textContent = element.owner.display_name;
    nameOwner.classList.add('nameOwner');

    pr.appendChild(nameOwner);
    owner.appendChild(image);
    owner.appendChild(pr);
    owner.classList.add('ownner');

    list.appendChild(owner);
    list.appendChild(detQues);
    list.classList.add('list');
    result.appendChild(list);
  });
};


btn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputvalue = inputlang.value;
  result.textContent = '';
  errors.textContent = '';

  if (inputlang.value.trim() === '') {
    alert('Please Enter a programming language');
    return;
  }
  const loadim = document.createElement('img');
  loadim.src = 'public/img/loading.gif';
  loaddiv.appendChild(loadim);
  feachApi(inputvalue, 'POST', '/search', (err, arr) => {
    loaddiv.style.display = 'none';
    if (err) {
      // validation(arr);
      const error = document.createElement('h1');
      error.classList.add('header');
      error.textContent = 'Sorry  Not Found';
      errors.appendChild(error);
    } else {
      rendering(arr);
    }
  });
});
