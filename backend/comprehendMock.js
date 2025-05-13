// backend/comprehendMock.js
function analyzeSentiment(text) {
  const lower = text.toLowerCase();
  if (lower.includes('love') || lower.includes('great') || lower.includes('enjoy')) {
    return 'Positive';
  } else if (lower.includes('hate') || lower.includes('bad') || lower.includes('boring')) {
    return 'Negative';
  }
  return 'Neutral';
}

module.exports = analyzeSentiment;
