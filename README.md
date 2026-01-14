<div align="center">

# 🌿 EcoTrace - Carbon Footprint Calculator

**A modern, interactive web application for calculating and visualizing your personal carbon footprint with region-specific insights and sustainability recommendations.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=netlify)](https://carbon-footprint-calculator-ecotrace.netlify.app/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

</div>

---

## 📖 About

**EcoTrace** is a sleek, user-friendly carbon footprint calculator that helps individuals understand and reduce their environmental impact. The application provides personalized calculations based on lifestyle factors including energy consumption, transportation habits, dietary choices, and waste management practices.

### ✨ Key Features

- 🌍 **Regional Context Switching** - Toggle between Global and India-specific emission factors for accurate localized calculations
- ⚡ **Energy Consumption Tracking** - Calculate emissions from electricity, natural gas, and renewable energy usage
- 🚗 **Transportation Analysis** - Track car travel, flight hours, and public transit usage
- 🍽️ **Dietary Impact Assessment** - Evaluate emissions based on dietary patterns (Vegan to Meat-Intensive)
- ♻️ **Waste Management** - Account for recycling and composting habits
- 📊 **Interactive Visualizations** - Beautiful pie charts and bar graphs powered by Recharts
- 💡 **Smart Recommendations** - Personalized sustainability tips based on your profile
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

---

## 🖥️ Live Demo

Experience EcoTrace live: **[https://carbon-footprint-calculator-ecotrace.netlify.app/](https://carbon-footprint-calculator-ecotrace.netlify.app/)**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Component Library |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Fast Build Tool & Dev Server |
| **Recharts** | Data Visualization (Pie/Bar Charts) |
| **Tailwind CSS** | Utility-first Styling |
| **Font Awesome** | Iconography |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/samirkumar13/EcoTrace-Carbon-Footprint-Calculator_.git
   cd EcoTrace-Carbon-Footprint-Calculator_
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   
   Navigate to `http://localhost:5173` to view the application.

---

## 📁 Project Structure

```
EcoTrace-Carbon-Footprint-Calculator/
├── App.tsx              # Main application component
├── index.tsx            # React entry point
├── index.html           # HTML template
├── types.ts             # TypeScript type definitions
├── constants.ts         # Regional factors & initial data
├── components/
│   └── InputGroup.tsx   # Reusable input component
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

---

## 🧮 Calculation Methodology

EcoTrace uses region-specific emission factors to calculate your annual carbon footprint in kg CO₂ equivalent:

| Category | Calculation Method |
|----------|-------------------|
| **Energy** | (Electricity × 12 months × Grid Factor) + (Gas × 12 × Gas Factor) |
| **Transport** | (Car km × 52 weeks × Car Factor) + (Flight hours × Flight Factor) + (Transit hours × Transit Factor) |
| **Diet** | Annual dietary footprint based on dietary pattern |
| **Waste** | Base emissions reduced by recycling and composting habits |

### Regional Factors

The application supports two regional contexts:
- **Global**: Standard international emission factors
- **India**: Localized factors accounting for India's energy grid, transportation patterns, and dietary norms

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Samir Kumar**

- GitHub: [@samirkumar13](https://github.com/samirkumar13)

---

<div align="center">

**🌱 Together, let's make our planet greener! 🌍**

*Calculate your footprint. Understand your impact. Take action.*

</div>