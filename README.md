# 🏦 Banking Platform UI

[![Angular](https://img.shields.io/badge/Angular-17%2B-dd0031.svg)](https://angular.io/)
[![NgRx](https://img.shields.io/badge/NgRx-State%20Management-purple.svg)](https://ngrx.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

An enterprise-grade banking dashboard built with **Angular** and **NgRx**. This is the frontend for the [Banking Microservices Backend](https://github.com/Woun-dex/banking_microservices), featuring secure authentication, account management, and real-time transaction tracking.

## ✨ Features

* **🔐 Secure Auth**: JWT handling via HttpInterceptors & Route Guards.
* **💰 Accounts**: View balances and account status (Active/Suspended).
* **💸 Transfers**: Smart forms for money transfers between accounts.
* **⚡ State Management**: Full **NgRx** implementation (Store, Effects, Selectors).
* **🎨 UI/UX**: Responsive design with **Angular Material**.

## 🛠 Tech Stack

* **Framework**: Angular 17+ (Standalone)
* **State**: NgRx (Redux Pattern)
* **Styling**: SCSS, Angular Material
* **Async**: RxJS Observables

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* [Backend Services](https://github.com/Woun-dex/banking_microservices) running on `localhost:8080`.

### Installation

```bash
# 1. Clone
git clone [https://github.com/Woun-dex/banking-platform.git](https://github.com/Woun-dex/banking-platform.git)
cd banking-platform

# 2. Install
npm install

# 3. Run
ng serve