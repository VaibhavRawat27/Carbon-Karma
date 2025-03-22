const actions = [
    { label: "Biked instead of driving", credits: 10 },
    { label: "Recycled plastic", credits: 5 },
    { label: "Used reusable bag", credits: 3 },
    { label: "Planted a tree", credits: 20 },
    { label: "Saved electricity", credits: 7 },
    { label: "Took public transport", credits: 8 },
    { label: "Used metal straw", credits: 2 },
    { label: "Reduced food waste", credits: 6 }
  ];
  
  const challenges = [
    "Use a reusable bottle today 💧",
    "Take public transport instead of car 🚍",
    "Eat a vegetarian meal 🥗",
    "Turn off lights when leaving a room 💡",
    "Avoid single-use plastic 🛍️",
    "Collect rainwater 🌧️",
    "Donate unused clothes 👕",
    "Switch to dark mode to save energy 🌓"
  ];
  
  let totalCredits = 0;
  let actionLog = [];
  let ecoStreak = 0;
  
  // DOM Elements
  const creditScore = document.getElementById("creditScore");
  const historyList = document.getElementById("actionHistory");
  const buttonsContainer = document.getElementById("actionButtons");
  const streakEl = document.getElementById("ecoStreak");
  const impactText = document.getElementById("impactText");
  const dailyChallenge = document.getElementById("dailyChallenge");
  const newsFeed = document.getElementById("newsFeed");
  
  // On Page Load
  window.onload = function () {
    const storedLog = localStorage.getItem("carbonLog");
    const storedStreak = localStorage.getItem("ecoStreak");
    const lastDate = localStorage.getItem("lastActionDate");
  
    if (storedLog) {
      actionLog = JSON.parse(storedLog);
      totalCredits = actionLog.reduce((sum, a) => sum + a.credits, 0);
    }
  
    if (storedStreak) {
      ecoStreak = parseInt(storedStreak);
    }
  
    if (lastDate && !isToday(new Date(lastDate))) {
      ecoStreak = 0; // Reset if a day is missed
    }
  
    updateUI();
    createButtons();
    loadEcoNews();
    spinChallenge();
  };
  
  // Log Action
  function logAction(action) {
    const today = new Date().toISOString().split("T")[0];
    const lastDate = localStorage.getItem("lastActionDate");
  
    if (!lastDate || lastDate !== today) {
      ecoStreak += 1;
      localStorage.setItem("lastActionDate", today);
    }
  
    totalCredits += action.credits;
    actionLog.unshift({ ...action, date: today });
    updateUI();
  }
  
  // Update UI
  function updateUI() {
    creditScore.textContent = totalCredits;
    streakEl.textContent = ecoStreak;
    updateImpact();
    updateBadges();
  
    historyList.innerHTML = "";
    actionLog.forEach((entry) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `✅ ${entry.label} (+${entry.credits} credits)`;
      historyList.appendChild(li);
    });
  
    // Save to localStorage
    localStorage.setItem("carbonLog", JSON.stringify(actionLog));
    localStorage.setItem("ecoStreak", ecoStreak.toString());
  }
  
  // Create Action Buttons
  function createButtons() {
    buttonsContainer.innerHTML = "";
    actions.forEach(action => {
      const btn = document.createElement("button");
      btn.className = "btn btn-success btn-action m-1";
      btn.innerHTML = `${action.label} (+${action.credits})`;
      btn.onclick = () => logAction(action);
      buttonsContainer.appendChild(btn);
    });
  }
  
  // Download CSV
  function downloadCSV() {
    if (actionLog.length === 0) {
      alert("No actions to export!");
      return;
    }
  
    let csvContent = "data:text/csv;charset=utf-8,Action,Credit,Date\n";
    actionLog.forEach(action => {
      csvContent += `${action.label},${action.credits},${action.date}\n`;
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "carbon_karma_log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Check Date
  function isToday(dateStr) {
    const today = new Date().toISOString().split("T")[0];
    return dateStr === today;
  }
  
  // Update Environmental Impact
  function updateImpact() {
    const trees = Math.floor(totalCredits / 20);
    const bottles = Math.floor(totalCredits / 5);
    const kms = Math.floor(totalCredits / 10);
  
    impactText.innerHTML = `
      🌳 Equivalent to planting <strong>${trees}</strong> tree(s)<br/>
      🧴 Prevented <strong>${bottles}</strong> plastic bottles<br/>
      🚶 Offset <strong>${kms}</strong> km of car travel
    `;
  }
  
  // Daily Challenge
  function spinChallenge() {
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    dailyChallenge.innerHTML = `🎉 ${challenge}`;
  }
  
  // Load Eco News
  function loadEcoNews() {
    const ecoNews = [
      {
        title: "🌍 UN Reports Progress in Global Climate Goals",
        url: "https://www.un.org/climatechange"
      },
      {
        title: "♻️ How Cities Are Reducing Plastic Waste",
        url: "https://www.nationalgeographic.com/environment"
      },
      {
        title: "🚲 Biking to Work Cuts Emissions by 67%",
        url: "https://www.weforum.org/agenda/archive/environment/"
      },
      {
        title: "🌱 Top 10 Sustainable Habits You Can Start Today",
        url: "https://www.earthday.org/take-action-now/"
      }
    ];
  
    newsFeed.innerHTML = "";
    ecoNews.forEach(news => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `<a href="${news.url}" target="_blank">${news.title}</a>`;
      newsFeed.appendChild(li);
    });
  }
  
  // Update Badge Status
  function updateBadges() {
    const badgeThresholds = [5, 10, 15, 25];
    badgeThresholds.forEach((threshold, index) => {
      const badgeEl = document.getElementById(`badge${index + 1}`);
      if (ecoStreak >= threshold) {
        badgeEl.classList.remove("faded");
        badgeEl.classList.add("earned");
        badgeEl.title = `🏅 Unlocked: ${threshold}-day streak!`;
      } else {
        badgeEl.classList.remove("earned");
        badgeEl.classList.add("faded");
        badgeEl.title = `Complete ${threshold}-day streak to unlock`;
      }
    });
  }
  