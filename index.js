const calendarTable = document.getElementById("kalender");

const masehiMontEl = document.querySelector(".secCB_masehi-txt");

const hijriMontEl = document.querySelector(".secCB_hijri");

const backMontBtn = document.querySelector(".secCB_masehi-btnLeft");
const nextMontBtn = document.querySelector(".secCB_masehi-btnRight");

const highlightDates = document.querySelector(".secIm");

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1;

// Fungsi untuk mengonversi tanggal Masehi ke Hijriah
function gregorianToHijri(year, month, day) {
  const hijriDate = HijriJS.gregorianToHijri(year, month, day);
  return {
    day: hijriDate.day,
    month: hijriDate.month,
    year: hijriDate.year,
  };
}

// Fungsi untuk mendapatkan nama bulan Hijriah dari indeks bulan
function getHijriMonthName(month) {
  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabi'ul Awwal",
    "Rabi'ul Akhir",
    "Jumadil Awwal",
    "Jumadil Akhir",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al Qi'dah",
    "Dhu al Hijjah",
  ];
  return hijriMonths[month - 1];
}

// Fungsi untuk membuat kalender
function createCalendar(year, month) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  // Mendapatkan nama bulan Masehi dan Hijriah
  const gregorianMonthName = new Date(year, month - 1, 1).toLocaleDateString(
    "id-ID",
    { month: "long" }
  );
  const hijriDate = gregorianToHijri(year, month, 1);
  const hijriMonthName = `${getHijriMonthName(hijriDate.month)} ${
    hijriDate.year
  }`;
  const matchingHijriMonth = getHijriMonthName(hijriDate.month);

  // Menentukan bulan Hijriah berikutnya
  const nextHijriDate = gregorianToHijri(year, month + 1, 1);
  const nextHijriMonthName = `${getHijriMonthName(nextHijriDate.month)} ${
    nextHijriDate.year
  }`;

  // Menampilkan dua bulan Hijriah di header

  masehiMontEl.innerHTML = `${gregorianMonthName}`;

  // Menetapkan teks di subheader

  hijriMontEl.innerHTML = `${hijriMonthName} - ${nextHijriMonthName}`;

  // Mengosongkan kalender
  calendarTable.innerHTML =
    "<tr><th><div>AH</div></th> <th>SE</th> <th>SL</th> <th>RA</th> <th>KA</th> <th>JU</th> <th>SB</th></tr>";

  let date = 1;
  let nextMonthDate = 1;
  let importantDates = [];

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay.getDay()) {
        const cell = document.createElement("td");
        row.appendChild(cell);
      } else if (date > lastDay.getDate()) {
        const cell = document.createElement("td");
        row.appendChild(cell);
        cell.innerHTML = nextMonthDate;
        nextMonthDate++;
      } else {
        const cell = document.createElement("td");
        if (
          date === new Date().getDate() &&
          month === new Date().getMonth() + 1 &&
          year === new Date().getFullYear()
        ) {
          cell.className = "today";
        }

        // Mengambil tanggal Hijriah
        const hijriDate = gregorianToHijri(year, month, date);
        cell.innerHTML = `<div> <span class="masehi-txt">${date} </span> <span class="hijri-txt"> ${hijriDate.day}</span> </div>`;
        row.appendChild(cell);

        // Menandai tanggal-tanggal penting
        if (
          parseInt(hijriDate.day) === 17 ||
          parseInt(hijriDate.day) === 19 ||
          parseInt(hijriDate.day) === 21
        ) {
          cell.classList.add("sunnah");
          importantDates.push(
            getFormattedDate(year, month, date, hijriDate, matchingHijriMonth)
          );
        }

        date++;
      }
    }
    calendarTable.appendChild(row);
  }

  // Menampilkan tanggal-tanggal penting di bawah kalender

  if (importantDates.length > 0) {
    const highlightList = importantDates
      .map((dateInfo) => {
        // Misahkan hari dan tanggal
        const [day, date] = dateInfo.split(", ");

        // Mendapatkan tanggal, bulan, dan tahun
        const [tanggal, bulan, tahun] = date.split(" ");

        // Format tanggal
        const formattedDate = `${tanggal} ${bulan} ${tahun}`;

        // Membuat teks untuk tombol WhatsApp
        const whatsappText = `Ingin berbekam pada ${day}, ${formattedDate}`;

        return `<div class="secIm-bx"> <div class="secIm-bx-date"> <span class="Day"> ${day}</span> <span class="Date">${formattedDate}</span> </div>
        <div class="secIm-bx-btn"> <a href="https://wa.me/6281234567890?text=${encodeURIComponent(
          whatsappText
        )}"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path
                d="M6.99967 9.50005L13.9997 2.50005M7.08473 9.71876L8.8368 14.2241C8.99115 14.621 9.06832 14.8194 9.17952 14.8774C9.27592 14.9276 9.39076 14.9277 9.48722 14.8776C9.59849 14.8198 9.67589 14.6214 9.83071 14.2247L14.2243 2.96619C14.364 2.60807 14.4339 2.42901 14.3957 2.31459C14.3625 2.21522 14.2845 2.13724 14.1851 2.10405C14.0707 2.06582 13.8917 2.1357 13.5335 2.27545L2.27504 6.66902C1.87833 6.82383 1.67997 6.90124 1.62216 7.01251C1.57205 7.10897 1.57212 7.2238 1.62234 7.3202C1.68028 7.4314 1.87873 7.50858 2.27563 7.66293L6.78096 9.415C6.86153 9.44633 6.90181 9.462 6.93573 9.48619C6.9658 9.50764 6.99209 9.53393 7.01353 9.56399C7.03773 9.59792 7.05339 9.6382 7.08473 9.71876Z"
                stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            </svg> Booking </a>
        </div>
      </div>`;
        // return `<li>${day}<br>${formattedDate}<br><a href="https://wa.me/6281234567890?text=${encodeURIComponent(
        //   whatsappText
        // )}">WhatsApp</a></li>`;
      })
      .join("");
    highlightDates.innerHTML = highlightList;
  }
}

// Fungsi untuk mendapatkan format tanggal yang sesuai
function getFormattedDate(year, month, day, hijriDate, matchingHijriMonth) {
  const gregorianDate = new Date(year, month - 1, day);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedGregorianDate = gregorianDate.toLocaleDateString(
    "id-ID",
    options
  );
  return `${formattedGregorianDate}`;
}

// Fungsi untuk memperbarui kalender
function updateCalendar() {
  createCalendar(currentYear, currentMonth);
}

// Mendengarkan peristiwa saat tombol "Bulan Sebelumnya" diklik

function bckBtn(a) {
  a.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }
    updateCalendar();
  });
}
function nxtBtn(a) {
  a.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
    updateCalendar();
  });
}
bckBtn(backMontBtn);
nxtBtn(nextMontBtn);
updateCalendar();
