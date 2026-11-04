/* =====================================
   MOBILE SIDEBAR
===================================== */

const sidebar = document.getElementById("sidebar");

const menuToggle = document.getElementById("menuToggle");

const sidebarOverlay = document.getElementById("sidebarOverlay");


menuToggle.addEventListener("click", () => {

    sidebar.classList.toggle("open");

    sidebarOverlay.classList.toggle("show");

});


sidebarOverlay.addEventListener("click", () => {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

});


document.querySelectorAll(".menu a").forEach(link => {

    link.addEventListener("click", () => {

        sidebar.classList.remove("open");

        sidebarOverlay.classList.remove("show");

    });

});


/* =====================================
   CLOCK AND DATE
===================================== */

function updateClock() {

    const now = new Date();

    document.getElementById("currentTime").textContent =
        now.toLocaleTimeString("id-ID");

    document.getElementById("currentDate").textContent =
        now.toLocaleDateString("id-ID", {

            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"

        });

    document.getElementById("todayName").textContent =
        now.toLocaleDateString("id-ID", {

            weekday: "long"

        });

    document.getElementById("journalDate").textContent =
        now.toLocaleDateString("id-ID");

}

setInterval(updateClock, 1000);

updateClock();


/* =====================================
   GREETING
===================================== */

function updateGreeting() {

    const hour = new Date().getHours();

    let title;
    let message;

    if (hour >= 5 && hour < 12) {

        title = "Good Morning.";
        message = "A new day is another opportunity to grow.";

    }

    else if (hour >= 12 && hour < 18) {

        title = "Good Afternoon.";
        message = "Keep going. Take things one step at a time.";

    }

    else if (hour >= 18 && hour < 22) {

        title = "Good Evening.";
        message = "Take a moment to appreciate yourself.";

    }

    else {

        title = "Good Night.";
        message = "Rest well. Tomorrow is another opportunity.";

    }

    document.getElementById("greeting").textContent = title;

    document.getElementById("greetingMessage").textContent = message;

}

updateGreeting();


/* =====================================
   DAILY THOUGHT
===================================== */

const thoughts = [

    "Every day is another opportunity to grow.",

    "You don't need to rush. Your journey has its own timing.",

    "Small progress is still progress.",

    "Your life doesn't have to look like everyone else's.",

    "Focus on becoming a better version of yourself.",

    "Sometimes, the best thing you can do is take a break.",

    "Don't let yesterday take too much of today.",

    "You are allowed to start again."

];

function setDailyThought() {

    const today = new Date().toDateString();

    let savedDate = localStorage.getItem("thoughtDate");

    let index = localStorage.getItem("thoughtIndex");

    if (savedDate !== today) {

        index = Math.floor(Math.random() * thoughts.length);

        localStorage.setItem("thoughtDate", today);

        localStorage.setItem("thoughtIndex", index);

    }

    document.getElementById("dailyThought").textContent =
        thoughts[Number(index)];

}

setDailyThought();


/* =====================================
   MOTIVATION
===================================== */

const motivationMessages = [

    {
        title: "Feeling Lost?",
        text: "Take a deep breath. You don't need to solve everything right now."
    },

    {
        title: "Stop Overthinking.",
        text: "Not everything needs an answer today. Give yourself some time."
    },

    {
        title: "You Are Enough.",
        text: "Your worth is not measured by how much you achieve."
    },

    {
        title: "Keep Moving Forward.",
        text: "Even the smallest step can take you somewhere meaningful."
    },

    {
        title: "Take A Break.",
        text: "You are a human being, not a machine. Rest is important."
    },

    {
        title: "Focus On Yourself.",
        text: "Don't compare your chapter one with someone else's chapter twenty."
    },

    {
        title: "Start Again.",
        text: "A bad day doesn't mean you have a bad life."
    },

    {
        title: "Trust Your Journey.",
        text: "You may not understand everything now, but you can keep learning."
    }

];


document.getElementById("motivationButton").addEventListener("click", () => {

    const random = Math.floor(
        Math.random() * motivationMessages.length
    );

    document.getElementById("motivationTitle").textContent =
        motivationMessages[random].title;

    document.getElementById("motivationText").textContent =
        motivationMessages[random].text;

});


/* =====================================
   DAILY JOURNAL
===================================== */

const journalInput = document.getElementById("journalInput");

const saveJournal = document.getElementById("saveJournal");

const journalList = document.getElementById("journalList");


function getJournals() {

    return JSON.parse(
        localStorage.getItem("myJournals") || "[]"
    );

}


function renderJournals() {

    const journals = getJournals();

    journalList.innerHTML = "";

    journals.slice().reverse().forEach((journal) => {

        const entry = document.createElement("div");

        entry.className = "journal-entry";

        const date = document.createElement("small");

        date.textContent = journal.date;

        const content = document.createElement("p");

        content.textContent = journal.text;

        const remove = document.createElement("button");

        remove.className = "delete-btn";

        remove.textContent = "Delete Entry";

        remove.addEventListener("click", () => {

            deleteJournal(journal.id);

        });

        entry.append(date, content, remove);

        journalList.appendChild(entry);

    });

    document.getElementById("journalCount").textContent =
        journals.length + " Entries";

}


saveJournal.addEventListener("click", () => {

    const text = journalInput.value.trim();

    if (!text) {

        alert("Please write something first.");

        return;

    }

    const journals = getJournals();

    const today = new Date();

    journals.push({

        id: Date.now(),

        date: today.toLocaleString("id-ID"),

        text: text

    });

    localStorage.setItem(
        "myJournals",
        JSON.stringify(journals)
    );

    journalInput.value = "";

    renderJournals();

    alert("Your journal has been saved!");

});


function deleteJournal(id) {

    const journals = getJournals().filter(
        journal => journal.id !== id
    );

    localStorage.setItem(
        "myJournals",
        JSON.stringify(journals)
    );

    renderJournals();

}

renderJournals();


/* =====================================
   PERSONAL GOALS
===================================== */

const goalInput = document.getElementById("goalInput");

const addGoal = document.getElementById("addGoal");

const goalList = document.getElementById("goalList");


function getGoals() {

    return JSON.parse(
        localStorage.getItem("myGoals") || "[]"
    );

}


function renderGoals() {

    const goals = getGoals();

    goalList.innerHTML = "";

    goals.forEach(goal => {

        const item = document.createElement("div");

        item.className = "goal-item";

        if (goal.done) {

            item.classList.add("completed");

        }

        const label = document.createElement("label");

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = goal.done;

        checkbox.addEventListener("change", () => {

            toggleGoal(goal.id);

        });

        const text = document.createElement("span");

        text.textContent = goal.text;

        label.append(checkbox, text);

        const remove = document.createElement("button");

        remove.className = "delete-btn";

        remove.textContent = "Delete";

        remove.addEventListener("click", () => {

            deleteGoal(goal.id);

        });

        item.append(label, remove);

        goalList.appendChild(item);

    });

    document.getElementById("goalCount").textContent =
        goals.length + " Goals";

}


addGoal.addEventListener("click", () => {

    const text = goalInput.value.trim();

    if (!text) {

        alert("Please enter your goal.");

        return;

    }

    const goals = getGoals();

    goals.push({

        id: Date.now(),

        text: text,

        done: false

    });

    localStorage.setItem(
        "myGoals",
        JSON.stringify(goals)
    );

    goalInput.value = "";

    renderGoals();

});


function toggleGoal(id) {

    const goals = getGoals();

    const updated = goals.map(goal => {

        if (goal.id === id) {

            goal.done = !goal.done;

        }

        return goal;

    });

    localStorage.setItem(
        "myGoals",
        JSON.stringify(updated)
    );

    renderGoals();

}


function deleteGoal(id) {

    const goals = getGoals().filter(
        goal => goal.id !== id
    );

    localStorage.setItem(
        "myGoals",
        JSON.stringify(goals)
    );

    renderGoals();

}

renderGoals();


/* =====================================
   NOTIFICATION PERMISSION
===================================== */

const enableNotification =
    document.getElementById("enableNotification");

const notificationStatus =
    document.getElementById("notificationStatus");


function updateNotificationStatus() {

    if (!("Notification" in window)) {

        notificationStatus.textContent =
            "Your browser does not support notifications.";

        return;

    }

    if (Notification.permission === "granted") {

        notificationStatus.textContent =
            "Notifications permission granted.";

    }

    else if (Notification.permission === "denied") {

        notificationStatus.textContent =
            "Notifications blocked. Please change browser settings.";

    }

    else {

        notificationStatus.textContent =
            "Notifications are not enabled.";

    }

}


enableNotification.addEventListener("click", async () => {

    if (!("Notification" in window)) {

        alert("Notifications are not supported by this browser.");

        return;

    }

    if (!("serviceWorker" in navigator)) {

        alert("This browser does not support the required notification features.");

        return;

    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {

        localStorage.setItem("reminderEnabled", "true");

        notificationStatus.textContent =
            "Daily reminders are enabled!";

        checkReminder();

    }

    else {

        notificationStatus.textContent =
            "Please allow notifications in browser settings.";

    }

});

updateNotificationStatus();


/* =====================================
   MORNING & NIGHT REMINDER
===================================== */

const reminderMessages = {

    morning: {

        title: "Good Morning ☀️",

        body: "A new day has arrived. Take a deep breath, organize your thoughts, and start with one small step."

    },

    night: {

        title: "Time to Reflect 🌙",

        body: "How was your day? Appreciate your progress, learn from your experiences, and give yourself time to rest."

    }

};


function checkReminder() {

    if (
        !("Notification" in window) ||
        Notification.permission !== "granted"
    ) {

        return;

    }

    if (
        localStorage.getItem("reminderEnabled") !== "true"
    ) {

        return;

    }

    const now = new Date();

    const hour = now.getHours();

    const minute = now.getMinutes();

    const today = now.toDateString();

    let type = null;

    if (hour === 7 && minute === 0) {

        type = "morning";

    }

    else if (hour === 21 && minute === 0) {

        type = "night";

    }

    if (!type) return;


    const storageKey = "reminder-" + today + "-" + type;

    if (localStorage.getItem(storageKey)) {

        return;

    }


    const reminder = reminderMessages[type];

    new Notification(reminder.title, {

        body: reminder.body,

        icon: "img/profile.jpg"

    });


    localStorage.setItem(storageKey, "true");

}


// Check every 10 seconds while website is open.

setInterval(checkReminder, 10000);

checkReminder();


/* =====================================
   ACTIVE NAVIGATION
===================================== */

const sections = document.querySelectorAll(
    "section[id]"
);

const navLinks = document.querySelectorAll(".menu a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 150;

        if (window.scrollY >= top) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});
