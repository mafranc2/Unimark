function calculate() {
  const A = parseFloat(document.getElementById('amplitude').value);
  const gamma = parseFloat(document.getElementById('gamma').value);
  const omega = parseFloat(document.getElementById('omega').value);
  const tmin = parseFloat(document.getElementById('tmin').value);
  const tmax = parseFloat(document.getElementById('tmax').value);

  const t = [];
  const y = [];

  for (let i = tmin; i <= tmax; i += 0.1) {
    t.push(i);
    y.push(A * Math.exp(-gamma * i) * Math.cos(omega * i));
  }

  const trace = {
    x: t,
    y: y,
    mode: 'lines',
    type: 'scatter',
    name: 'y(t)'
  };

  const layout = {
    title: 'Damped Harmonic Oscillator',
    xaxis: { title: 'Time (t)' },
    yaxis: { title: 'Displacement (y)' }
  };

  Plotly.newPlot('plot', [trace], layout);
}
