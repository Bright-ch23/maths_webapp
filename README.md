# ✳️ NumberTheory

> **A little clarity for *big questions.*** 🧮
> Explore numbers, test ideas, and see the thinking behind every answer.

NumberTheory is a clean, modern math workspace that doesn't just give you answers, it **shows you how it got there**. Type in two numbers, and the app finds their GCD and LCM, then walks you through the reasoning with step-by-step working and a visual diagram of their prime factors. 🎓

---

## 📖 What is this?

Most calculators hand you a number and stop. NumberTheory is built for **understanding**. It's a small toolbox of math helpers, each one designed to make the idea behind the answer easy to see.

The current tool is the **GCD & LCM finder** 🔎:

- **GCD** (Greatest Common Divisor): the largest number that divides both inputs evenly.
- **LCM** (Least Common Multiple): the smallest number that both inputs divide into evenly.

**Example:** for `84` and `30`, the GCD is **6** and the LCM is **420**. 🎯

---

## ✨ Features

| | Feature | What it does |
|---|---|---|
| 🧮 | **GCD & LCM finder** | Instant results for any two positive integers (up to 15 digits) |
| 🪜 | **Euclidean algorithm steps** | See every division and remainder, animated one line at a time |
| 🟢 | **Prime factor Venn diagram** | Shared factors sit in the middle and become the GCD |
| ✅ | **Identity check** | Verifies `gcd(a,b) × lcm(a,b) = a × b` for your numbers |
| 🤝 | **Coprime detector** | Tells you whether the two numbers share no factors |
| ⚡ | **Quick examples** | One-tap chips like `84 & 30` and `252 & 105` |
| 🔁 | **Swap & history** | Flip the inputs, or jump back to your recent calculations |
| 📋 | **Copy result** | Copy the answer to your clipboard |
| 🌗 | **Light / dark mode** | Toggle with the ◐ button |
| 📱 | **Responsive** | Works on desktop, tablet and phone |
| ♿ | **Reduced-motion friendly** | Animations switch off if your system asks for it |

---

## 🧠 How it works

### 1️⃣ The Euclidean algorithm

The GCD is found by repeatedly taking remainders until nothing is left. The last non-zero remainder is the answer:

```
84 = 30 × 2 + 24
30 = 24 × 1 + 6
24 = 6  × 4 + 0   ← remainder 0, so GCD = 6 ✅
```

### 2️⃣ The LCM shortcut

Once the GCD is known, the LCM follows from a simple identity:

```
lcm(a, b) = (a ÷ gcd) × b
```

### 3️⃣ The golden rule 🌟

For any two positive integers:

```
gcd(a, b) × lcm(a, b) = a × b
```

The app displays this check for every calculation so you can see it hold true.

---

## 🚀 Getting started

NumberTheory is a **single self-contained HTML file**, so there's nothing to install. 🎉

1. 📥 Download or clone the project
2. 🖱️ Open `number-theory-redesign.html` in any modern browser
3. ⌨️ Enter two integers and press **Find GCD & LCM**

Or serve it locally:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000` 🌐

---

## 🗂️ Project structure

```
📦 numbertheory
 ┣ 📜 number-theory-redesign.html   # App: markup, styles and logic in one file
 ┗ 📝 README.md                     # You are here
```

---

## 🎨 Design

- 🌌 **Aurora background** with soft, drifting colour glows
- 🪟 **Glassmorphism cards** laid out in a bento grid
- 💚 **Mint accent** with violet and coral highlights
- 🔤 **Typography:** [Inter](https://fonts.google.com/specimen/Inter) for UI, [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) for expressive headings, and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) for numbers
- 🎛️ **Design tokens:** all colours, radii and fonts are CSS variables at the top of the file, so re-theming is a quick edit

---

## 🛠️ Tech stack

- 🧱 **HTML5**
- 🎨 **CSS3** (custom properties, grid, backdrop-filter, keyframe animations)
- ⚙️ **Vanilla JavaScript** with no frameworks and no dependencies
- 🔢 **BigInt** for exact arithmetic on very large numbers

---

## ⚠️ Input limits

- ✅ Positive whole numbers only (commas and spaces are ignored)
- ✅ Up to **15 digits** per number
- 🔍 The prime factor diagram is shown for numbers up to **10¹²**. Larger numbers still get GCD, LCM and steps, just without the diagram.

---

## 🗺️ Roadmap

- [ ] 🔎 **Prime checker**
- [ ] √ **Complex roots**
- [ ] x² **Quadratics solver**
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
