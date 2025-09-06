// =======================
// ১. Load Lessons (Level list)
// =======================
const loadLessons = () =>
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => {
      displayLessons(json.data);
    });

// =======================
// ২. removeActive ফাংশন
// =======================
const removeActive = () => {
  const lessonsButtons = document.querySelectorAll(".lesson-btn");
  lessonsButtons.forEach((btn) => btn.classList.remove("active"));
};

// =======================
// ৩. loadlevelword ফাংশন
// =======================
const loadlevelword = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((rest) => rest.json())
    .then((data) => {
      removeActive();
      const clickbtn = document.getElementById(`lesson-btn-${id}`);
      clickbtn.classList.add("active");
      displayLessonsWord(data.data);
    });
};

// =======================
// ৪. LoadWordDetail ফাংশন
// =======================
const LoadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

// =======================
// ৫. displayWordDetails ফাংশন
// =======================
const displayWordDetails = (word) => {
  const detailscontainer = document.getElementById("details-container");
  detailscontainer.innerHTML = `
    <div class="space-y-5">
      <div>
        <h2 class="text-2xl font-bold">
          ${
            word.word
          } ( <i class="fa-solid fa-microphone-lines" onclick="speakWord('${
    word.word
  }')"></i> ${word.pronunciation || "Not found"} )
        </h2>
        <p>${word.meaning || "Meaning not found"}</p>
      </div>
      <div>
        <h2 class="font-bold">Example</h2>
        <p>${word.example || "No example available"}</p>
      </div>
      <div>    
        <h2 class="font-bold">Synonym</h2>
        ${
          word.synonyms
            ? word.synonyms
                .map((sy) => `<span class="btn">${sy}</span>`)
                .join(" ")
            : "<p>No synonyms available</p>"
        }
      </div>
    </div>
  `;
  document.getElementById("word_modal").showModal();
};

// =======================
// ৬. Spinner Management
// =======================
const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// =======================
// ৭. Text-to-Speech ফাংশন
// =======================
const speakWord = (word) => {
  if (!word) return;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
};

// =======================
// ৮. displayLessonsWord ফাংশন
// =======================
const displayLessonsWord = (words) => {
  const wordcontainer = document.getElementById("word-container");
  wordcontainer.innerHTML = "";

  if (words.length === 0) {
    wordcontainer.innerHTML = `
      <div class="space-y-6 text-center bg-red-100 rounded-xl shadow-sm col-span-full py-5">
        <img class="mx-auto" src="./alert-error.png" alt="" />
        <p class="opacity-55">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="text-3xl font-bangla">নেক্সট Lesson এ যান</h1>
      </div>`;
    manageSpinner(false);
    return;
  }

  for (const voca of words) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="bg-gray-100 space-y-4 rounded-xl shadow-2xl text-center py-10 px-10">
        <h2 class="font-bold text-xl">${voca.word || "Word not found"}</h2>
        <p class="font-semibold">Meaning / Pronunciation</p>
        <div class="text-2xl font-semibold font-bangla">
          "${voca.meaning || "Meaning not found"} / ${
      voca.pronunciation || "Not found"
    }"
        </div>
        <div class="flex justify-evenly gap-30 items-center">
          <div>
            <button onclick="LoadWordDetail(${
              voca.id
            })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-circle-info"></i>
            </button>
          </div>
          <div>
            <button onclick="speakWord('${
              voca.word
            }')" class="btn1 bg-[#1A91FF10] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-microphone-lines"></i>
            </button>
          </div>
        </div>
      </div>`;
    wordcontainer.appendChild(div);
  }
  manageSpinner(false);
};

// =======================
// ৯. displayLessons ফাংশন
// =======================
const displayLessons = (lessons) => {
  const levelcontainer = document.getElementById("level-container");
  levelcontainer.innerHTML = "";

  lessons.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button id="lesson-btn-${element.level_no}" 
              onclick="loadlevelword(${element.level_no})" 
              class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson - ${element.level_no}
      </button>`;
    levelcontainer.appendChild(div);
  });
};

// =======================
// ১০. Initial Load
// =======================
loadLessons();

// =======================
// ১১. Search button functionality
// =======================
document.getElementById("btn-search").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();

  if (!searchValue) {
    alert("Please enter a word to search!");
    return;
  }

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allwords = data.data;

      const filterwords = allwords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );

      if (filterwords.length === 0) {
        const wordcontainer = document.getElementById("word-container");
        wordcontainer.innerHTML = `
          <div class="text-center bg-red-100 rounded-xl py-5 col-span-full">
            <p class="text-gray-600">No words found for "<b>${searchValue}</b>"</p>
          </div>`;
        return;
      }

      displayLessonsWord(filterwords);
    })
    .catch((error) => console.error("Error fetching words:", error));
});
