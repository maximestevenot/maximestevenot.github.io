// Draws a guilloche rosette, the interlaced line pattern printed on banknotes
// and cheques to make them hard to forge. Each band is a set of closed polar
// curves, phase-shifted so they braid into one another.

(function () {
	const svg = document.querySelector(".rosette");
	if (!svg) return;

	const NS = "http://www.w3.org/2000/svg";
	const TAU = Math.PI * 2;
	const SCALE = 500;

	const bands = [
		{ count: 14, steps: 1600, r: (t, p) => 0.86 + 0.075 * Math.sin(32 * t + p) + 0.02 * Math.sin(4 * t) },
		{ count: 12, steps: 1400, r: (t, p) => 0.6 + 0.075 * Math.sin(24 * t + p) + 0.05 * Math.sin(8 * t - p) },
		{ count: 10, steps: 900, r: (t, p) => 0.3 + 0.085 * Math.sin(10 * t + p) },
	];

	function curve(r, phase, steps) {
		let d = "";
		for (let s = 0; s < steps; s++) {
			const t = (s / steps) * TAU;
			const radius = r(t, phase) * SCALE;
			d += (s ? "L" : "M") + (radius * Math.cos(t)).toFixed(1) + " " + (radius * Math.sin(t)).toFixed(1);
		}
		return d + "Z";
	}

	let index = 0;
	for (const band of bands) {
		for (let i = 0; i < band.count; i++) {
			const path = document.createElementNS(NS, "path");
			path.setAttribute("d", curve(band.r, (TAU * i) / band.count, band.steps));
			path.setAttribute("pathLength", "100");
			path.style.setProperty("--i", index++);
			svg.appendChild(path);
		}
	}
})();
