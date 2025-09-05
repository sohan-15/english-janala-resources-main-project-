const loadLessons = () =>
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => {
      displayLessons(json.data);
      //   displayLessons(data);
    });
// step=2
const loadlevelword = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/ ${id}`;
  fetch(url)
    .then((rest) => rest.json())
    .then((data) => {
      displayLessonsWord(data.data);
    });
};
// {
//     "id": 19,
//     "level": 1,
//     "word": "Sincere",
//     "meaning": "সত্‍ / আন্তরিক",
//     "pronunciation": "সিনসিয়ার"
// }
const displayLessonsWord = (words) => {
  console.log(words);
  const wordcontainer = document.getElementById("word-container");
  wordcontainer.innerHTML = "";
  for (const voca of words) {
    console.log(voca);
    const div = document.createElement("div");
    div.innerHTML = ` <div
          class="bg-gray-100 space-y-4 rounded-xl shadow-2xl text-center py-10 px-10"
        >
          <h2 class="font-bold text-xl">${voca.word}</h2>
          <p class="font-semibold"> Meaning/Pronounciation</p>
          <div class="text-2xl font-semibold font-bangla">"${voca.meaning} / ${voca.pronunciation}"</div>
          <div class="flex justify-evenly gap-30 items-center">
            <div>
              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                <i class="fa-solid fa-circle-info"></i>
              </button>
            </div>
            <div>
              <button class="btn1 bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
        </div>`;
    wordcontainer.appendChild(div);
  }
};
// step=01
const displayLessons = (lessons) => {
  //   console.log(lessons);
  // 1. get the container $ empty
  const levelcontainer = document.getElementById("level-container");
  levelcontainer.innerHTML = "";
  // 2.get into every lessons
  lessons.forEach((element) => {
    // console.log(element);
    const div = document.createElement("div");

    // 3. create element
    div.innerHTML = ` <button onclick="loadlevelword(  ${element.level_no} )" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${element.level_no} </button>`;

    // 4. append into conatainer
    levelcontainer.appendChild(div);
  });
};
loadLessons();
