# ✳️ NumberTheory

> **A little clarity for *big questions.*** 🧮
> Explore numbers, test ideas, and see the thinking behind every answer.

NumberTheory is a clean, responsive math workspace that shows how it gets its answers. It includes a prime checker, complex square root solver, quadratic solver, and GCD & LCM finder, with visualizations and step-by-step working.

---

## 📖 What is this?

Most calculators hand you a number and stop. NumberTheory is built for **understanding**. Each tool makes the idea behind its answer easy to see.

- **Prime checker:** checks positive, negative and small integers, then applies repeated-squaring primality rounds to larger values.
- **Complex square roots:** finds both roots of `a + bi` and plots them on the complex plane.
- **Quadratic solver:** solves `ax² + bx + c = 0`, including repeated roots and complex conjugate pairs.
- **GCD & LCM finder:** finds the greatest common divisor and least common multiple of two positive integers, and shows the Euclidean algorithm.

For example, `84` and `30` have GCD **6** and LCM **420**. 🎯

---

## ✨ Features

| | Feature | What it does |
|---|---|---|
| 🔎 | **Prime checker** | Checks integers up to 100 digits and distinguishes deterministic results from probable primes |
| √ | **Complex roots** | Calculates both square roots of `a + bi` and plots the points on a complex plane |
| x² | **Quadratic solver** | Finds real or complex roots and explains the discriminant |
| 🧮 | **GCD & LCM finder** | Finds both values for two positive integers |
| 🪜 | **Worked steps** | Shows the Euclidean algorithm, prime checks, and equation formulas |
| 🟢 | **Math visualizations** | Displays shared prime factors, complex roots, and discriminant type |
| ✅ | **Identity check** | Verifies `gcd(a,b) × lcm(a,b) = a × b` |
| ⚡ | **Quick examples** | One-tap examples for every tool |
| 🔁 | **Swap & history** | Flip GCD/LCM inputs or return to recent calculations |
| 📋 | **Copy result** | Copy GCD and LCM results to the clipboard |
| 🌗 | **Light / dark mode** | Toggle themes with the ◐ button |
| 📱 | **Responsive** | Works on desktop, tablet and phone |
| ♿ | **Reduced-motion friendly** | Animations switch off when requested by the system |

---

## 🧠 How it works

### 1️⃣ The Euclidean algorithm

The GCD is found by repeatedly taking remainders until nothing is left. The last non-zero remainder is the answer:

```
84 = 30 × 2 + 24
30 = 24 × 1 + 6
24 = 6  × 4 + 0   ← remainder 0, so GCD = 6 ✅
```

The LCM follows from `lcm(a, b) = (a ÷ gcd) × b`, and the app checks `gcd(a, b) × lcm(a, b) = a × b` for each calculation.

### 2️⃣ Prime checking

Small prime divisors are checked first, followed by Miller–Rabin repeated-squaring rounds. The check is deterministic below `2⁶⁴`; larger values that pass all 16 rounds are labelled **probably prime**.

### 3️⃣ Complex square roots

For `z = a + bi`, let `r = |z| = √(a² + b²)`. A square root is `u + vi`, where `u = √((r + a)/2)` and `v = sign(b) · √((r − a)/2)`. The two roots are opposites.

### 4️⃣ Quadratic equations

For `ax² + bx + c = 0`, the solver uses `x = (−b ± √Δ) / 2a`, where `Δ = b² − 4ac`. The sign of Δ determines whether the roots are real, repeated, or complex.

---

## 🚀 Getting started

NumberTheory is a static HTML, CSS and JavaScript app with no build step or framework dependencies.

1. 📥 Clone or download the project
2. 🖱️ Open `index.html` in a modern browser
3. ⌨️ Choose a tool, enter values, and press its action button

To serve it locally, use Python:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` 🌐

### Deploy to Vercel

Import the repository into Vercel. The project is static, uses `index.html` at the root, and does not require a build command.

---

## 🗂️ Project structure

```
📦 maths_webapp
 ┣ 📜 index.html       # App structure and content
 ┣ 📜 styles.css       # Responsive theme and layout
 ┣ 📜 app.js           # Number theory tools and interactions
 ┣ 📜 vercel.json      # Static Vercel URL configuration
 ┗ 📝 README.md        # You are here
```

---

## 🎨 Design

- 🌌 **Aurora background** with soft, drifting colour glows
- 🪟 **Glassmorphism cards** laid out in a bento grid
- 💚 **Mint accent** with violet and coral highlights
- 🔤 **Typography:** [Inter](https://fonts.google.com/specimen/Inter) for UI, [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) for expressive headings, and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) for numbers
- 🎛️ **Design tokens:** colours, radii and fonts are CSS variables in `styles.css`

---

## 🛠️ Tech stack

- 🧱 **HTML5**
- 🎨 **CSS3** (custom properties, grid, backdrop-filter, keyframe animations)
- ⚙️ **Vanilla JavaScript** with no frameworks or dependencies
- 🔢 **BigInt** for exact integer arithmetic

---

## ⚠️ Input limits

- ✅ GCD and LCM accept positive whole numbers up to 100 digits
- ✅ Prime checker accepts signed whole numbers up to 100 digits
- 🔍 The prime factor diagram is shown for inputs up to **10¹²**
- 🔎 Prime results are deterministic below **2⁶⁴**; larger passing values are reported as probable primes
- 🧮 Complex and quadratic solvers accept finite numeric values with absolute value below **10¹⁵⁰**

---

## 🗺️ Roadmap

- [x] 🔎 **Prime checker**
- [x] √ **Complex roots**
- [x] x² **Quadratics solver**
- [ ] 📤 Export results as an image or PDF
- [ ] 🔗 Shareable links for calculations
- [ ] 🧮 GCD and LCM for more than two numbers

---

## 🤝 Contributing

Ideas and improvements are welcome! 💡

1. 🍴 Fork the repo
2. 🌿 Create a branch: `git checkout -b feature/amazing-idea`
3. 💾 Commit your changes
4. 📬 Open a pull request

---

## 📄 License

Released under the **MIT License** 🆓. Use it, remix it, learn from it.

---

<p align="center">
  <em>Math is a language. Let's make it clearer.</em> ✳️
</p>
