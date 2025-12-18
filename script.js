function analyzeIdea() {
    const input = document.getElementById('businessInput').value;
    if (input.length < 10) {
        alert("Please provide a more detailed business idea!");
        return;
    }

    // UI State Changes
    document.getElementById('analyzeBtn').innerText = "Analyzing...";
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');

    // Simulate AI Processing Delay
    setTimeout(() => {
        const scores = calculateScores(input);
        displayResults(scores, input);
        
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');
        document.getElementById('analyzeBtn').innerText = "Analyze Idea";
    }, 2000);
}

function calculateScores(text) {
    const val = text.toLowerCase();
    // Simulate scoring logic based on keywords
    return {
        sustainability: (val.includes('recycle') || val.includes('solar') || val.includes('green')) ? 9 : 5,
        ecoFriendly: (val.includes('biodegradable') || val.includes('nature')) ? 9.5 : 4,
        profit: (val.includes('subscription') || val.includes('scale') || val.includes('tech')) ? 8.5 : 6,
        market: (val.includes('global') || val.includes('online')) ? 9 : 5,
        scalability: 7.5
    };
}

function displayResults(scores, input) {
    // Update Progress Bars
    const metrics = ['sustainability', 'ecoFriendly', 'profit', 'market', 'scale'];
    
    document.getElementById('bar-sustainability').style.width = (scores.sustainability * 10) + "%";
    document.getElementById('score-sustainability').innerText = scores.sustainability + "/10";

    document.getElementById('bar-eco').style.width = (scores.ecoFriendly * 10) + "%";
    document.getElementById('score-eco').innerText = scores.ecoFriendly + "/10";

    document.getElementById('bar-profit').style.width = (scores.profit * 10) + "%";
    document.getElementById('score-profit').innerText = scores.profit + "/10";

    document.getElementById('bar-market').style.width = (scores.market * 10) + "%";
    document.getElementById('score-market').innerText = scores.market + "/10";

    document.getElementById('bar-scale').style.width = (scores.scalability * 10) + "%";
    document.getElementById('score-scale').innerText = scores.scalability + "/10";

    // Set Status
    const status = document.getElementById('ecoStatus');
    if (scores.ecoFriendly > 7) {
        status.innerText = "Eco-Positive";
        status.style.background = "#00ff8822";
        status.style.color = "#00ff88";
    } else {
        status.innerText = "Environment Risk";
        status.style.background = "#ff444422";
        status.style.color = "#ff4444";
    }

    // Summary Generation
    document.getElementById('aiSummary').innerHTML = `
        <strong>Executive Analysis:</strong> Based on your idea regarding "${input.substring(0, 30)}...", our AI has determined that this venture holds significant potential in the current market. 
        <br><br>
        The <strong>Sustainability Score</strong> is rated at ${scores.sustainability}/10. This indicates how well the business model aligns with long-term ecological balance. 
        The <strong>Eco-Friendly rating</strong> of ${scores.ecoFriendly}/10 suggests that your choice of materials and processes is ${scores.ecoFriendly > 7 ? 'highly beneficial' : 'moderately concerning'} for the environment. 
        From a financial standpoint, a <strong>Profitability Score</strong> of ${scores.profit}/10 implies a healthy margin, though market scope (${scores.market}/10) will depend on your ability to reach the target demographic effectively.
    `;
}
