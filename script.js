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
    "Switch to dark mode to save energy 🌓",
    "Carry a reusable bag for shopping 🛍️",
    "Unplug unused electronics 🔌",
    "Plant a sapling or indoor plant 🌱",
    "Pick up litter in your neighborhood 🧹",
    "Use a reusable coffee cup ☕",
    "Take a short shower 🚿",
    "Compost food scraps 🍂",
    "Recycle paper and cardboard 📦",
    "Carpool to work or school 🚗",
    "Say no to plastic straws 🚫🥤",
    "Buy local produce 🍅",
    "Repurpose an old item into something useful 🔁",
    "Eat leftovers instead of tossing food 🍽️",
    "Use cloth napkins instead of paper 🧻",
    "Fix a leaking tap today 💧",
    "Shop from a zero-waste store 🛒",
    "Support a sustainable brand 🧵",
    "Turn off your AC or heater for a day 🌡️",
    "Donate old books 📚",
    "Switch to online billing 📲",
    "Write to a company about reducing packaging ✉️",
    "Use public bike-sharing 🚲",
    "Do not order takeout (reduce packaging waste) 🍱",
    "Make DIY natural cleaning products 🧼",
    "Dry clothes naturally (skip the dryer) 🌬️",
    "Use energy-efficient light bulbs 💡",
    "Try meatless Monday 🍛",
    "Buy second-hand clothes 👖",
    "Use a refillable pen 🖊️",
    "Replace paper towels with rags 🧽",
    "Use a bar soap instead of bottled soap 🧼",
    "Read digitally instead of printing 📖",
    "Host a swap party with friends ♻️",
    "Educate someone about sustainability 🗣️",
    "Bring your own container for takeaway 🥡",
    "Avoid fast fashion for a week 👗",
    "Refuse unnecessary receipts 🧾",
    "Use natural light during daytime ☀️",
    "Freeze leftovers before they go bad ❄️",
    "Use handkerchief instead of tissues 🤧",
    "Avoid bottled water all day 🚱",
    "Reduce screen brightness to save power 📱",
    "Set your computer to energy-saving mode 💻",
    "Track your waste for a day 📊",
    "Make a green wishlist 📋",
    "Repair something broken 🛠️",
    "Clean up a beach or park 🌊",
    "Make a bird feeder 🐦",
    "Watch an environmental documentary 🎬",
    "Start a kitchen herb garden 🌿",
    "Use public transport for a week 🚌",
    "Upcycle an item at home 🔄",
    "Bring your own cutlery 🍴",
    "Switch to bamboo toothbrush 🪥",
    "Avoid palm oil products today 🌴",
    "Research your carbon footprint 🧮",
    "Start a sustainability journal 📓",
    "Replace plastic wrap with beeswax wrap 🍯",
    "Buy nothing new for a day 🚫🛍️",
    "Practice a zero-waste lunch 🥙",
    "Volunteer for an eco initiative 🤝",
    "Avoid aerosols today 🌬️",
    "Offset your emissions for a trip 🛫",
    "Use a menstrual cup or cloth pad 🩸",
    "Send an email without attachments 📧",
    "Reduce email inbox clutter 📬",
    "Use e-books instead of print 📚",
    "Support a local farmer's market 🍉",
    "Walk for errands instead of driving 🚶",
    "Take stairs instead of elevator 🏃",
    "Host a no-electricity hour 🔦",
    "Skip fast food for the day 🍔🚫",
    "Use eco-friendly shampoo/soap today 🧖",
    "Pack a zero-waste picnic 🧺",
    "Plan a minimalist day ✨",
    "Make an eco-themed art piece 🎨",
    "Sign a sustainability petition ✍️",
    "Research green jobs or careers 💼",
    "Learn about a new endangered species 🐘",
    "Follow a sustainability blog 🌐",
    "Share an eco tip on social media 📢",
    "Turn off your phone for 1 hour 📴",
    "Switch to PDF notes only 📝",
    "Donate to a green cause 💚",
    "Keep your AC at 25°C or higher 🌡️",
    "Take only what you need from nature 🍂",
    "Say no to flyers or handouts 🧾",
    "Do a digital declutter 🗑️",
    "Make your own natural deodorant 🧴",
    "Use non-toxic laundry detergent 👕",
    "Switch to solar lights at home ☀️",
    "Make an eco-goal list 🎯",
    "Listen to a sustainability podcast 🎧"
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
  

  function showInfo() {
    document.getElementById("infoDialog").classList.remove("d-none");
  }
  
  function hideInfo() {
    document.getElementById("infoDialog").classList.add("d-none");
  }
  
  function shareProgress() {
    const shareMessage = `
  🎉 I’m doing the #SustainabilityChallenge on Carbon Karma 🌍
  
  🌱 I've earned ${totalCredits} Carbon Credits so far!
  🔥 Streak: ${ecoStreak} day(s)
  📊 My impact so far:
      - Trees planted: ${Math.floor(totalCredits / 20)}
      - Bottles saved: ${Math.floor(totalCredits / 5)}
      - Travel offset: ${Math.floor(totalCredits / 10)} km
  
  Join me in building a greener future 💚
  🔗 https://your-carbon-karma-site-link.com
  `;
  
    generateCertificate(); // generate image
  
    // Copy to clipboard + alert
    navigator.clipboard.writeText(shareMessage).then(() => {
      alert("Progress copied! Share it with your friends 🌱");
    });
  }
  
  // Generate a basic certificate with canvas
  function generateCertificate() {
    const userName = prompt("🎓 Enter your name for the certificate:");
    if (!userName || userName.trim() === "") {
      alert("⚠️ Please enter a valid name to generate your certificate.");
      return;
    }
  
    const canvas = document.getElementById("certificateCanvas");
    const ctx = canvas.getContext("2d");
  
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  
    const signature = "Vaibhav Rawat";
  
    // Clear & background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Border
    ctx.strokeStyle = "#2d6a4f";
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  
    // Title
    ctx.fillStyle = "#2d6a4f";
    ctx.font = "bold 32px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🌱 Carbon Karma Certificate", canvas.width / 2, 80);
  
    // Subtitle
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("This is to certify that", canvas.width / 2, 140);
  
    // Name
    ctx.font = "26px Arial";
    ctx.fillText(userName, canvas.width / 2, 180);
  
    // Message
    ctx.font = "18px Arial";
    ctx.fillText(
      "is an active participant of the Carbon Karma Challenge,",
      canvas.width / 2,
      220
    );
    ctx.fillText(
      "consistently making eco-friendly choices for a better planet.",
      canvas.width / 2,
      250
    );
  
    // Credits & Impact
    ctx.font = "18px Arial";
    ctx.fillText(`🌿 Credits Earned: ${totalCredits}`, canvas.width / 2, 300);
    ctx.fillText(`🔥 Streak: ${ecoStreak} day(s)`, canvas.width / 2, 330);
    ctx.fillText(
      `Impact → 🌳 Trees: ${Math.floor(totalCredits / 20)} | 🧴 Bottles: ${Math.floor(totalCredits / 5)} | 🚗 Offset: ${Math.floor(totalCredits / 10)} km`,
      canvas.width / 2,
      370
    );
  
    // Tagline / Join us
    ctx.fillStyle = "#444";
    ctx.font = "16px italic Arial";
    ctx.fillText("Join us to take the Carbon Karma Challenge and make a real difference!", canvas.width / 2, 410);
  
    // Issuing statement
    ctx.font = "16px Arial";
    ctx.fillText("This certificate is issued by the Carbon Karma Team", canvas.width / 2, 440);
  
    // Footer: Date & Signature
    ctx.textAlign = "left";
    ctx.font = "16px Arial";
    ctx.fillText(`Date of Issue: ${formattedDate}`, 60, canvas.height - 60);
  
    ctx.textAlign = "right";
    ctx.font = "italic 22px 'Brush Script MT', cursive";
    ctx.fillText(signature, canvas.width - 60, canvas.height - 60);
  
    ctx.font = "14px Arial";
    ctx.fillText("Issuing Authority", canvas.width - 60, canvas.height - 35);
  
    // Download
    const link = document.createElement("a");
    link.download = `Carbon_Karma_Certificate_${userName.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }
  