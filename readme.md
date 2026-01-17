# FakeJobGuard 🚨

FakeJobGuard is a full-stack machine learning platform that detects fraudulent job postings using Natural Language Processing (NLP).

## 🔍 Problem
Online job portals are increasingly targeted by scam postings. FakeJobGuard helps users identify potentially fraudulent job descriptions before applying.

## 🧠 Machine Learning
- TF-IDF (unigrams, bigrams, trigrams)
- Logistic Regression with class balancing
- Optimized for high recall on fraudulent postings

## ⚙️ Tech Stack
- **Backend**: FastAPI, scikit-learn
- **Frontend**: HTML, CSS, JavaScript (LinkedIn-inspired UI)
- **Deployment**: Render (Backend), Netlify (Frontend)

## 🚀 Features
- Paste a job description
- Get real-time prediction
- Confidence score for scam likelihood
- Clean, professional UI

## 📦 Project Structure
akejobguard/
├── backend/
│ ├── main.py
│ ├── model/
│ │ ├── model.pkl
│ │ └── vectorizer.pkl
│ └── requirements.txt
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
├── data/
├── notebooks/
└── README.md

## 🧠 Author
Built by **Divisha** as an end-to-end ML product.
